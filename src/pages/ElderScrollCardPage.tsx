import React, { useEffect, useState } from "react";
import ElderScrollCard from "../components/ElderScrollCard";
import { ElderScrollCardModel } from "../core/Models";
import { ElderScrollCardsApiResponse, fetchCards, FetchParams } from "../api/ElderScrollApi";

export const pageSize: number = 20;

function ElderScrollCardPage() {
    const [cards, setCards] = useState<ElderScrollCardModel[] | undefined>([]);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        async function fetchElderScrollCards() {
            const scrollCardResponse: ElderScrollCardsApiResponse = await fetchCards({
                pageSize,
                page,
            });

            // Todo: handle errors here

            setCards(scrollCardResponse.cards);
        }

        fetchElderScrollCards();
    }, []);

    return (
        <div className="ElderScrollCardPage">
            I will be the elder scrolls card page
            <ElderScrollCard />
        </div>
    );
}

export default ElderScrollCardPage;
