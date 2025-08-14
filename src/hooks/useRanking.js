"use client";

import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useRanking(eventId) {
    const [ranking, setRanking] = useState();
    const [loading, setLoading] = useState(true);

    const getRanking = async () => {
        console.log(eventId);
        if (!eventId) return;
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

    useEffect(() => {
        getRanking();
    }, [eventId, getRanking]);

    return { ranking, loading, getRanking };
}
