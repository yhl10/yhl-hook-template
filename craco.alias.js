const path = require('path');

const pathDir = pathname => path.resolve(__dirname, pathname);

module.exports = {
    '@': pathDir('src'),
    '@pages': pathDir('src/pages'),
    '@components': pathDir('src/components'),
    '@routers': pathDir('src/routers'),
    '@useHook': pathDir('src/useHook'),
    '@utils': pathDir('src/utils'),
}