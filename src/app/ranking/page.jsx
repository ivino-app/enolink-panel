"use client";
import { Suspense } from "react";
import RankinContent from "./rankingContent";
export default function Page() {
    return (
        <Suspense fallback={<p>Carregando...</p>}>
            <RankinContent />
        </Suspense>
    );
}
