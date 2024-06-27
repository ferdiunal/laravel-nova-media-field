<?php

namespace Ferdiunal\NovaMediaField\Http\Controllers;

use Ferdiunal\NovaMediaField\Contracts\Updatable;
use Laravel\Nova\Contracts\Downloadable;
use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Nova;

class MediaFieldUpdateController extends Controller
{
    public function __invoke(string $resourceName, string $resourceId, string $fieldName, string $mediaId, NovaRequest $request)
    {
        $resource = $request->findResourceOrFail();

        $resource->authorizeToUpdate($request);

        $field = $resource->updateFields($request)
            ->whereInstanceOf(Downloadable::class)
            ->findFieldByAttribute($request->field, function () {
                abort(404);
            });

        $this->forRequest(
            request: $request,
            field: $field,
            model: $resource->resource,
            mediaId: $mediaId,
            callback: $field instanceof Updatable ? $field->updateCallback : null,
        )->save();

        Nova::usingActionEvent(function ($actionEvent) use ($request, $resource) {
            $actionEvent->forResourceUpdate(
                Nova::user($request),
                $resource->resource
            )->save();
        });

        return response()->noContent(201);
    }
}
