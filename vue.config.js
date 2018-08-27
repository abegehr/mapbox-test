// vue.config.js

// baseUrl
let baseUrl = "/";
if (process.env.NODE_ENV === "production") {
  baseUrl = "/mapbox-test/";
}

module.exports = {
  baseUrl: baseUrl
};
