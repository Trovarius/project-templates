var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, "./dist");
var APP_DIR = path.resolve(__dirname, "./src/client");

module.exports = {
  mode: "production",
  entry: {
    main: APP_DIR + "/index.tsx"
  },
  output: {
    filename: "bundle.js",
    path: BUILD_DIR
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /(\.css|.scss)$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  plugins: [
    new HtmlWebpackPlugin({
        hash: true,
        title: 'My Awesome application',
        myPageHeader: 'THUNDERRRRR',
        template: './src/static/index.html',
        filename: './index.html' //relative to root of the application
    }),
    new CopyPlugin([
        { from: './node_modules/react/umd/react.development.js', to: './dependencies/' },
        { from: './node_modules/react-dom/umd/react-dom.development.js', to: './dependencies/' },
      ]),
]
};
