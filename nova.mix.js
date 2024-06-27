const mix = require("laravel-mix");
const webpack = require("webpack");
const path = require("path");

class NovaExtension {
    name() {
        return "nova-media";
    }

    register(name) {
        this.name = name;
    }

    webpackPlugins() {
        return new webpack.ProvidePlugin({
            _: "lodash",
            Errors: "form-backend-validation",
        });
    }

    webpackConfig(webpackConfig) {
        webpackConfig.externals = {
            vue: "Vue",
        };

        webpackConfig.resolve.alias = {
            ...(webpackConfig.resolve.alias || {}),
            "laravel-nova": path.join(
                __dirname,
                "../../vendor/laravel/nova/resources/js/mixins/packages.js"
            ),
            "inline-form-data": path.join(
                __dirname,
                "../../vendor/laravel/nova/resources/js/fields/Form/InlineFormData.js"
            ),
            "laravel-nova-useLocalization": path.join(
                __dirname,
                "../../vendor/laravel/nova/resources/js/composables/useLocalization.js"
            ),
            "laravel-nova-useDragAndDrop": path.join(
                __dirname,
                "../../vendor/laravel/nova/resources/js/composables/useDragAndDrop.js"
            ),
        };

        webpackConfig.output = {
            uniqueName: this.name,
        };
    }
}

mix.extend("nova", new NovaExtension());
