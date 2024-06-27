<?php

namespace Ferdiunal\NovaMediaField\Http\Controllers;

use Ferdiunal\NovaMediaField\Http\Resources\MediaResource;
use Laravel\Nova\Http\Requests\NovaRequest;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MediaFieldShowController extends Controller
{
    public function __invoke(string $resourceName, string $resourceId, string $fieldName, string $mediaId, NovaRequest $request)
    {
        $resource = $request->findResourceOrFail();

        $resource->authorizeToView($request);

        $media = Media::query()->whereCollectionName($fieldName)->findOrFail($mediaId);

        return response()->json(
            new MediaResource($media)
        );
    }
}
