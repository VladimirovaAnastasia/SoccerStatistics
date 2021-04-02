import React from 'react';
import {withRouter} from 'react-router-dom';

const CompetitionCell = ({data, history}) => {
    const getItem = () => {
        history.push(`/SoccerStatistics/competition/${data.code}`);
    };

    return (
        <tr className="d-flex" onClick={getItem}>
            <th className="col-1">{data.index + 1}</th>
            <td className="col-1">
                {data.area.ensignUrl && <img style={{width: 36}} src={`${data.area.ensignUrl}`} alt={'flag'} />}
            </td>
            <td className="col-10">{data.name}</td>
        </tr>
    );
};

export default withRouter(CompetitionCell);
