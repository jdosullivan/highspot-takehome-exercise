import React, { useState, useEffect } from "react";
import { fetchCards } from "../api/ElderScrollApi";
import { ElderScrollCardModel } from "../core/Models";

// const ImageComponent = React.lazy(() => import("./Image"));

const List = () => {
    const [listItems, _setListItems] = useState<ElderScrollCardModel[]>([]);
    const [totalItems, _setTotalItems] = useState<number | undefined>(undefined);
    const [isFetching, _setIsFetching] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize: number = 20;

    const fetchData = async () => {
        const data = await fetchCards({
            pageSize,
            page,
        });
        setTotalItems(data._totalCount);
        setPage(page + 1);
        setListItems([...listItems, ...data.cards]);
    };

    // ******** Define refs for handlers in react ***************************
    // Note: The only way to access react state in event listeners when using hooks, is to use useRef
    // The refs wrap the set functions for state objects and set a 'reference' to the value being updated
    // which can then be accessed by the event listener
    const isFetchingRef = React.useRef(isFetching);
    const setIsFetching = (val: boolean) => {
        isFetchingRef.current = val;
        _setIsFetching(val);
    };

    const totalItemsRef = React.useRef(totalItems);
    const setTotalItems = (val: number) => {
        totalItemsRef.current = val;
        _setTotalItems(val);
    };

    const listItemsRef = React.useRef(listItems);
    const setListItems = (val: ElderScrollCardModel[]) => {
        listItemsRef.current = val;
        _setListItems(val);
    };
    // **************** End state refs ***********************************************

    // This effect runs on initial load only and loads the first page of data
    // It also sets up the scroll listener
    useEffect(() => {
        const handleScroll = () => {
            if (
                (totalItemsRef.current && listItemsRef.current.length >= totalItemsRef.current) ||
                Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
                isFetchingRef.current
            )
                return;
            setIsFetching(true);
            console.log(`isFetching: ${isFetchingRef.current}`);
        };

        fetchData();
        window.addEventListener("scroll", handleScroll);
    }, []);

    // This effect runs every time we scroll to the end of the page and there is more data to load
    useEffect(() => {
        const fetchMoreListItems = () => {
            fetchData();
            setIsFetching(false);
        };

        if (!isFetching) return;

        setTimeout(async () => {
            fetchMoreListItems();
        }, 1000);
    }, [isFetching]);

    return (
        <>
            {listItems.map((listItem: ElderScrollCardModel, index: number) => (
                <div className="card" key={`${listItem.id}_${Math.random()}`}>
                    {/* <Suspense fallback={<img src="https://media.tenor.com/images/b660fe2525e3a20771c924a6cdd16d35/tenor.gif" alt="Avatar" style={{ width: "50%" }} />}>
                        <ImageComponent src={listItem.imageUrl} />
                    </Suspense> */}

                    <div className="container">
                        <h4>
                            <b>
                                {index}: {listItem.name}
                            </b>
                        </h4>
                    </div>
                </div>
            ))}
            {isFetching && <h1>Fetching more list items...</h1>}
        </>
    );
};

export default List;
