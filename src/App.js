import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Header from './components/Header';
import Competitions from './routes/CompetitionsPage';
import Teams from './routes/TeamsPage';
import TeamCalendar from './routes/TeamPage';
import CompetitionCalendar from './routes/CompetitionPage';

import './App.css';

function App() {
    return (
        <>
            <Header />
            <div className="container pt-4">
                <Switch>
                    <Route exact path="/SoccerStatistics">
                        <Redirect to="/SoccerStatistics/competitions" />
                    </Route>
                    <Route exact path="/SoccerStatistics/competitions" component={Competitions} />
                    <Route
                        exact
                        path="/SoccerStatistics/competition/:name"
                        render={({match}) => {
                            return <Teams name={match.params.name} />;
                        }}
                    />
                    <Route
                        path="/SoccerStatistics/competition/:name/matches"
                        render={({match}) => {
                            return <CompetitionCalendar name={match.params.name} />;
                        }}
                    />
                    <Route
                        exact
                        path="/SoccerStatistics/competition/:name/:teamId"
                        render={({match}) => {
                            return <TeamCalendar teamInfo={match.params} />;
                        }}
                    />
                    <Route render={() => <h2>Page not found</h2>} />
                </Switch>
            </div>
        </>
    );
}

export default App;
