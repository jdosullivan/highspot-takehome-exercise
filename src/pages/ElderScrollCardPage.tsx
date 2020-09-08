import React, { useState, useEffect } from "react";
import { fetchCards } from "../api/ElderScrollApi";
import { CardModel } from "../core/Models";
import SearchForm from "../components/SearchForm";
import CardGrid from "../components/CardGrid";
import PageHeader from "../components/PageHeader";
import "../styles/ElderScrollCardPage.css";

const pageSize: number = 20;

const ElderScrollCardPage = () => {
    const [listItems, _setListItems] = useState<CardModel[]>([]);
    const [totalItems, _setTotalItems] = useState<number | undefined>(undefined);
    const [totalSearchResults, setTotalSearchResults] = useState<number | undefined>(undefined);
    const [isFetching, _setIsFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [searchResults, setSearchResults] = useState<CardModel[] | undefined>(undefined);
    const [isSearching, setIsSearching] = React.useState<boolean>(false);

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
        setIsSearching(true);
        const data = await fetchCards({
            name: searchTerm, // This does a partial match. Should we be doing an exact match?
        });
        setSearchResults(data.cards);
        setIsSearching(false);
        setTotalSearchResults(data._totalCount);
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
    const setListItems = (val: CardModel[]) => {
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
        fetchMoreListItems();
    }, [isFetching]);

    return (
        <>
            <PageHeader />
            <SearchForm fetchItems={searchData} clearSearchResults={clearSearchResults} />
            {isSearching && <div className="searchingTextBlock">Searching...</div>}
            {!isSearching && (
                <div className="results">
                    <div className="displayCount">
                        {searchResults && <div>{totalSearchResults} cards found</div>}
                        {!searchResults && (
                            <div>
                                {listItems.length} of {totalItems} cards displayed
                            </div>
                        )}
                    </div>
                    <CardGrid cards={searchResults ?? listItems} />
                    {listItems && isFetching && <div className="searchingTextBlock">Fetching more list items...</div>}
                </div>
            )}
        </>
    );
};

export default ElderScrollCardPage;
