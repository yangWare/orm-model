const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

console.log(path.resolve(__dirname, './dist/orm-model.js'))

module.exports = {
  outputDir: isProd ? path.resolve(__dirname, './dist') : void 0,
  publicPath: isProd ? '/dist/' : void 0,
  configureWebpack: isProd ? {
    entry: {
      app: './src/lib/index.ts'
    },
    output: {
      filename: 'orm-model.js',
      library: 'orm-model',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    externals: {
      vue: {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
      }
    },
  } : {
    entry: {
      app: './src/demo/main.ts'
    },
  }
}

console.log(module.exports)
