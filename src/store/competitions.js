import {createSlice} from '@reduxjs/toolkit';
import api from '../service/api';

export const slice = createSlice({
    name: 'competitions',
    initialState: {
        isLoading: false,
        data: [],
        error: null,
    },
    reducers: {
        fetchCompetitions: (state) => ({
            ...state,
            isLoading: true,
            error: null,
        }),
        fetchCompetitionsResolve: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        }),
        fetchCompetitionsReject: (state, action) => ({
            ...state,
            isLoading: false,
            data: {},
            error: action.payload,
        }),
        fetchAreasResolve: (state, action) => ({
            ...state,
            areas: action.payload,
            error: null,
        }),
        fetchAreasReject: (state, action) => ({
            ...state,
            areas: {},
            error: action.payload,
        }),
    },
});

export const {
    fetchCompetitions,
    fetchCompetitionsResolve,
    fetchCompetitionsReject,
    fetchAreasResolve,
    fetchAreasReject,
} = slice.actions;

export const isCompetitionsLoading = (state) => {
    return state.competitions.isLoading;
};
export const europeCompetitions = (state) => {
    return state.competitions.data;
};
export const competitionsError = (state) => {
    return state.competitions.error;
};

export const getAreasAsync = () => async (dispatch) => {
    try {
        const data = await api.getAreas();
        dispatch(fetchAreasResolve(data));
    } catch (error) {
        dispatch(fetchAreasReject(error));
    }
};

export const getCompetitionsAsync = () => async (dispatch) => {
    try {
        dispatch(fetchCompetitions());
        const areasResponse = await api.getAreas();
        const areas = areasResponse.data.areas.filter((item) => item.parentArea === 'Europe');

        const competitionsResponse = await api.getCompetitions();
        const competitions = competitionsResponse.data.competitions.filter((competition) => {
            const isEurope = areas.filter((area) => area.name === competition.area.name);
            return isEurope.length && competition.code && competition.plan === 'TIER_ONE';
        });

        dispatch(fetchCompetitionsResolve(competitions));
    } catch (error) {
        dispatch(fetchCompetitionsReject(error.message));
    }
};

export default slice.reducer;
