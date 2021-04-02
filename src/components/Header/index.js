import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
        <NavLink className="navbar-brand" exact to="/SoccerStatistics/competitions">
            SoccerStatistics
        </NavLink>
    </nav>
);

export default Header;
