<?php

namespace Ferdiunal\NovaMediaField\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MediaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->whenHas('id', $this->id),
            'name' => $this->whenHas('name', $this->name),
            'file_name' => $this->whenHas('file_name', $this->file_name),
            'mime_type' => $this->whenHas('mime_type', $this->mime_type),
            'extension' => $this->whenHas('file_name', str($this->file_name)->explode('.')->last()),
            'collection_name' => $this->whenHas('collection_name', $this->collection_name),
            'disk' => $this->whenHas('disk', $this->disk),
            'conversions_disk' => $this->whenHas('conversions_disk', $this->conversions_disk),
            'size' => $this->whenHas('size', $this->size),
            'src' => $this->getUrl(),
            'srcset' => strlen($this->getSrcset()) ? $this->getSrcset() : null,
            // 'responsive_images' => $this->whenHas('responsive_images', $this->responsive_images),
            'manipulations' => $this->whenHas('manipulations', $this->manipulations),
            'custom_properties' => $this->whenHas('custom_properties', $this->custom_properties),
            'generated_conversions' => $this->whenHas('generated_conversions', $this->generated_conversions),
            'created_at' => $this->whenHas('created_at', $this->created_at),
            'updated_at' => $this->whenHas('updated_at', $this->updated_at),
            'readable_created_at' => $this->whenHas('created_at', $this->created_at->diffForHumans()),
            'readable_updated_at' => $this->whenHas('updated_at', $this->updated_at->diffForHumans()),
            'order_column' => $this->whenHas('order_column', $this->order_column),
        ];
    }
}
