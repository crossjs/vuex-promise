require('babel-register')

var webpack = require('webpack')

webpack({
  target: 'web',
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'index.js',
    library: 'ndpromise',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true
      }
    })
  ],
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }]
  }
}).run((err, stats) => {
  const jsonStats = stats.toJson()

  console.log('Webpack compile completed.')
  console.log(stats.toString({
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    colors: true
  }))

  if (err) {
    console.log('Webpack compiler encountered a fatal error.', err)
    process.exit(1)
  } else if (jsonStats.errors.length > 0) {
    console.log('Webpack compiler encountered errors.')
    console.log(jsonStats.errors)
    process.exit(1)
  } else if (jsonStats.warnings.length > 0) {
    console.log('Webpack compiler encountered warnings.')
  } else {
    console.log('No errors or warnings encountered.')
  }
})
