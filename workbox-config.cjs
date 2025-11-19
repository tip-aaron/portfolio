module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{js,css,png,jpg,webp,svg,json}"],
  swDest: "dist/workbox-sw.js",
  runtimeCaching: [
    {
      urlPattern: ({ request }) => request.destination === "image",
      handler: "CacheFirst",
      options: {
        cacheName: "img-cache",
        expiration: {
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        },
      },
    },
  ],
};
