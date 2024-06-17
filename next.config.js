const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("next/constants");

/** @type {(phase: string, defaultConfig: import("next").NextConfig) => Promise<import("next").NextConfig>} */
module.exports = async (phase) => {
    /** @type {import("next").NextConfig} */
    const nextConfig = {};

    if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
        const withSerwist = (await import("@serwist/next")).default({
            // Note: This is only an example. If you use Pages Router,
            // use something else that works, such as "service-worker/index.ts".
            swSrc: "src/app/sw.ts",
            swDest: "public/sw.js",
        });
        return withSerwist(nextConfig);
    }

    return nextConfig;
};