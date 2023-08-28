const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nadav-website.s3.us-west-001.backblazeb2.com",
      },
    ],
  },
};

module.exports = withContentlayer(nextConfig);
