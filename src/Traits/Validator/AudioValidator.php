<?php

namespace Ferdiunal\NovaMediaField\Traits\Validator;

trait AudioValidator
{
    /**
     * Returns a new instance of the class with the allowed audio extensions set.
     */
    protected function allowedAudioExtensions(): self
    {
        return $this->allowedExtensions([
            'aac', 'flac', 'm4a', 'mp3', 'ogg', 'wav', 'wma',
        ]);
    }

    /**
     * Returns a new instance of the class with the allowed audio MIME types set.
     */
    protected function allowedAudioMimeTypes(): self
    {
        return $this->allowedMimeTypes([
            'audio/aac', 'audio/flac', 'audio/mp4', 'audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/x-ms-wma',
        ]);
    }

    /**
     * Returns a new instance of the class with both the allowed audio extensions and MIME types set.
     */
    protected function allowedAudio(): self
    {
        return $this->allowedAudioExtensions()->allowedAudioMimeTypes();
    }
}
