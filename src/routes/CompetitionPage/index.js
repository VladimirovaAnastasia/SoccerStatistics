import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, NavLink} from 'react-router-dom';

import Loader from '../../components/Loader';
import FilteredCompetition from './FilteredCompetition';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import ErrorWrapper from '../../layout/ErrorWrapper';

import {
    isCompetitionCalendarLoading,
    competitionCalendar,
    competitionCalendarError,
    getCompetitionCalendarAsync,
} from '../../store/competitionCalendar';

import {format} from 'date-fns';

const Team = ({name}) => {
    const history = useHistory();
    const [range, setRange] = useState([
        new URLSearchParams(location.search).get('dateFrom') || new Date(2020, 12, 1),
        new URLSearchParams(location.search).get('dateTo') || new Date(),
    ]);

    const dispatch = useDispatch();
    let competition = useSelector(competitionCalendar);
    const isLoading = useSelector(isCompetitionCalendarLoading);
    const error = useSelector(competitionCalendarError);

    useEffect(async () => {
        dispatch(getCompetitionCalendarAsync(name));
    }, []);

    useEffect(() => {
        const [from, to] = range;
        const query = [from && `dateFrom=${format(from, 'Y-MM-dd')}`, to && `dateTo=${format(to, 'Y-MM-dd')}`]
            .filter(Boolean)
            .join('&');

        dispatch(getCompetitionCalendarAsync(name, query));

        history.push(`/SoccerStatistics/competition/${name}/matches` + (query && `?${query}`));
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
                        <NavLink to={`/SoccerStatistics/competition/${name}`} className="nav-link p-0">
                            Competition teams&nbsp;/&nbsp;
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <p className="mb-0 mt-2">
                <strong>Choose date range:</strong>
            </p>
            <DateRangePicker
                initialSettings={{startDate: format(range[0], 'MM/dd/Y'), endDate: format(range[1], 'MM/dd/Y')}}
                onCallback={handleCallback}
            >
                <input type="text" className="form-control col-4 mb-4" />
            </DateRangePicker>

            {isLoading || !competition.length ? (
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
                        <FilteredCompetition competition={competition} startDate={range[0]} endDate={range[1]} />
                    </tbody>
                </table>
            )}
        </ErrorWrapper>
    );
};

export default Team;
