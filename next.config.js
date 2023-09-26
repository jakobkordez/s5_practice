// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = withPWA(nextConfig);
