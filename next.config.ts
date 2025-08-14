import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        // Desabilita o botão de ferramentas de dev do App Router
        nextScriptWorkers: false,
    },
    output: "export", // Novo jeito de exportar estático
    images: {
        unoptimized: true, // Necessário para export estático
    },
};

export default nextConfig;
