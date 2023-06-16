/** @type {import('next').NextConfig} */
// require('dotenv').config();

const nextConfig = {
    modularizeImports: {
        "@mui/material": {
          transform: "@mui/material/{{member}}"
        },
        "@mui/icons-material": {
          transform: "@mui/icons-material/{{member}}"
        }
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
          },
        ],
      },
}

module.exports = nextConfig
