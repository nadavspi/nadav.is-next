const { withContentlayer } = require("next-contentlayer");
const { photoLinks } = require("./config/photoLinks");

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    minimumCacheTTL: 604800,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nadav-website.s3.us-west-001.backblazeb2.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/photography",
        destination: photoLinks[0].href,
        permanent: false,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
