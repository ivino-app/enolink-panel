"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { FaStar, FaCrown, FaMedal, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { useRanking } from "@/hooks/useRanking";
import { useEventData } from "@/hooks/useEventData";

// Componente auxiliar para renderizar as estrelas
const StarRating = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Adiciona estrelas cheias
    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    // Adiciona meia estrela se necessário
    if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    // Adiciona estrelas vazias
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return <div className="flex gap-1">{stars}</div>;
};

export default function RankingContent() {
    const params = useParams();
    const searchParams = useSearchParams();
    const eventId = params?.eventId || searchParams?.get("eventId") || searchParams?.get("id") || "";
    const { ranking, loading: rankingLoading } = useRanking(eventId);
    console.log(ranking, `event  id`);
    const { eventData, loading: eventLoading } = useEventData(eventId);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({ totalWines: 0, totalParticipants: 0, averageRating: 0 });

    // Atualiza estatísticas sempre que o ranking muda
    useEffect(() => {
        if (ranking?.length === 0) {
            setStats({ totalWines: 0, totalParticipants: 0, averageRating: 0 });
            return;
        }

        try {
            const totalWines = ranking?.length;
            const totalParticipants = ranking?.reduce((sum, w) => sum + (w.totalRatings || 0), 0) || 0;
            const averageRating = totalParticipants > 0 ? ranking?.reduce((sum, w) => sum + (w.rating || 0) * (w.totalRatings || 0), 0) / totalParticipants : 0;

            setStats({ totalWines, totalParticipants, averageRating });
        } catch (err) {
            setError(err);
            console.error("Erro ao calcular estatísticas:", err);
        }
    }, [0]);

    const top3 = (ranking || []).slice(0, 3);
    const others = (ranking || []).slice(3);

    if (rankingLoading && eventLoading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600 text-xl">Carregando ranking...</p>
            </main>
        );
    }

    if (!eventId) {
        return (
            <main className="min-h-screen flex items-center justify-center text-center">
                <div>
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold mb-2">Ops! Algo deu errado</h1>
                    <p className="text-gray-600 mb-4">ID do evento não encontrado</p>
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
                <button className="bg-red-800 px-4 py-2 rounded text-sm hover:opacity-80">Compartilhar</button>
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
                    <span className="text-red-800 text-3xl">{stats.averageRating.toFixed(1)}</span>
                    <br />
                    Nota Média
                </div>
            </div>

            {top3?.length > 0 && (
                <div className="overflow-y-auto">
                    <ul class="space-y-2">
                        {/* Top 3 */}
                        {top3?.length > 0 && (
                            <section className="flex justify-center gap-8 mb-12 px-4 flex-wrap">
                                {top3.map((wine, i) => (
                                    <div key={wine.id} className={`text-center p-4 rounded-xl shadow-lg w-60 ${i === 0 ? "border-2 border-red-800" : ""}`}>
                                        <div className="text-4xl mb-2">
                                            {i === 0 ? (
                                                <FaCrown className="text-red-800 mx-auto" />
                                            ) : i === 1 ? (
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
                                                    onError={(e) => (e.currentTarget.style.display = "none")}
                                                />
                                            </div>
                                        )}

                                        <h3 className="text-lg font-semibold">{wine.name}</h3>
                                        <p className="text-sm text-gray-600">{wine.country || wine.region}</p>
                                        <div className="flex justify-center my-2">
                                            <StarRating rating={wine.rating || 0} />
                                        </div>
                                        <div className="text-sm text-gray-600 mb-2">
                                            {wine.totalRatings || 0} avalia{wine.totalRatings != 1 ? "ões" : "ção"}
                                        </div>
                                        <div
                                            className={`mt-2 text-white font-bold rounded-full px-4 py-1 w-fit mx-auto ${
                                                i === 0 ? "bg-red-800" : i === 1 ? "bg-gray-400" : "bg-orange-300"
                                            }`}
                                        >
                                            #{i + 1}
                                        </div>
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* Ranking Completo */}
                        {others?.length > 0 && (
                            <section className="px-4 max-w-3xl mx-auto mb-16">
                                <h2 className="text-2xl font-bold mb-4">Ranking Completo</h2>
                                {others.map((wine, idx) => (
                                    <div key={wine.id} className="flex justify-between items-center p-4 border rounded-lg mb-3 shadow-sm">
                                        <div className="flex items-center gap-4">
                                            {wine.image && (
                                                <div className="w-12 h-16 flex-shrink-0">
                                                    <img
                                                        src={wine.image}
                                                        alt={wine.name}
                                                        className="w-full h-full object-contain"
                                                        onError={(e) => (e.currentTarget.style.display = "none")}
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-semibold">
                                                    #{idx + 4} {wine.name}
                                                </div>
                                                <div className="text-sm text-gray-600">{wine.country || wine.region}</div>
                                                <div className="text-xs text-gray-500">
                                                    {wine.totalRatings || 0} avaliação
                                                    {wine.totalRatings !== 1 ? "ões" : ""}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <StarRating rating={wine.rating || 0} />
                                            <span className="ml-2 text-black font-medium">{(wine.rating || 0).toFixed(1)}</span>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        )}
                    </ul>
                </div>
            )}

            {/* Estado vazio */}
            {ranking?.length == 0 && (
                <section className="text-center py-12">
                    <div className="text-6xl mb-4">🍷</div>
                    <h2 className="text-2xl font-bold mb-2">Ainda não há avaliações</h2>
                    <p className="text-gray-600">Os participantes ainda não avaliaram os vinhos deste evento.</p>
                </section>
            )}

            {/* Rodapé */}
            <footer className="bg-[#0F0F1B] text-white text-center py-8 absolute bottom-0 w-full">
                <div className="text-xl mb-2">🍷 EnoLink</div>
                <p className="text-sm text-gray-300 mb-4">Conectando apreciadores de vinho através de experiências autênticas de degustação</p>
                <button className="bg-red-800 px-6 py-2 rounded hover:opacity-90 text-sm">📱 Baixar App</button>
            </footer>
        </main>
    );
}
