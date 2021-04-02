import React from 'react';
import {parseISO, format} from 'date-fns';

const CalendarCell = ({data}) => {
    const date = format(parseISO(data.utcDate), 'EEEE d LLLL y');

    return (
        <tr className="d-flex">
            <th className="col-1">{data.index + 1}</th>
            <td className="col-6">
                {data.awayTeam.name} - {data.homeTeam.name}
            </td>
            <td className="col-4">{date}</td>
            {data.score.fullTime.awayTeam != null ? (
                <td className="col-1">
                    {data.score.fullTime.awayTeam} : {data.score.fullTime.homeTeam}
                </td>
            ) : (
                <td className="col-1"> - : - </td>
            )}
        </tr>
    );
};

export default CalendarCell;
