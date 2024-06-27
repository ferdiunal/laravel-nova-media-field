<?php

namespace Ferdiunal\NovaMediaField\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Laravel\Nova\Contracts\Deletable;
use Laravel\Nova\Contracts\Downloadable;
use Laravel\Nova\Contracts\Storable;
use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Nova;

class MediaFieldDestroyController extends Controller
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
            callback: $field instanceof Deletable ? $field->deleteCallback : null,
        )->save();

        Nova::usingActionEvent(function ($actionEvent) use ($request, $resource) {
            $actionEvent->forResourceUpdate(
                Nova::user($request),
                $resource->resource
            )->save();
        });

        return response()->noContent(204);
    }

    /**
     * Delete the given field.
     *
     * @param  \Laravel\Nova\Fields\Field&\Laravel\Nova\Contracts\Deletable  $field
     * @return \Illuminate\Database\Eloquent\Model
     */
    public static function forRequest1(NovaRequest $request, $field, Model $model, string $mediaId)
    {
        $arguments = [
            $request,
            $model,
            $mediaId,
        ];

        if ($field instanceof Storable) {
            array_push($arguments, $field->getStorageDisk(), $field->getStoragePath());
        }

        $result = call_user_func_array($field->deleteCallback, $arguments);

        if ($result === true) {
            return $model;
        }

        if (! is_array($result)) {
            $model->{$field->attribute} = $result;
        } else {
            foreach ($result as $key => $value) {
                $model->{$key} = $value;
            }
        }

        return $model;
    }
}
