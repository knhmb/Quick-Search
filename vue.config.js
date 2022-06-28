module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "https://quick-search.dev.marvelconnect.com",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
