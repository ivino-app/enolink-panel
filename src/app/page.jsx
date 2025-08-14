"use client";

import { Suspense } from "react";
import RankingContent from "./ranking/rankingContent";
export default function RankingPage() {
    return (
        <Suspense fallback={<p>Carregando...</p>}>
            <RankingContent />
        </Suspense>
    );
}
