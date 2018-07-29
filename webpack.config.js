
module.exports = {
  mode:  "development",
  entry: [
    './public/src/index.js'
  ],
  output: {
    path: __dirname + '/public/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: "eval",
  module: {
    rules: [{
      exclude: /node_modules/,
      use:
      { loader: 'babel-loader' }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    "alias": {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './public'
  }
};
