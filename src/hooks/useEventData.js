import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useEventData(eventId) {
    const [eventData, setEventData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!eventId) return;
        const fetchEvent = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, "events", eventId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setEventData(docSnap.data());
                }
            } catch (err) {
                console.error("Erro ao buscar evento:", err);
            }
            setLoading(false);
        };
        fetchEvent();
    }, [eventId]);

    return { eventData, loading };
}
