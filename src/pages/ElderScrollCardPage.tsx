import React, { useState, useEffect } from "react";
import { fetchCards } from "../api/ElderScrollApi";
import { ElderScrollCardModel } from "../core/Models";
import SearchForm from "../components/SearchForm";
import CardList from "../components/CardList";

const pageSize: number = 20;
// const ImageComponent = React.lazy(() => import("./Image"));

const ElderScrollCardPage = () => {
    const [listItems, _setListItems] = useState<ElderScrollCardModel[]>([]);
    const [totalItems, _setTotalItems] = useState<number | undefined>(undefined);
    const [isFetching, _setIsFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [searchResults, setSearchResults] = useState<ElderScrollCardModel[] | undefined>(undefined);

    const fetchData = async () => {
        const data = await fetchCards({
            pageSize,
            page,
        });
        setTotalItems(data._totalCount);
        setPage(page + 1);
        setListItems([...listItems, ...data.cards]);
    };

    const searchData = async (searchTerm: string) => {
        const data = await fetchCards({
            name: searchTerm, // This does a partial match. Should we be doing an exact match?
        });
        setSearchResults(data.cards);
        // setTotalItems(data._totalCount);
        return data.cards;
    };

    const clearSearchResults = (): void => {
        setSearchResults(undefined);
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
            <SearchForm fetchItems={searchData} clearSearchResults={clearSearchResults} />
            {searchResults && <CardList cards={searchResults} />}
            {!searchResults && <CardList cards={listItems} />}
            {isFetching && <h1>Fetching more list items...</h1>}
        </>
    );
};

export default ElderScrollCardPage;
