import {createSlice} from '@reduxjs/toolkit';
import api from '../service/api';

export const slice = createSlice({
    name: 'teams',
    initialState: {
        isLoading: false,
        data: {},
        error: null,
    },
    reducers: {
        fetchTeams: (state) => ({
            ...state,
            isLoading: true,
            error: null,
        }),
        fetchTeamsResolve: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        }),
        fetchTeamsReject: (state, action) => ({
            ...state,
            isLoading: false,
            data: {},
            error: action.payload,
        }),
    },
});

export const {fetchTeams, fetchTeamsResolve, fetchTeamsReject} = slice.actions;

export const isTeamsLoading = (state) => {
    return state.teams.isLoading;
};
export const competitionTeams = (state) => {
    return state.teams.data;
};
export const teamsError = (state) => {
    return state.teams.error;
};

export const getTeamsAsync = (name, year) => async (dispatch) => {
    try {
        dispatch(fetchTeams());

        const TeamsResponse = await api.getCompetitionTeams(name, year);
        const teams = TeamsResponse.data.standings.find((item) => item.type === 'TOTAL').table;

        dispatch(fetchTeamsResolve(teams));
    } catch (error) {
        dispatch(fetchTeamsReject(error.message));
    }
};

export default slice.reducer;
