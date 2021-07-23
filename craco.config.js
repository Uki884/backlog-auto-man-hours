module.exports = {
    webpack: {
        configure: (webpackConfig, {env, paths}) => {
            return {
                ...webpackConfig,
                entry: {
                    main: './src/pages/main/index.tsx',
                    popup: './src/index.tsx',
                },
                output: {
                    ...webpackConfig.output,
                    filename: 'static/js/[name].js',
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false,
                    splitChunks: {
                        chunks(chunk) {
                            return false
                        },
                    },
                }
            }
        },
    }
}