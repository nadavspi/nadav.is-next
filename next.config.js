const withFonts = require("next-fonts");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([withFonts], {
  webpack(config, options) {
    return config;
  },
  async redirects() {
    return [
      {
        source: "/photography",
        destination: "/photography/artists",
        permanent: false,
      },
    ];
  },
  experimental: {
    // This is experimental but can
    // be enabled to allow parallel threads
    // with nextjs automatic static generation
    workerThreads: false,
    cpus: 1,
  },
});
