/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "nndaudioapp.mirzapar.com"
            }
        ],
        domains: ['i.ytimg.com'],
    }
}

module.exports = nextConfig
