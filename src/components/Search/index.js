import React, {useState} from 'react';

import Button from 'react-bootstrap/Button';

const Search = ({search, value}) => {
    const [searchValue, setSearchValue] = useState(value);

    const handleClickButton = () => {
        search(searchValue.trim());
    };

    return (
        <div className="d-flex mb-4">
            <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
            />
            <Button className="ml-4" onClick={handleClickButton}>
                Search
            </Button>
        </div>
    );
};

export default Search;
