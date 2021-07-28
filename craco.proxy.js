module.exports = {
    '/api': {
        target: 'http://192.168.149.1:8081',
        pathRewrite: {'^/api' : ''},
        changeOrigin: true 
    },
}