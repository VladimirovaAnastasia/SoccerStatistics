import {createSlice} from '@reduxjs/toolkit';
import api from '../service/api';

export const slice = createSlice({
    name: 'competitionCalendar',
    initialState: {
        isLoading: false,
        data: {},
        error: null,
    },
    reducers: {
        fetchCompetitionCalendar: (state) => ({
            ...state,
            isLoading: true,
            error: null,
        }),
        fetchCompetitionCalendarResolve: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        }),
        fetchCompetitionCalendarReject: (state, action) => ({
            ...state,
            isLoading: false,
            data: {},
            error: action.payload,
        }),
    },
});

export const {
    fetchCompetitionCalendar,
    fetchCompetitionCalendarResolve,
    fetchCompetitionCalendarReject,
} = slice.actions;

export const isCompetitionCalendarLoading = (state) => {
    return state.competitionCalendar.isLoading;
};
export const competitionCalendar = (state) => {
    return state.competitionCalendar.data;
};
export const competitionCalendarError = (state) => {
    return state.competitionCalendar.error;
};

export const getCompetitionCalendarAsync = (name, query = null) => async (dispatch) => {
    try {
        dispatch(fetchCompetitionCalendar());

        const CompetitionCalendarResponse = await api.getCompetitionMatches(name, query);
        const competitionCalendar = CompetitionCalendarResponse.data.matches;

        dispatch(fetchCompetitionCalendarResolve(competitionCalendar));
    } catch (error) {
        dispatch(fetchCompetitionCalendarReject(error.message));
    }
};

export default slice.reducer;
