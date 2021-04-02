import {configureStore} from '@reduxjs/toolkit';
import competitionsReducer from './competitions';
import teamsReducer from './teams';
import teamCalendarReducer from './teamCalendar';
import competitionCalendarReducer from './competitionCalendar';

export default configureStore({
    reducer: {
        competitions: competitionsReducer,
        teams: teamsReducer,
        teamCalendar: teamCalendarReducer,
        competitionCalendar: competitionCalendarReducer,
    },
});
