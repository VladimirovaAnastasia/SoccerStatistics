import React from 'react';

const CalendarHeader = () => {
    return (
        <thead>
            <tr className="d-flex">
                <th className="col-1" scope="col">
                    #
                </th>
                <th className="col-6" scope="col">
                    Clubs
                </th>
                <th className="col-3" scope="col">
                    Date
                </th>
                <th className="col-2" scope="col">
                    Result
                </th>
            </tr>
        </thead>
    );
};

export default CalendarHeader;
