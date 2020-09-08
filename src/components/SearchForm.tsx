import React, { useEffect } from "react";
import "../styles/SearchForm.css";

const typingTimeout: number = 1; // Number of seconds to wait after typing before searching

export interface ISearchFormProps {
    fetchItems: Function;
    clearSearchResults: Function;
}

function SearchForm(props: ISearchFormProps) {
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const { clearSearchResults, fetchItems } = props;

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchTerm.trim() === "") {
                clearSearchResults();
            } else {
                fetchItems(searchTerm.toLowerCase().trim());
            }
        }, typingTimeout * 1000);

        return () => clearTimeout(timeout);
    }, [searchTerm]);

    return (
        <div className="searchForm">
            <input className="searchBox" type="text" placeholder="Search by card name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button
                className="clear"
                type="reset"
                title="Clear search results"
                onClick={(e) => {
                    setSearchTerm("");
                    clearSearchResults();
                }}
            >
                <div>
                    <span>&#x2715;</span>
                </div>
            </button>
        </div>
    );
}

export default SearchForm;
