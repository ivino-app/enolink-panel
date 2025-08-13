"use client";

import { FaStar, FaCrown, FaMedal } from "react-icons/fa";

const mockData = {
    eventName: "Chateau Margaux",
    location: "Balneário Camboriú",
    wines: [
        { name: "Dom Pérignon 2012", country: "Champagne, França", rating: 4.9, position: 1 },
        { name: "Château Margaux 2018", country: "Bordeaux, França", rating: 4.7, position: 2 },
        { name: "Barolo Brunate 2017", country: "Piemonte, Itália", rating: 4.5, position: 3 },
        { name: "Opus One 2019", country: "Napa Valley, EUA", rating: 4.3, position: 4 },
        { name: "Penfolds Grange 2016", country: "Barossa Valley, Austrália", rating: 4.2, position: 5 },
        { name: "Caymus Cabernet 2020", country: "Napa Valley, EUA", rating: 4.0, position: 6 },
        { name: "Antinori Tignanello 2018", country: "Toscana, Itália", rating: 3.8, position: 7 },
        { name: "Cloudy Bay Sauvignon 2021", country: "Marlborough, Nova Zelândia", rating: 3.6, position: 8 },
    ],
    stats: {
        totalWines: 8,
        totalParticipants: 47,
        averageRating: 4.6,
    },
};

export default function RankingPage() {
    const top3 = mockData.wines.slice(0, 3);
    const others = mockData.wines.slice(3);

    return (
        <main className="min-h-screen bg-white text-black">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-[#0F0F1B] text-white p-4 flex justify-between items-center shadow-md">
                <div className="text-2xl font-bold">EnoLink</div>
                <div className="text-sm text-right">
                    Evento: {mockData.eventName}
                    <br />
                    {mockData.location}
                </div>
                <button className="bg-red-900 px-4 py-2 rounded text-sm hover:opacity-80">Compartilhar</button>
            </header>
            <div className="h-20" />
            {/* Título */}
            <section className="text-center py-8 px-4">
                <h1 className="text-4xl font-bold mb-2">Ranking Final</h1>
                <p className="text-gray-600">Os melhores vinhos avaliados pelos nossos especialistas e participantes do evento de degustação</p>
            </section>

            {/* Estatísticas */}
            <div className="flex justify-center gap-10 text-center mb-10 text-xl font-medium">
                <div>
                    <span className="text-red-800 text-3xl">{mockData.stats.totalWines}</span>
                    <br />
                    Vinhos Avaliados
                </div>
                <div>
                    <span className="text-red-800 text-3xl">{mockData.stats.totalParticipants}</span>
                    <br />
                    Participantes
                </div>
                <div>
                    <span className="text-red-800 text-3xl">{mockData.stats.averageRating}</span>
                    <br />
                    Nota Média
                </div>
            </div>

            {/* Top 3 */}
            <section className="flex justify-center gap-8 mb-12 px-4 flex-wrap">
                {top3.map((wine, idx) => (
                    <div key={wine.name} className={`text-center p-4 rounded-xl shadow-lg w-60 ${wine.position === 1 ? "border-2 border-red-800" : ""}`}>
                        <div className="text-4xl mb-2">
                            {wine.position === 1 ? (
                                <FaCrown className="text-red-800 mx-auto" />
                            ) : wine.position === 2 ? (
                                <FaMedal className="text-gray-400 mx-auto" />
                            ) : (
                                <FaMedal className="text-orange-300 mx-auto" />
                            )}
                        </div>
                        <h3 className="text-lg font-semibold">{wine.name}</h3>
                        <p className="text-sm text-gray-600">{wine.country}</p>
                        <div className="flex justify-center gap-1 my-2 text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < Math.round(wine.rating) ? "" : "text-gray-300"} />
                            ))}
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

            {/* Ranking Completo */}
            <section className="px-4 max-w-3xl mx-auto mb-16">
                <h2 className="text-2xl font-bold mb-4">Ranking Completo</h2>
                {others.map((wine) => (
                    <div key={wine.name} className="flex justify-between items-center p-4 border rounded-lg mb-3 shadow-sm">
                        <div>
                            <div className="font-semibold">
                                #{wine.position} {wine.name}
                            </div>
                            <div className="text-sm text-gray-600">{wine.country}</div>
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

            {/* Rodapé */}
            <footer className="bg-[#0F0F1B] text-white text-center py-8">
                <div className="text-xl mb-2">🍷 IVino App</div>
                <p className="text-sm text-gray-300 mb-4">Conectando apreciadores de vinho através de experiências autênticas de degustação</p>
                <button className="bg-red-800 px-6 py-2 rounded hover:opacity-90 text-sm">📱 Baixar App</button>
            </footer>
        </main>
    );
}
