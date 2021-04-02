import React, {Fragment, useEffect, useState} from 'react';

import TeamCell from '../../../components/Table/TeamCell/TeamCell';

const FilteredTeams = ({teams, name, search}) => {
    let [filteredTeams, setFilteredTeams] = useState(teams);

    useEffect(() => {
        if (search) {
            setFilteredTeams(
                teams.filter((item) => {
                    return item.team.name.toLowerCase().includes(search);
                })
            );
        } else {
            setFilteredTeams(teams);
        }
    }, [search]);

    return (
        <Fragment>
            {filteredTeams.map((team) => (
                <TeamCell key={team.position} data={{...team}} competitionName={name} />
            ))}
        </Fragment>
    );
};

export default FilteredTeams;
