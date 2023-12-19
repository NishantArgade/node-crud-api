const path = require("path");

module.exports = {
  entry: "./src/app.js", // Entry point of your Node.js application
  mode: "production",
  target: "node", // Specify the target environment as node
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output filename
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply babel-loader for JavaScript files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // Add other loaders if needed (e.g., for CSS, JSON, etc.)
    ],
  },
};
