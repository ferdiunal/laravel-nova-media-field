<?php

namespace Ferdiunal\NovaMediaField\Contracts;

/**
 * @mixin \Laravel\Nova\Fields\Field
 *
 * @property callable(\Laravel\Nova\Http\Requests\NovaRequest, mixed, ?string, ?string):mixed $updateCallback
 */
interface Updatable
{
    /**
     * Specify the callback that should be used to update the field.
     *
     * @return $this
     */
    public function update(callable $updateCallback);

    /**
     * Specify if the underlying file is able to be updated.
     *
     * @param  bool  $updatable
     * @return $this
     */
    public function updatable($updatable = true);
}
