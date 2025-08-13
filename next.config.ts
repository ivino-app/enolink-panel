import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        // Desabilita o botão de ferramentas de dev do App Router
        nextScriptWorkers: false,
    },
    devIndicators: {
        buildActivity: false, // remove ícone "building..."
    },
};

export default nextConfig;
