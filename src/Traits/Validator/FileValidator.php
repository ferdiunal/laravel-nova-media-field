<?php

namespace Ferdiunal\NovaMediaField\Traits\Validator;

trait FileValidator
{
    /**
     * Set the allowed document extensions for file validation.
     */
    protected function allowedDocumentExtensions(): self
    {
        return $this->allowedExtensions([
            'doc', 'docx', 'pdf', 'ppt', 'pptx', 'xls', 'xlsx',
        ]);
    }

    /**
     * Get the allowed document MIME types.
     */
    protected function allowedDocumentMimeTypes(): self
    {
        return $this->allowedMimeTypes([
            'application/msword', 'application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'text/plain',
        ]);
    }

    /**
     * Set the allowed file extensions to only JSON files.
     */
    protected function allowedJsonExtensions(): self
    {
        return $this->allowedExtensions([
            'json',
        ]);
    }

    /**
     * Set the allowed JSON mime types for file validation.
     */
    protected function allowedJsonMimeTypes(): self
    {
        return $this->allowedMimeTypes([
            'application/json',
        ]);
    }

    /**
     * Set the allowed text file extensions for file validation.
     */
    protected function allowedTextExtensions(): self
    {
        return $this->allowedExtensions([
            'txt',
        ]);
    }

    /**
     * Set the allowed text mime types for file validation.
     */
    protected function allowedTextMimeTypes(): self
    {
        return $this->allowedMimeTypes([
            'text/plain',
        ]);
    }

    /**
     * Set the allowed PDF extensions for file validation.
     */
    protected function allowedPdfExtensions(): self
    {
        return $this->allowedExtensions([
            'pdf',
        ]);
    }

    /**
     * Set the allowed PDF mime types for file validation.
     */
    protected function allowedPdfMimeTypes(): self
    {
        return $this->allowedMimeTypes([
            'application/pdf',
        ]);
    }

    /**
     * Set the allowed spreadsheet extensions.
     */
    protected function allowedSpreadsheetExtensions(): self
    {
        return $this->allowedExtensions([
            'xls', 'xlsx',
        ]);
    }

    /**
     * Set the allowed spreadsheet MIME types.
     */
    protected function allowedSpreadsheetMimeTypes(): self
    {
        return $this->allowedMimeTypes([
            'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ]);
    }

    /**
     * Set the allowed presentation extensions.
     */
    protected function allowedPresentationExtensions(): self
    {
        return $this->allowedExtensions([
            'ppt', 'pptx',
        ]);
    }

    /**
     * Set the allowed presentation MIME types.
     */
    protected function allowedCsvExtensions(): self
    {
        return $this->allowedExtensions([
            'csv',
        ]);
    }

    /**
     * Set the allowed presentation MIME types.
     */
    protected function allowedCsvMimeTypes(): self
    {
        return $this->allowedMimeTypes([
            'text/csv',
        ]);
    }

    /**
     * Set the allowed presentation MIME types.
     */
    protected function allowedPresentationMimeTypes(): self
    {
        return $this->allowedMimeTypes([
            'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        ]);
    }

    /**
     * Returns the allowed archive extensions.
     */
    protected function allowedArchiveExtensions(): self
    {
        return $this->allowedExtensions([
            'tar', 'gz', 'bz2', '7z',
        ]);
    }

    /**
     * Returns the allowed archive mime types.
     */
    protected function allowedArchiveMimeTypes(): self
    {
        return $this->allowedMimeTypes([
            'application/x-tar', 'application/gzip', 'application/x-bzip2', 'application/x-7z-compressed',
        ]);
    }

    /**
     * Returns the allowed document file extensions and mime types.
     *
     * @return self
     */
    protected function allowedDocumentFile()
    {
        return $this->allowedDocumentExtensions()->allowedDocumentMimeTypes();
    }

    /**
     * Returns the allowed JSON file extensions and mime types.
     *
     * @return self
     */
    protected function allowedJsonFile()
    {
        return $this->allowedJsonExtensions()->allowedJsonMimeTypes();
    }

    /**
     * Returns the allowed text file extensions and mime types.
     *
     * @return self
     */
    protected function allowedTextFile()
    {
        return $this->allowedTextExtensions()->allowedTextMimeTypes();
    }

    /**
     * Returns the allowed PDF file extensions and mime types.
     *
     * @return self
     */
    protected function allowedPdfFile()
    {
        return $this->allowedPdfExtensions()->allowedPdfMimeTypes();
    }

    /**
     * Returns the allowed XLSX file extensions and mime types.
     *
     * @return self
     */
    protected function allowedXlsxFile()
    {
        return $this->allowedSpreadsheetExtensions()->allowedSpreadsheetMimeTypes();
    }

    /**
     * Returns the allowed DOCX file extensions and mime types.
     *
     * @return self
     */
    protected function allowedDocxFile()
    {
        return $this->allowedDocumentExtensions()->allowedDocumentMimeTypes();
    }

    /**
     * Returns the allowed PPTX file extensions and mime types.
     *
     * @return self
     */
    protected function allowedPptxFile()
    {
        return $this->allowedPresentationExtensions()->allowedPresentationMimeTypes();
    }

    /**
     * Returns the allowed archive file extensions and mime types.
     *
     * @return self
     */
    protected function allowedArchiveFile()
    {
        return $this->allowedArchiveExtensions()->allowedArchiveMimeTypes();
    }

    protected function allowedCsvFile()
    {
        return $this->allowedCsvExtensions()->allowedCsvMimeTypes();
    }
}
