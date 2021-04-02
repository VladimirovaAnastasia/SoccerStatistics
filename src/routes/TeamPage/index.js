import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useHistory, NavLink} from 'react-router-dom';

import Loader from '../../components/Loader';
import FilteredTeam from './FilteredTeam';
import ErrorWrapper from '../../layout/ErrorWrapper';
import DateRangePicker from 'react-bootstrap-daterangepicker';

import {getTeamCalendarAsync} from '../../store/teamCalendar';
import {isTeamCalendarLoading, teamCalendar, teamCalendarError} from '../../store/teamCalendar';

import {format} from 'date-fns';

const Team = ({teamInfo}) => {
    const location = useLocation();
    const history = useHistory();
    const [range, setRange] = useState([
        new URLSearchParams(location.search).get('dateFrom') || new Date(2020, 12, 1),
        new URLSearchParams(location.search).get('dateTo') || new Date(),
    ]);

    const dispatch = useDispatch();
    let team = useSelector(teamCalendar);
    const isLoading = useSelector(isTeamCalendarLoading);
    const error = useSelector(teamCalendarError);

    useEffect(() => {
        dispatch(getTeamCalendarAsync(teamInfo.name, teamInfo.teamId));
    }, []);

    useEffect(() => {
        const [from, to] = range;
        const query = [from && `dateFrom=${format(from, 'Y-MM-dd')}`, to && `dateTo=${format(to, 'Y-MM-dd')}`]
            .filter(Boolean)
            .join('&');

        dispatch(getTeamCalendarAsync(teamInfo.name, teamInfo.teamId, query));

        history.push(`/SoccerStatistics/competition/${teamInfo.name}/${teamInfo.teamId}` + (query && `?${query}`));
    }, [range]);

    const handleCallback = (start, end) => {
        setRange([start.toDate(), end.toDate()]);
    };

    return (
        <ErrorWrapper error={error}>
            <nav className="navbar navbar-expand-lg p-0">
                <ul className="navbar-nav">
                    <li className="nav-item p-0">
                        <NavLink exact to="/SoccerStatistics/competitions" className="nav-link p-0">
                            Main page&nbsp;/&nbsp;
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/SoccerStatistics/competition/${teamInfo.name}`} className="nav-link p-0">
                            Competition teams&nbsp;/&nbsp;
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <p className="mb-0 mt-1">
                <strong>Choose date range:</strong>
            </p>
            <DateRangePicker
                initialSettings={{startDate: format(range[0], 'MM/dd/Y'), endDate: format(range[1], 'MM/dd/Y')}}
                onCallback={handleCallback}
            >
                <input type="text" className="form-control col-4 mb-4" />
            </DateRangePicker>

            {isLoading || !team.length ? (
                <Loader />
            ) : (
                <table className="table table-hover">
                    <thead>
                        <tr className="d-flex">
                            <th className="col-1" scope="col">
                                #
                            </th>
                            <th className="col-6" scope="col">
                                Clubs
                            </th>
                            <th className="col-4" scope="col">
                                Date
                            </th>
                            <th className="col-1" scope="col">
                                Result
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <FilteredTeam team={team} startDate={range[0]} endDate={range[1]} />
                    </tbody>
                </table>
            )}
        </ErrorWrapper>
    );
};

export default Team;
