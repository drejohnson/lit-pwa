module.exports = {
  globDirectory: "./",
  globPatterns: ["dist/**/*.{jpg,svg,png,html,json,md,js,css,woff2}"],
  swDest: "dist/sw.js",
  runtimeCaching: [
    {
      urlPattern: /^(https?.*)/,
      handler: 'networkFirst',
      options: {
        cacheName: 'cache-https',
        expiration: {
          maxEntries: 50
        },
        networkTimeoutSeconds: 3
      }
    },
    {
      urlPattern: new RegExp(
        'https://fonts.googleapis.com/(.*)'
      ),
      // Apply a cache-first strategy.
      handler: 'cacheFirst',
      options: {
        cacheName: 'googleapis',
        expiration: {
          maxEntries: 50
        }
      }
    },
    {
      // Match any request ends with .png, .jpg, .jpeg or .svg.
      urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
      // Apply a cache-first strategy.
      handler: "cacheFirst",
      options: {
        cacheName: 'images-cache',
        // Only cache 60 images.
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
        },
        cacheableResponse: {
          statuses: [0, 200]
        }
      }
    },
    {
      urlPattern: /\.(?:js|css)$/,
      handler: 'staleWhileRevalidate',
      options: {
        cacheName: 'static-resources'
      }
    },
    {
      urlPattern: /.*(?:googleapis)\.com.*$/,
      handler: 'staleWhileRevalidate',
      options: {
        cacheName: 'googleapis-cache'
      }
    },
    {
      urlPattern: /.*(?:gstatic)\.com.*$/,
      handler: 'staleWhileRevalidate',
      options: {
        cacheName: 'gstatic-cache'
      }
    }
  ]
};
