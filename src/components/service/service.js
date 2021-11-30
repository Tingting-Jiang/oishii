import React from 'react';

const URL1 = 'http://localhost:4000/apple';
const URL2 = 'http://localhost:4000/details/5580';
const URL3 = 'http://localhost:4000/list/4/under_30_minutes/apple';
const URL4 = 'http://localhost:4000/trending/1';
const URL5 = 'http://localhost:4000/tag/list';

export const fetchSearchResult = () =>
    fetch(URL1).then((response) => response.json());

export const fetchByID = () =>
    fetch(URL2).then((response) => response.json());

export const fetchByTagAndIngredients = () =>
    fetch(URL3).then((response) => response.json());

export const fetchTrendingList = () =>
    fetch(URL4).then((response) => response.json());

export const fetchTagList = () =>
    fetch(URL5).then((response) => response.json());




export default {
    fetchSearchResult,
    fetchByID,
    fetchByTagAndIngredients,
    fetchTrendingList,
    fetchTagList
};