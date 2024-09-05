/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
            },
            {
                protocol: "https",
                hostname: "veekun.com",
                pathname: "/dex/media/types/en/**",
            }
        ]
    }
};

module.exports = nextConfig;
