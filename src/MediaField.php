<?php

namespace Ferdiunal\NovaMediaField;

use Ferdiunal\NovaMediaField\Contracts\Updatable as UpdatableContract;
use Ferdiunal\NovaMediaField\Exceptions\NovaMediaFieldException;
use Ferdiunal\NovaMediaField\Traits\Updatable;
use Ferdiunal\NovaMediaField\Traits\Validator\Validator;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Laravel\Nova\Fields\File;
use Laravel\Nova\Fields\Storable;
use Laravel\Nova\Http\Requests\NovaRequest;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\ResponsiveImages\Jobs\GenerateResponsiveImagesJob;

class MediaField extends File implements UpdatableContract
{
    use Storable;
    use Updatable;
    use Validator;

    /**
     * Indicates if the element should be shown on the index view.
     *
     * @var bool
     */
    public $showOnIndex = true;

    /**
     * The field's component.
     *
     * @param  HasMedia  $resource
     * @param  null  $attribute
     */
    public $component = 'nova-media';

    protected bool $withResponsive = false;

    protected ?string $collectionName = null;

    protected bool $vapor = false;

    protected bool $multiple = false;

    public function __construct($name, $attribute = null, $resolveCallback = null)
    {
        parent::__construct($name, $attribute, $resolveCallback);
        $this
            ->allowedExtensions([])
            ->allowedMimeTypes([])
            ->fullWidth()
            ->maxSize(
                1024 * 1024 * 10
            )
            ->disk($this->getDefaultStorageDisk())
            ->model(config('media-library.media_model'))
            ->delete(
                function (NovaRequest $request, $model, $mediaId, $disk, Collection $collections) {
                    if ($model instanceof HasMedia) {
                        if ($collections->contains('id', '===', $mediaId)) {
                            $model->media()->where('disk', $disk)->where('id', $mediaId)->delete();
                            if (Storage::disk($disk)->exists($mediaId)) {
                                Storage::disk($disk)->delete($mediaId);
                            }
                        }

                        return true;
                    }

                    return false;
                }
            )
            ->update(
                function (NovaRequest $request, $model, $mediaId, $disk, Collection $collections) {
                    $request->validate([
                        'name' => ['required', 'string', 'max:200'],
                        'custom_properties' => ['nullable', 'array'],
                        'custom_properties.alt_text' => ['nullable', 'string', 'max:200'],
                    ]);

                    if ($model instanceof HasMedia) {
                        if ($collections->contains('id', '===', $mediaId)) {
                            $media = $model->media()->where('disk', $disk)->where('id', $mediaId)->first();

                            if (! $media) {
                                return false;
                            }

                            $fileName = sprintf('%s.%s', $request->get('name'), $media->extension);
                            Storage::disk($disk)->move(sprintf('%s/%s', $mediaId, $media->file_name), sprintf('%s/%s', $mediaId, $fileName));

                            Storage::disk($disk)->deleteDirectory(sprintf('%s/responsive-images', $mediaId));

                            $media->name = $request->get('name');
                            $media->custom_properties = array_merge($media->custom_properties, $request->get('custom_properties', []));
                            $media->file_name = $fileName;
                            $media->responsive_images = [];
                            $media->save();

                            if (str($media->mime_type)->startsWith('image')) {
                                dispatch(new GenerateResponsiveImagesJob($media));
                            }

                            return true;
                        }

                        return false;
                    }
                }
            );
    }

    protected function model(string $model = Media::class): self
    {
        $this->model = $model;

        return $this;
    }

    public function resolve($resource, $attribute = null)
    {
        throw_unless($resource instanceof HasMedia, new NovaMediaFieldException('Resource must be an instance of HasMedia'));

        $collection = $attribute ?? $this->attribute;
        $this->value = $resource->getMedia($collection)->map(
            fn (Media $media) => [
                'id' => (string) $media->id,
                'name' => $media->file_name,
                'file_name' => $media->file_name,
                'src' => $media->getUrl(),
                'srcset' => $media->getSrcset(),
                'size' => $media->size,
                'width' => $media->getCustomProperty('width', null),
                'height' => $media->getCustomProperty('height', null),
                'alt' => $media->getCustomProperty('alt_text', $media->name),
                'type' => $media->mime_type,
                'order_column' => $media->order_column,
                'created_at' => $media->created_at->timestamp,
            ]
        );
    }

    public function getDefaultStorageDisk()
    {
        return config('media-library.disk_name');
    }

    public function getStoragePath()
    {
        return $this->value;
    }

    /**
     * @param  HasMedia  $model
     * @return mixed
     */
    public function fill(NovaRequest $request, $model)
    {
        throw_unless($model instanceof HasMedia, new NovaMediaFieldException('Resource must be an instance of HasMedia'));
        $this->proccessingUploadedFiles($request, $model);
        $this->proccessingVaporFiles($request, $model);
    }

    /**
     * @param  HasMedia  $model
     * @return mixed
     */
    protected function proccessingUploadedFiles(NovaRequest $request, $model)
    {
        ray($request->file($this->attribute));

        $files = $request->file(
            $this->attribute,
            $request->get($this->attribute, null)
        );

        if (empty($files) || ! is_array($files)) {
            return;
        }

        $collectionName = $this->collectionName ?? $this->attribute;

        if (is_array($files) && ! empty($files)) {
            if (! $this->multiple) {
                $model->clearMediaCollection($collectionName);
            }

            foreach ($files as $file) {
                if ($file instanceof UploadedFile) {
                    $model
                        ->addMedia($file)
                        ->withResponsiveImagesIf($this->withResponsive)
                        ->toMediaCollection(
                            collectionName: $collectionName,
                            diskName: $this->disk
                        );
                } elseif (is_array($file) && ! empty($file)) {
                    if (isset($file['mediaId']) && isset($file['copy']) && $file['copy'] === 'true') {
                        $mediaLibraryModel = $this->model();

                        if ($media = $mediaLibraryModel::query()->whereId($file['mediaId'])->first()) {
                            $file = null;
                            if ($this->withResponsive) {
                                $file = $media->copyWithResponsiveImages($model, $collectionName, $this->disk);
                            } else {
                                $file = $media->copy($model, $collectionName, $this->disk);
                            }

                            if ($file instanceof $mediaLibraryModel) {
                                if (str($file->mime_type)->startsWith('image')) {
                                    [$width, $height] = getimagesize($file->getUrl());
                                    $file->custom_properties = array_merge(
                                        $file->custom_properties,
                                        compact('width', 'height')
                                    );
                                }
                                $file->order_column = $mediaLibraryModel::query()->orderByDesc('order_column')->pluck('order_column')->first() + 1;
                                $file->save();
                            }
                        }
                    }
                }
            }
        }
    }

    protected function proccessingVaporFiles(NovaRequest $request, $model)
    {
        $vaporFiles = $request->get('vaporFiles', null);

        if (empty($vaporFiles) || ! is_array($vaporFiles)) {
            return;
        }

        $collectionName = $this->collectionName ?? $this->attribute;
        if (! $this->multiple) {
            $model->clearMediaCollection($collectionName);
        }

        $attributeVaporFiles = data_get($vaporFiles, $collectionName, null);
        foreach ($attributeVaporFiles as $vaporFile) {
            if ($this->storage()->has($vaporFile['key'])) {
                $model
                    ->addMediaFromDisk($vaporFile['key'], $this->disk)
                    ->withResponsiveImagesIf($this->withResponsive)
                    ->usingName($vaporFile['filename'])
                    ->usingFileName(
                        sprintf('%s.%s', $vaporFile['filename'], $vaporFile['extension'])
                    )
                    ->withCustomProperties(['width' => $vaporFile['width'], 'height' => $vaporFile['height']])
                    ->toMediaCollection(
                        collectionName: $collectionName,
                        diskName: $this->disk
                    );
            }
        }
    }

    public function withResponsive(bool $withResponsive = true): self
    {
        $this->withResponsive = $withResponsive;

        return $this;
    }

    public function collectionName(string $collection): self
    {
        $this->collectionName = $collection;

        return $this;
    }

    protected function storage(): FilesystemAdapter
    {
        return Storage::disk($this->disk);
    }

    public function multiple(bool $multiple = true): self
    {
        $this->multiple = $multiple;

        $this->withMeta(['multiple' => $multiple]);

        return $this;
    }

    public function vapor(bool $vapor = true): self
    {
        $this->vapor = $vapor;

        $this->withMeta(['vapor' => $vapor]);

        return $this;
    }
}
