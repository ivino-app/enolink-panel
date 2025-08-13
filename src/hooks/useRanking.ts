import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useRanking(eventId: string) {
    const [ranking, setRanking] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!eventId) return;

        const fetchRanking = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, "wineRankings"), where("eventId", "==", eventId), orderBy("rating", "desc"));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setRanking(data);
            } catch (err) {
                console.error("Erro ao buscar ranking:", err);
            }
            setLoading(false);
        };

        fetchRanking();
    }, [eventId]);

    return { ranking, loading };
}
