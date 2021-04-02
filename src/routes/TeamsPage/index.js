import React, {useEffect, useState} from 'react';
import {NavLink, useLocation, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import Search from '../../components/Search';
import Loader from '../../components/Loader';
import CalendarDropdown from '../../components/Dropdown';
import Button from 'react-bootstrap/Button';
import FilteredTeams from './FilteredTeams';
import ErrorWrapper from '../../layout/ErrorWrapper';

import {competitionTeams, getTeamsAsync, isTeamsLoading, teamsError} from '../../store/teams';

const Teams = ({name}) => {
    const location = useLocation();
    const history = useHistory();

    let [search, setSearch] = useState(new URLSearchParams(location.search).get('search') || '');
    let [year, setYear] = useState(new URLSearchParams(location.search).get('year') || '2020');

    const dispatch = useDispatch();
    const teams = useSelector(competitionTeams);
    const isLoading = useSelector(isTeamsLoading);
    const error = useSelector(teamsError);

    useEffect(() => {
        dispatch(getTeamsAsync(name, year));
    }, []);

    useEffect(() => {
        dispatch(getTeamsAsync(name, year));
    }, [year]);

    useEffect(() => {
        const query = [search && `search=${search}`, year && `year=${year}`].filter(Boolean).join('&');
        history.push(`/SoccerStatistics/competition/${name}` + (query && `?${query}`));
    }, [search, year]);

    return (
        <ErrorWrapper error={error}>
            <nav className="navbar navbar-expand-lg p-0">
                <ul className="navbar-nav">
                    <li className="nav-item p-0">
                        <NavLink exact to="/SoccerStatistics/competitions" className="nav-link p-0">
                            Main page <span>/</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="d-flex flex-row justify-content-between mb-3">
                <h2> Competition: {name}</h2>
                <NavLink to={`/SoccerStatistics/competition/${name}/matches`}>
                    <Button variant="outline-primary">Competition calendar</Button>
                </NavLink>
            </div>

            <CalendarDropdown
                value={year}
                setValue={(value) => {
                    setYear(value);
                }}
            />

            <Search
                value={search}
                search={(value) => {
                    setSearch(value);
                }}
            />
            {isLoading || !teams.length ? (
                <Loader />
            ) : (
                <table className="table table-hover">
                    <thead>
                        <tr className="d-flex">
                            <th className="col-1" scope="col">
                                Position
                            </th>
                            <th className="col-1" scope="col">
                                {' '}
                            </th>
                            <th className="col-4" scope="col">
                                Club
                            </th>
                            <th className="col-2" scope="col">
                                Played
                            </th>
                            <th className="col-2" scope="col">
                                Won
                            </th>
                            <th className="col-2" scope="col">
                                Points
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <FilteredTeams teams={teams} name={name} search={search} year={year} />
                    </tbody>
                </table>
            )}
        </ErrorWrapper>
    );
};

export default Teams;
