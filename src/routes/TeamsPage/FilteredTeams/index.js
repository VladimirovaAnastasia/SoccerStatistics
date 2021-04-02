import React, {Fragment, useEffect, useState} from 'react';

import TeamCell from '../../../components/Table/TeamCell/TeamCell';

const FilteredTeams = ({teams, name, search, year}) => {
    let [filteredTeams, setFilteredTeams] = useState(teams);

    useEffect(() => {
        if (search) {
            setFilteredTeams(
                teams.filter((item) => {
                    return item.team.name.toLowerCase().includes(search);
                })
            );
        }
    }, [search, year]);

    return (
        <Fragment>
            {filteredTeams.map((team) => (
                <TeamCell key={team.position} data={{...team}} competitionName={name} />
            ))}
        </Fragment>
    );
};

export default FilteredTeams;
