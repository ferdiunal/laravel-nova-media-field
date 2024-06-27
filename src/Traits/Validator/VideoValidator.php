<?php

namespace Ferdiunal\NovaMediaField\Traits\Validator;

trait VideoValidator
{
    /**
     * Returns a new instance of the class with the allowed video extensions set.
     */
    protected function allowedVideoExtensions(): self
    {
        return $this->allowedExtensions([
            'avi', 'flv', 'm4v', 'mkv', 'mov', 'mp4', 'mpeg', 'mpg', 'ogv', 'webm', 'wmv',
        ]);
    }

    /**
     * Returns a new instance of the class with the allowed video MIME types set.
     */
    protected function allowedVideoMimeTypes(): self
    {
        return $this->allowedMimeTypes([
            'video/avi', 'video/flv', 'video/mp4', 'video/mpeg', 'video/ogg', 'video/quicktime', 'video/webm', 'video/x-ms-wmv',
        ]);
    }

    /**
     * Returns a new instance of the class with both the allowed video extensions and MIME types set.
     */
    protected function allowedVideo(): self
    {
        return $this->allowedVideoExtensions()->allowedVideoMimeTypes();
    }
}
