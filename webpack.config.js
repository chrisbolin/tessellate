const webpack = require("webpack");

const EXCLUDE = /node_modules/;

new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
}),

module.exports = {
  entry: ["./src/index.js", "./src/index.scss"],
  output: {
    filename: "dist/bundle.js"
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    })
  ],
  watch: false
};
