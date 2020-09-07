import React, { useEffect } from "react";

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
        }, 2000);

        return () => clearTimeout(timeout);
    }, [searchTerm]);

    return (
        <div className="SearchForm">
            <input type="text" placeholder="Search by card name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
    );
}

export default SearchForm;
