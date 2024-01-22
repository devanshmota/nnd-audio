/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "nndaudioapp.mirzapar.com"
            }
        ]
    }
}

module.exports = nextConfig
