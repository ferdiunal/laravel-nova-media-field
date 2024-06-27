<?php

namespace Ferdiunal\NovaMediaField\Traits;

trait Updatable
{
    /**
     * The callback used to update the field.
     *
     * @var callable|null
     */
    public $updateCallback;

    /**
     * Indicates if the underlying field is updatable.
     *
     * @var bool
     */
    public $updatable = true;

    /**
     * Specify the callback that should be used to update the field.
     *
     * @return $this
     */
    public function update(callable $updateCallback)
    {
        $this->updateCallback = $updateCallback;

        return $this;
    }

    /**
     * Specify if the underlying file is able to be updated.
     *
     * @param  bool  $updatable
     * @return $this
     */
    public function updatable($updatable = true)
    {
        $this->updatable = $updatable;

        return $this;
    }
}
