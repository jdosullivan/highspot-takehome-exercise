import React, { useEffect } from "react";

const typingTimeout: number = 2; // Number of seconds to wait after typing before searching

export interface ISearchFormProps {
    fetchItems: Function;
    clearSearchResults: Function;
}

function SearchForm(props: ISearchFormProps) {
    const [searchTerm, setSearchTerm] = React.useState<string | undefined>(undefined);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!searchTerm || searchTerm.trim() === "") {
                props.clearSearchResults();
            } else {
                props.fetchItems(searchTerm.toLowerCase().trim());
            }
        }, typingTimeout * 1000);

        return () => clearTimeout(timeout);
    }, [searchTerm]);

    return (
        <div className="SearchForm">
            <input type="text" placeholder="Search by card name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
    );
}

export default SearchForm;
