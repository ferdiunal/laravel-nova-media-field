<?php

namespace Ferdiunal\NovaMediaField\Http\Controllers;

use Ferdiunal\NovaMediaField\Http\Resources\MediaResource;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MediaLibraryController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = Media::query()
            ->when($request->has('s') && $request->s, function ($query) use ($request) {
                $query->whereRaw('UPPER(name) LIKE ?', ['%'.strtoupper($request->s).'%']);
            })
            ->orderBy('order_column', 'asc')
            ->paginate(15);

        return MediaResource::collection(
            $query
        );
    }
}
