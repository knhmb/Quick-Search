module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "https://quick-search.dev.marvelconnect.com",
        ws: true,
        changeOrigin: true,
      },
      "^/uat": {
        target: "https://quick-search.uat.marvelconnect.com",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
