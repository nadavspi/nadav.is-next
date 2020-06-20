const withFonts = require("next-fonts");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([withFonts], {
  webpack(config, options) {
    return config;
  }
});
