import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';

const Alert = ({error}) => {
    const history = useHistory();
    const ifMainPage = history.location.pathname.includes('competitions');

    return (
        <div className="alert alert-danger alert-dismissible" role="alert">
            {error}. Try later!
            {ifMainPage ? null : <NavLink to="/SoccerStatistics/competitions">&nbsp;Go to Main Page.</NavLink>}
        </div>
    );
};

export default Alert;
