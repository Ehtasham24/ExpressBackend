const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // Your API endpoint
    createProxyMiddleware({
      target: "http://localhost:4000", // Your API server address
      changeOrigin: true,
    })
  );
};
