import {createSlice} from '@reduxjs/toolkit';
import api from '../service/api';

export const slice = createSlice({
    name: 'teamCalendar',
    initialState: {
        isLoading: false,
        data: {},
        error: null,
    },
    reducers: {
        fetchTeamCalendar: (state) => ({
            ...state,
            isLoading: true,
            error: null,
        }),
        fetchTeamCalendarResolve: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        }),
        fetchTeamCalendarReject: (state, action) => ({
            ...state,
            isLoading: false,
            data: {},
            error: action.payload,
        }),
    },
});

export const {fetchTeamCalendar, fetchTeamCalendarResolve, fetchTeamCalendarReject} = slice.actions;

export const isTeamCalendarLoading = (state) => {
    return state.teamCalendar.isLoading;
};
export const teamCalendar = (state) => {
    return state.teamCalendar.data;
};
export const teamCalendarError = (state) => {
    return state.teamCalendar.error;
};

export const getTeamCalendarAsync = (name, teamId, query) => async (dispatch) => {
    try {
        dispatch(fetchTeamCalendar());

        const teamCalendarResponse = await api.getTeamMatches(name, query);
        const teamCalendar = teamCalendarResponse.data.matches.filter((item) => {
            return String(item.awayTeam.id) === teamId || String(item.homeTeam.id) === teamId;
        });

        dispatch(fetchTeamCalendarResolve(teamCalendar));
    } catch (error) {
        dispatch(fetchTeamCalendarReject(error.message));
    }
};

export default slice.reducer;
