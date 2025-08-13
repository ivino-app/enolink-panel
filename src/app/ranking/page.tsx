// Versão simplificada do componente usando o hook
"use client";

import { FaStar, FaCrown, FaMedal } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useRanking } from "@/hooks/useRanking";

export default function RankingPageSimplified() {
    const params = useParams();
    const searchParams = useSearchParams();
    const eventId = params?.eventId || searchParams?.get("eventId") || searchParams?.get("id");

    import { useRouter } from "next/router";
    import { useRanking } from "@/hooks/useRanking";
    import { FaStar, FaCrown, FaMedal } from "react-icons/fa";
    
    export default function RankingPage() {
      const router = useRouter();
      const { eventId } = router.query as { eventId: string };
      const { ranking, loading } = useRanking(eventId || "");
    
      if (loading) return <p>Carregando ranking...</p>;
    
      const top3 = ranking.slice(0, 3);
      const others = ranking.slice(3);

    

    if (loading) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-800 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando ranking...</p>
                </div>
            </main>
        );
    }

    if (!eventId) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold mb-2">Ops! Algo deu errado</h1>
                    <p className="text-gray-600 mb-4">{"ID do evento não encontrado"}</p>
                    <button onClick={() => window.location.reload()} className="bg-red-800 text-white px-6 py-2 rounded hover:opacity-90">
                        Tentar novamente
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white text-black">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-[#0F0F1B] text-white p-4 flex justify-between items-center shadow-md">
                <div className="text-2xl font-bold">EnoLink</div>
                <div className="text-sm text-right">
                    <div className="font-semibold">{eventData?.name || "Carregando..."}</div>
                    <div className="text-gray-300">{eventData?.location || ""}</div>
                </div>
                <button onClick={shareRanking} className="bg-red-800 px-4 py-2 rounded text-sm hover:opacity-80">
                    Compartilhar
                </button>
            </header>
            <div className="h-20" />

            {/* Título */}
            <section className="text-center py-8 px-4">
                <h1 className="text-4xl font-bold mb-2">Ranking Final</h1>
                <p className="text-gray-600">Os melhores vinhos avaliados pelos participantes do evento</p>
            </section>

            {/* Estatísticas */}
            <div className="flex justify-center gap-10 text-center mb-10 text-xl font-medium">
                <div>
                    <span className="text-red-800 text-3xl">{stats.totalWines}</span>
                    <br />
                    Vinhos Avaliados
                </div>
                <div>
                    <span className="text-red-800 text-3xl">{stats.totalParticipants}</span>
                    <br />
                    Total de Avaliações
                </div>
                <div>
                    <span className="text-red-800 text-3xl">{stats.averageRating}</span>
                    <br />
                    Nota Média
                </div>
            </div>

            {/* Top 3 */}
            {top3.length > 0 && (
                <section className="flex justify-center gap-8 mb-12 px-4 flex-wrap">
                    {top3.map((wine) => (
                        <div key={wine.id} className={`text-center p-4 rounded-xl shadow-lg w-60 ${wine.position === 1 ? "border-2 border-red-800" : ""}`}>
                            <div className="text-4xl mb-2">
                                {wine.position === 1 ? (
                                    <FaCrown className="text-red-800 mx-auto" />
                                ) : wine.position === 2 ? (
                                    <FaMedal className="text-gray-400 mx-auto" />
                                ) : (
                                    <FaMedal className="text-orange-300 mx-auto" />
                                )}
                            </div>

                            {wine.image && (
                                <div className="w-16 h-24 mx-auto mb-2 relative">
                                    <img
                                        src={wine.image}
                                        alt={wine.name}
                                        className="w-full h-full object-contain"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />
                                </div>
                            )}

                            <h3 className="text-lg font-semibold">{wine.name}</h3>
                            <p className="text-sm text-gray-600">{wine.country || wine.region}</p>
                            <div className="flex justify-center gap-1 my-2 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={i < Math.round(wine.rating) ? "" : "text-gray-300"} />
                                ))}
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                                {wine.totalRatings} avaliação{wine.totalRatings !== 1 ? "ões" : ""}
                            </div>
                            <div
                                className={`mt-2 text-white font-bold rounded-full px-4 py-1 w-fit mx-auto ${
                                    wine.position === 1 ? "bg-red-800" : wine.position === 2 ? "bg-gray-400" : "bg-orange-300"
                                }`}
                            >
                                #{wine.position}
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Ranking Completo */}
            {others.length > 0 && (
                <section className="px-4 max-w-3xl mx-auto mb-16">
                    <h2 className="text-2xl font-bold mb-4">Ranking Completo</h2>
                    {others.map((wine) => (
                        <div key={wine.id} className="flex justify-between items-center p-4 border rounded-lg mb-3 shadow-sm">
                            <div className="flex items-center gap-4">
                                {wine.image && (
                                    <div className="w-12 h-16 flex-shrink-0">
                                        <img
                                            src={wine.image}
                                            alt={wine.name}
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />
                                    </div>
                                )}
                                <div>
                                    <div className="font-semibold">
                                        #{wine.position} {wine.name}
                                    </div>
                                    <div className="text-sm text-gray-600">{wine.country || wine.region}</div>
                                    <div className="text-xs text-gray-500">
                                        {wine.totalRatings} avaliação{wine.totalRatings !== 1 ? "ões" : ""}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={i < Math.round(wine.rating) ? "" : "text-gray-300"} />
                                ))}
                                <span className="ml-2 text-black font-medium">{wine.rating.toFixed(1)}</span>
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Estado vazio */}
            {wines.length === 0 && !loading && (
                <section className="text-center py-12">
                    <div className="text-6xl mb-4">🍷</div>
                    <h2 className="text-2xl font-bold mb-2">Ainda não há avaliações</h2>
                    <p className="text-gray-600">Os participantes ainda não avaliaram os vinhos deste evento.</p>
                </section>
            )}

            {/* Rodapé */}
            <footer className="bg-[#0F0F1B] text-white text-center py-8">
                <div className="text-xl mb-2">🍷 EnoLink</div>
                <p className="text-sm text-gray-300 mb-4">Conectando apreciadores de vinho através de experiências autênticas de degustação</p>
                <button className="bg-red-800 px-6 py-2 rounded hover:opacity-90 text-sm">📱 Baixar App</button>
            </footer>
        </main>
    );
}
