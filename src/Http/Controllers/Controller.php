<?php

namespace Ferdiunal\NovaMediaField\Http\Controllers;

use Closure;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Laravel\Nova\Contracts\Storable;
use Laravel\Nova\Http\Requests\NovaRequest;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * Delete the given field.
     *
     * @param  \Laravel\Nova\Fields\Field&\Laravel\Nova\Contracts\Deletable  $field
     * @return \Illuminate\Database\Eloquent\Model
     */
    public static function forRequest(NovaRequest $request, $field, Model $model, string $mediaId, ?Closure $callback = null)
    {
        $arguments = [
            $request,
            $model,
            $mediaId,
        ];

        if ($field instanceof Storable) {
            array_push($arguments, $field->getStorageDisk(), $field->getStoragePath());
        }

        $result = call_user_func_array($callback, $arguments);

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
