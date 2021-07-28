const CracoLessPlugin = require('craco-less');
const CracoProxy = require('./craco.proxy');
const CracoAlias = require('./craco.alias');
module.exports = {
    devServer: {
        proxy: {
            ...CracoProxy
        },  
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {'@primary-color': '#1DA57A'},
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    webpack: {
        // extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            ...CracoAlias
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'initial',
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0,
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        priority: 10,
                        enforce: true,
                    },
                },
            },
        },
    },
};
