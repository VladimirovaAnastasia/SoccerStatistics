import React, {Fragment, useEffect, useState} from 'react';

import CompetitionCell from '../../../components/Table/CompetitionCell';

const FilteredCompetitions = ({competitions, search}) => {
    let [filteredCompetitions, setFilteredCompetitions] = useState(competitions);

    useEffect(() => {
        if (search) {
            setFilteredCompetitions(
                competitions.filter((item) => {
                    return item.name.toLowerCase().includes(search);
                })
            );
        }
    }, [search]);

    return (
        <Fragment>
            {filteredCompetitions.map((match, index) => (
                <CompetitionCell key={match.id} data={{...match, index: index}} />
            ))}
        </Fragment>
    );
};

export default FilteredCompetitions;
