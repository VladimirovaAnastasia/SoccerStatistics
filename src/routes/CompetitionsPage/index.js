import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useHistory} from 'react-router-dom';

import ErrorWrapper from '../../layout/ErrorWrapper';
import Loader from '../../components/Loader';
import Search from '../../components/Search';
import FilteredCompetitions from './FilteredCompetitions';

import {
    europeCompetitions,
    getCompetitionsAsync,
    isCompetitionsLoading,
    competitionsError,
} from '../../store/competitions';

const Competitions = () => {
    const location = useLocation();
    const history = useHistory();
    let [search, setSearch] = useState(new URLSearchParams(location.search).get('search') || '');

    const dispatch = useDispatch();

    const competitions = useSelector(europeCompetitions);
    const isLoading = useSelector(isCompetitionsLoading);
    const error = useSelector(competitionsError);

    useEffect(() => {
        dispatch(getCompetitionsAsync());
    }, []);

    useEffect(() => {
        const query = [search && `search=${search}`].filter(Boolean);
        history.push('/SoccerStatistics/competitions' + (query && `?${query}`));
    }, [search]);

    return (
        <ErrorWrapper error={error}>
            <Search
                value={search}
                search={(value) => {
                    setSearch(value);
                }}
            />
            {isLoading ? (
                <Loader />
            ) : competitions.length ? (
                <table className="table table-hover">
                    <thead>
                        <tr className="d-flex">
                            <th className="col-1" scope="col">
                                #
                            </th>
                            <th className="col-1" scope="col">
                                {' '}
                            </th>
                            <th className="col-10" scope="col">
                                Competition
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <FilteredCompetitions competitions={competitions} search={search} />
                    </tbody>
                </table>
            ) : (
                <p>Not found...</p>
            )}
        </ErrorWrapper>
    );
};

export default Competitions;
