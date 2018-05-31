module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{jpg,svg,png,html,json,md,js,css,woff2}"],
  swDest: "./sw.js",
  runtimeCaching: [
    {
      // Match any request ends with .png, .jpg, .jpeg or .svg.
      urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
      // Apply a cache-first strategy.
      handler: "cacheFirst",
      options: {
        // Only cache 10 images.
        expiration: {
          maxEntries: 10
        }
      }
    }
  ]
};
