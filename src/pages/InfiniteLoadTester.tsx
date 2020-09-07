import React, { useCallback, useState, useEffect, Suspense } from "react";
import { ElderScrollCardsApiResponse } from "../api/ElderScrollApi";
import { ElderScrollCardModel } from "../core/Models";
const ImageComponent = React.lazy(() => import("./Image"));

const List = () => {
    const [listItems, setListItems] = useState<ElderScrollCardModel[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize: number = 20;

    const fetchData = useCallback(() => {
        setTimeout(async () => {
            const result = await fetch(`https://api.elderscrollslegends.io/v1/cards?page=${page}&pageSize=${pageSize}`);
            const data: ElderScrollCardsApiResponse = await result.json();
            setPage(page + 1);
            setListItems((): any => {
                return [...listItems, ...data.cards];
            });
        }, 1000);
    }, [listItems, page]);

    useEffect(() => {
        const handleScroll = () => {
            if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight || isFetching) return;
            setIsFetching(true);
            console.log(isFetching);
        };

        fetchData();
        window.addEventListener("scroll", handleScroll);
    }, [fetchData, isFetching]);

    useEffect(() => {
        const fetchMoreListItems = () => {
            fetchData();
            setIsFetching(false);
        };

        if (!isFetching) return;
        fetchMoreListItems();
    }, [fetchData, isFetching]);

    return (
        <>
            {listItems.map((listItem: ElderScrollCardModel) => (
                <div className="card" key={listItem.id}>
                    <Suspense fallback={<img src="https://media.tenor.com/images/b660fe2525e3a20771c924a6cdd16d35/tenor.gif" alt="Avatar" style={{ width: "50%" }} />}>
                        <ImageComponent src={listItem.imageUrl} />
                    </Suspense>

                    <div className="container">
                        <h4>
                            <b>{listItem.name}</b>
                        </h4>
                        <p>Architect & Engineer</p>
                    </div>
                </div>
            ))}
            {isFetching && <h1>Fetching more list items...</h1>}
        </>
    );
};

export default List;
