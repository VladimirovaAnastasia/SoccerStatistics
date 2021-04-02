import React, {Fragment, useEffect, useState} from 'react';

import CalendarCell from '../../../components/Table/CalendarCell';

import {areIntervalsOverlapping} from 'date-fns';

const FilteredTeam = ({team, startDate, endDate}) => {
    let [filteredTeam, setFilteredTeam] = useState(team);

    useEffect(() => {
        setFilteredTeam(
            team.filter((item) => {
                return areIntervalsOverlapping(
                    {start: startDate, end: endDate},
                    {start: new Date(item.utcDate), end: new Date(item.utcDate)}
                );
            })
        );
    }, [startDate, endDate]);

    return (
        <Fragment>
            {filteredTeam.map((match, index) => (
                <CalendarCell key={match.id} data={{...match, index: index}} />
            ))}
        </Fragment>
    );
};

export default FilteredTeam;
