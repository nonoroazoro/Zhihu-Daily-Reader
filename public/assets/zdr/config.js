// Configuration of requirejs.
require.config(
    {
        baseUrl: "assets/zdr/",
        paths: {
            jquery: "../libs/jquery/jquery.min",
            react: "../libs/react/react.min",
            JSXTransformer: "../libs/react/JSXTransformer",
            jsx: "../libs/require/plugins/jsx",
            text: "../libs/require/plugins/text",
        },
    }
);
