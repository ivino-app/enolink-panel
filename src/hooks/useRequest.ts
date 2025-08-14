"use client";

import { api } from "@/lib/axios";

export const useRequest = () => {
    async function getAllEvents() {
        return await api
            .get("/events")
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(`deu ruim, ${JSON.stringify(error.response.data)}`);
                throw Error(`Algo deu errado: ${error}`);
            });
    }

    async function getEventById(id: string): Promise<unknown> {
        return await api
            .get(`/events/${id}`)
            .then((response) => {
                console.log(`ID FO EVENTO: ${JSON.stringify(response.data)}`);
                return JSON.stringify(response.data);
            })
            .catch((error) => {
                console.log(`Não foi poss;ivel buscar os eventos por ID: ${JSON.stringify(error.response.data)}`);
                throw Error(`Não foi poss;ivel buscar os eventos por ID: ${JSON.stringify(error.response.data)}`);
            });
    }

    async function getRanking(eventId: string) {
        return await api
            .get(`/ranking/${eventId}`)
            .then((response) => {
                console.log(`Buscou rankings: ${JSON.stringify(response.data)}`);
                return response.data;
            })
            .catch((error) => {
                console.log(`Erro ao buscar ranking: ${error}`);
                throw Error(`Erro ao bbuscar ranking: ${JSON.stringify(error.response.data)}`);
            });
    }

    async function getEvaluationsByEvent(eventId: string) {
        return await api
            .get(`/evaluations/${eventId}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw Error("Algo deu errado", error);
            });
    }

    return {
        getAllEvents,
        getEventById,
        getRanking,
        getEvaluationsByEvent,
    };
};
