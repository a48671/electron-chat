const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'js', 'index.jsx'),
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'build', 'js'),
    filename: 'app.js',
    clean: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }],
              ["@babel/preset-react", { "development": true }]
            ]
          }
        }
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      }
    ]
  }
};
