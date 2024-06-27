<?php

namespace Ferdiunal\NovaMediaField\Traits\Validator;

trait ImageValidator
{
    /**
     * Get the allowed image extensions.
     */
    protected function allowedImageExtensions(): self
    {
        return $this->allowedExtensions([
            'bmp', 'gif', 'jpeg', 'jpg', 'png', 'svg', 'webp',
        ]);
    }

    /**
     * Get the allowed image MIME types.
     */
    protected function allowedImageMimeTypes(): self
    {
        return $this->allowedMimeTypes([
            'image/bmp', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp',
        ]);
    }

    /**
     * Get the allowed image extensions and MIME types.
     */
    protected function allowedImage(): self
    {
        return $this->allowedImageExtensions()->allowedImageMimeTypes();
    }
}
