/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "nndaudioapp.mirzapar.com"
            },
            {
                protocol: "https",
                hostname: "img.youtube.com"
            },
            {
                protocol: "https",
                hostname: "i.ytimg.com"
            }
        ]
    }
}

module.exports = nextConfig
