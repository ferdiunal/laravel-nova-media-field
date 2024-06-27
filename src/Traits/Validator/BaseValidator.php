<?php

namespace Ferdiunal\NovaMediaField\Traits\Validator;

use Laravel\Nova\Http\Requests\NovaRequest;

/**
 * This trait provides properties for validating file sizes, extensions, and mime types.
 *
 * @property int $size The size of the file in bytes.
 * @property int $minSize The minimum allowed size of the file in bytes.
 * @property int $maxSize The maximum allowed size of the file in bytes.
 * @property array $allowedExtensions An array of allowed file extensions.
 * @property array $allowedMimeTypes An array of allowed file mime types.
 */
trait BaseValidator
{
    protected int $size = 0;

    protected int $minSize = 0;

    protected int $maxSize = 0;

    protected array $allowedExtensions = [];

    protected array $allowedMimeTypes = [];

    protected array $generatedRules = [
        'default' => [],
        'creation' => [],
        'update' => [],
    ];

    /**
     * Set the size of the file.
     *
     * @param  int  $size  The size of the file.
     */
    public function size(int $size): self
    {
        $this->size = $size;

        $this->withMeta(compact('size'));

        return $this;
    }

    /**
     * Set the minimum size of the file.
     *
     * @param  int  $minSize  The minimum size of the file.
     */
    public function minSize(int $minSize): self
    {
        $this->minSize = $minSize;

        $this->withMeta(compact('minSize'));

        return $this;
    }

    /**
     * Set the maximum size of the file.
     *
     * @param  int  $maxSize  The maximum size of the file.
     */
    public function maxSize(int $maxSize): self
    {
        $this->maxSize = $maxSize;

        $this->withMeta(compact('maxSize'));

        return $this;
    }

    /**
     * Set the allowed extensions for the file.
     *
     * @param  array  $allowedExtensions  The allowed extensions for the file.
     */
    public function allowedExtensions(array $allowedExtensions): self
    {
        $currentMeta = $this->meta['allowedExtensions'] ?? [];
        $this->allowedExtensions = array_unique([...$currentMeta, ...$allowedExtensions]);
        $this->withMeta([
            'allowedExtensions' => $this->allowedExtensions,
        ]);

        return $this;
    }

    /**
     * Set the allowed mime types for the file.
     *
     * @param  array  $allowedMimeTypes  The allowed mime types for the file.
     */
    public function allowedMimeTypes(array $allowedMimeTypes): self
    {
        $currentMeta = $this->meta['allowedMimeTypes'] ?? [];
        $this->allowedMimeTypes = array_unique([...$currentMeta, ...$allowedMimeTypes]);
        $this->withMeta([
            'allowedMimeTypes' => $this->allowedMimeTypes,
        ]);

        return $this;
    }

    /**
     * Set the allowed image extensions and MIME types.
     *
     * @param  array  $allowedExtensions  The allowed extensions for the file.
     * @param  array  $allowedMimeTypes  The allowed mime types for the file.
     * @param  int  $minSize  The minimum size of the file.
     * @param  int  $maxSize  The maximum size of the file.
     * @param  int  $size  The size of the file.
     * @param  bool  $image  Whether to allow only image files.
     * @param  bool  $video  Whether to allow only video files.
     * @param  bool  $audio  Whether to allow only audio files.
     * @param  bool  $document  Whether to allow only document files.
     * @param  bool  $pdf  Whether to allow only PDF files.
     * @param  bool  $txt  Whether to allow only text files.
     * @param  bool  $json  Whether to allow only JSON files.
     * @param  bool  $csv  Whether to allow only CSV files.
     * @param  bool  $xlsx  Whether to allow only XLSX files.
     * @param  bool  $docx  Whether to allow only DOCX files.
     * @param  bool  $creation  Whether to apply the rules for creation.
     * @param  bool  $update  Whether to apply the rules for update.
     * @param  bool  $default  Whether to apply the rules as default.
     * @return $this
     */
    public function validate(
        int $minSize = 0,
        int $maxSize = 0,
        int $size = 0,
        bool $image = false,
        bool $video = false,
        bool $audio = false,
        bool $document = false,
        bool $pdf = false,
        bool $txt = false,
        bool $json = false,
        bool $csv = false,
        bool $xlsx = false,
        bool $docx = false,
        bool $creation = false,
        bool $update = false,
        bool $default = false,
        array $allowedExtensions = [],
        array $allowedMimeTypes = []
    ): self {
        $this->allowedExtensions($allowedExtensions);
        $this->allowedMimeTypes($allowedMimeTypes);

        if ($image) {
            $this->allowedImage();
        }

        if ($video) {
            $this->allowedVideo();
        }

        if ($audio) {
            $this->allowedAudio();
        }

        if ($document) {
            $this->allowedDocumentFile();
        }

        if ($pdf) {
            $this->allowedPdfFile();
        }

        if ($txt) {
            $this->allowedTextFile();
        }

        if ($json) {
            $this->allowedJsonFile();
        }

        if ($minSize > 0) {
            $this->minSize($minSize);
        }

        if ($maxSize > 0) {
            $this->maxSize($maxSize);
        }

        if ($size > 0) {
            $this->size($size);
        }

        if ($xlsx) {
            $this->allowedXlsxFile();
        }

        if ($docx) {
            $this->allowedDocxFile();
        }

        if ($csv) {
            $this->allowedCsvFile();
        }

        if (! $this->vapor) {
            $rules = ['required', 'file'];

            if ($this->minSize > 0) {
                $rules[] = sprintf('min:%s', $this->minSize);
            }

            if ($this->maxSize > 0) {
                $rules[] = sprintf('max:%s', $this->maxSize);
            }

            if ($this->size > 0) {
                $rules[] = sprintf('size:%s', $this->size);
            }

            if (! empty($this->allowedExtensions)) {
                $rules[] = sprintf('extensions:%s', strtolower(implode(',', $this->allowedExtensions)));
            }

            if (! empty($this->allowedMimeTypes)) {
                $rules[] = sprintf('mimetypes:%s', strtolower(implode(',', $this->allowedMimeTypes)));
            }

            if ($this->multiple) {
                $rules = [
                    $this->attribute => ['required', 'array', 'min:1'],
                    $this->attribute.'.*' => $rules,
                ];
            } else {
                $rules = [
                    $this->attribute => $rules,
                ];
            }

            if ($creation) {
                $this->ueneraRuletedRules['creation'] = $rules;
            }
            if ($update) {
                $this->generatedRules['update'] = $rules;
            }

            if ($default) {
                $this->generatedRules['default'] = $rules;
            }
        }

        return $this;
    }

    public function getUpdateRules(NovaRequest $request)
    {
        if (empty($this->generatedRules['update'])) {
            return parent::getUpdateRules($request);
        }

        return array_merge_recursive($this->getRules($request), $this->generatedRules['update']);
    }

    public function getCreationRules(NovaRequest $request)
    {
        if (empty($this->generatedRules['creation'])) {
            return parent::getUpdateRules($request);
        }

        return array_merge_recursive($this->getRules($request), $this->generatedRules['creation']);
    }

    public function getRules(NovaRequest $request)
    {
        if (empty($this->generatedRules['default'])) {
            return parent::getRules($request);
        }

        return array_merge_recursive($this->getRules($request), $this->generatedRules['default']);
    }
}
