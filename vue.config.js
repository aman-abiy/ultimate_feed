module.exports = {
    runtimeCompiler: true,

    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Ultimate Feed'
                return args
            })
    }
}