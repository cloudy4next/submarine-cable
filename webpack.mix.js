const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.autoload({
    jquery: ["$", "jQuery", "window.jQuery"],
});
// mix.combine(
//     [
//         "public/assets/dist/css/adminlte.min.css",
//         // "public/assets/dist/css/googlefonts.css",
//         // "public/assets/plugins/fontawesome-free/css/all.min.css",
//         // "public/assets/plugins/sweetalert2/sweetalert2.min.css",
//         "public/assets/plugins/toastr/toastr.min.css",
//         // "resources/sass/app.scss",
//         // "public/assets/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css",
//         // "public/assets/plugins/datatables-responsive/css/responsive.bootstrap4.min.css",
//         // "public/assets/plugins/datatables-buttons/css/buttons.bootstrap4.min.css",
//     ],
//     "public/css/app.css"
// );

mix.js("resources/js/app.js", "public/js")
    .vue()
    .js(
        [
            "public/assets/dist/js/adminlte.min.js",
            "public/assets/plugins/sweetalert2/sweetalert2.min.js",
            // "public/assets/plugins/datatables/jquery.dataTables.min.js",
            // "public/assets/plugins/datatables-responsive/js/dataTables.responsive.min.js",
            // // "public/assets/plugins/datatables-responsive/js/responsive.bootstrap4.min.js",
            // "public/assets/plugins/datatables-buttons/js/dataTables.buttons.min.js",
            // // "public/assets/plugins/datatables-buttons/js/buttons.bootstrap4.min.js",
            // "public/assets/plugins/jszip/jszip.min.js",
            // "public/assets/plugins/pdfmake/pdfmake.min.js",
            // "public/assets/plugins/pdfmake/vfs_fonts.js",
            // "public/assets/plugins/datatables-buttons/js/buttons.html5.min.js",
            // "public/assets/plugins/datatables-buttons/js/buttons.print.min.js",
            // "public/assets/plugins/datatables-buttons/js/buttons.colVis.min.js",
        ],
        "public/js/app.js"
    )
    .sass("resources/sass/app.scss", "public/css")
    .postCss("public/assets/dist/css/adminlte.min.css", "public/css/app.css", [
        require("postcss-custom-properties"),
    ]);
