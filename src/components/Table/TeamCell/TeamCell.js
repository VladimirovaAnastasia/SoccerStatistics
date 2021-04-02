import React from 'react';
import {withRouter} from 'react-router-dom';

const TeamCell = ({data, competitionName, history}) => {
    const getTeam = () => {
        history.push(`/SoccerStatistics/competition/${competitionName}/${data.team.id}`);
    };

    return (
        <tr className="d-flex" onClick={getTeam}>
            <th className="col-1">{data.position}</th>
            <td className="col-1">
                {data.team.crestUrl && <img style={{height: 20}} src={`${data.team.crestUrl}`} alt={'flag'} />}
            </td>
            <td className="col-4">{data.team.name}</td>
            <td className="col-2">{data.playedGames}</td>
            <td className="col-2">{data.won}</td>
            <td className="col-2">{data.points}</td>
        </tr>
    );
};

export default withRouter(TeamCell);
