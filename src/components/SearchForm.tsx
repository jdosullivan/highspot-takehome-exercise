import React, { useEffect } from "react";

export interface ISearchFormProps {
    fetchItems: Function;
    clearSearchResults: Function;
}

function SearchForm(props: ISearchFormProps) {
    const [searchTerm, setSearchTerm] = React.useState<string | undefined>(undefined);

    const handleChange = (event: any) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        if (!searchTerm || searchTerm.trim() === "") {
            props.clearSearchResults();
        } else {
            props.fetchItems(searchTerm.toLowerCase().trim());
        }
    }, [searchTerm]);

    return (
        <div className="SearchForm">
            <input type="text" placeholder="Search by card name" value={searchTerm} onChange={handleChange} />
        </div>
    );
}

export default SearchForm;
