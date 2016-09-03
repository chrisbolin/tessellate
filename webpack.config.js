const EXCLUDE = /node_modules/;

module.exports = {
  entry: ["./index.js", "./index.scss"],
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: EXCLUDE,
        query: {
          presets: ['react', 'stage-2', 'es2016', 'es2015']
        },
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        exclude: EXCLUDE,
      }
    ]
  },
  watch: true
}
