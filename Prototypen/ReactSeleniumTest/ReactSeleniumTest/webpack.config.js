const path = require("path");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
module.exports = {
  entry: path.resolve(__dirname, "./Content/components/expose-components.js"),
  output: {
    filename: "[name].[contenthash:8].js",
    globalObject: "this",
    path: path.resolve(__dirname, "wwwroot/dist"),
    publicPath: "/dist/",
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  optimization: {
    runtimeChunk: {
      name: "runtime", // necessary when using multiple entrypoints on the same page
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx', '.json']
  },
  plugins: [
    new WebpackManifestPlugin({
      fileName: "asset-manifest.json",
      generate: (seed, files) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);

        const entrypointFiles = files
          .filter((x) => x.isInitial && !x.name.endsWith(".map"))
          .map((x) => x.path);

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        };
      },
    }),
  ],
};
