<?php

namespace Ferdiunal\NovaMediaField;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Nova;

class NovaMediaFieldServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->booted(function () {
            $this->routes();
        });

        Nova::serving(function (ServingNova $event) {
            Nova::script('nova-media', realpath(__DIR__ . '/../dist/js/field.js'));
            Nova::style('nova-media', realpath(__DIR__ . '/../dist/css/field.css'));
            Nova::translations(realpath(__DIR__ . sprintf('/../lang/%s/nova-media.json', $this->app->getLocale())));
        });
    }

    protected function routes()
    {
        if ($this->app->routesAreCached()) {
            return;
        }

        Route::middleware(['nova'])
            ->prefix('nova-vendor/ferdiunal/laravel-nova-media-field')
            ->group(__DIR__ . '/../routes/api.php');
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
