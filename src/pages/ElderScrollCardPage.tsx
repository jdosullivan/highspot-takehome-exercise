import React, { useEffect, useState } from "react";
import ElderScrollCard from "../components/ElderScrollCard";
import { ElderScrollCardModel } from "../core/Models";
import { ElderScrollCardsApiResponse, fetchCards } from "../api/ElderScrollApi";
import InfiniteScroll from "react-infinite-scroll-component";

export const pageSize: number = 20;

function ElderScrollCardPage() {
    const [cards, setCards] = useState<ElderScrollCardModel[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalCards, setTotalCards] = useState<number | undefined>(undefined);

    async function fetchElderScrollCards() {
        const scrollCardResponse: ElderScrollCardsApiResponse = await fetchCards({
            pageSize,
            page,
        });

        // Todo: handle errors here

        cards.push(...scrollCardResponse.cards);
        setCards(cards);
        setPage(page + 1);
        setTotalCards(scrollCardResponse._totalCount);
    }

    useEffect(() => {
        fetchElderScrollCards();
    });

    return (
        <div className="ElderScrollCardPage">
            {cards && (
                <InfiniteScroll
                    dataLength={cards.length}
                    next={fetchElderScrollCards}
                    hasMore={!totalCards || cards.length < totalCards}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {cards.map((card, index) => (
                        <div key={index}>
                            <ElderScrollCard />#{index}: {card.name}
                        </div>
                    ))}
                </InfiniteScroll>
            )}
        </div>
    );
}

export default ElderScrollCardPage;
