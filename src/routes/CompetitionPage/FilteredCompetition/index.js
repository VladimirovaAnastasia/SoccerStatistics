import React, {Fragment, useEffect, useState} from 'react';

import CalendarCell from '../../../components/Table/CalendarCell';

import {areIntervalsOverlapping} from 'date-fns';

const FilteredCompetition = ({competition, startDate, endDate}) => {
    let [filteredCompetition, setFilteredCompetition] = useState(competition);

    useEffect(() => {
        setFilteredCompetition(
            competition.filter((item) => {
                return areIntervalsOverlapping(
                    {start: startDate, end: endDate},
                    {start: new Date(item.utcDate), end: new Date(item.utcDate)}
                );
            })
        );
    }, [startDate, endDate]);

    return (
        <Fragment>
            {filteredCompetition.map((match, index) => (
                <CalendarCell key={match.id} data={{...match, index: index}} />
            ))}
        </Fragment>
    );
};

export default FilteredCompetition;
