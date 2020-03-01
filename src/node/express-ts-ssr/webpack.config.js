const path = require("path");

module.exports = function(env, argv) {
  // default to the server configuration
  const base = {
    mode: "development",
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      // path needs to be an ABSOLUTE file path
      path: path.resolve(process.cwd(), "dist"),
      publicPath: "/"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "cheap-module-eval-source-map",
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader"
            }
          ]
        }
      ]
    }
  };

  // server-specific configuration
  if (env.platform === "server") {
    base.entry = "./src/index.ts";
    base.target = "node";
    base.output.filename = "index.js";
  }

  // client-specific configurations
  if (env.platform === "client") {
    base.entry = "./src/client/index.tsx";
    base.output.filename = "client.js";
  }

  return base;
};
