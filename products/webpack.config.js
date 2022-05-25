const HTMLWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 8081,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "products",
      filename: "remoteEntry.js",
      exposes: {
        "./ProductsIndex": "./src/bootstrap", //help import in Host shorter
      },
      shared: ["faker"], //async, so when we run this project, faker is not loaded before import => need to use import('xxx')
      //if faker version are not "identical" (if version have ^ and if major version are not identical) it will become 2 file.
      //it is good because we want to use 1 version for each project
    }),
    new HTMLWebpackPlugin({
      template: "./public/index.html", // add script tag into this file
    }),
  ],
};
