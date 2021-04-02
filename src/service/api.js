/* eslint react/prop-types: 0 */
import React from 'react';
import axios from 'axios';

const baseURL = 'http://api.football-data.org/v2/';
const API_KEY = process.env.REACT_APP_API_KEY;
const config = {
    headers: {'X-Auth-Token': API_KEY},
};

const fetchInfo = async (url) => {
    return axios.get(baseURL + url, config);
};

export default {
    getAreas: () => fetchInfo('areas'),
    getCompetitions: () => fetchInfo('competitions'),
    getCompetitionTeams: (name, year) => fetchInfo(`competitions/${name}/standings?season=${year}`),
    getCompetitionMatches: (name, query) => fetchInfo(`competitions/${name}/matches?${query}`),
    getTeamMatches: (competitionName, query) => fetchInfo(`competitions/${competitionName}/matches?${query}`),
};
