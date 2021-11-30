import React from 'react';
const URL = 'http://localhost:4000';
const URL1 = 'http://localhost:4000/apple';
const URL2 = 'http://localhost:4000/details/5580';
const URL3 = 'http://localhost:4000/list/4/under_30_minutes/apple';
const URL4 = 'http://localhost:4000/trending/1';
const URL5 = 'http://localhost:4000/tag/list';

export const fetchSearchResult = (key_words) =>
    // key_words = key_words.replace(/\s+/g, '%20');
    fetch(`${URL}/${key_words.replace(/\\s+/g, '%20')}`)
        .then((response) => response.json());

export const fetchByID = () =>
    fetch(URL2).then((response) => response.json());

export const fetchByTagAndIngredients = (ingredient) =>
    fetch(`${URL}/list/10/${ingredient.replace(/\\s+/g, '%20')}`)
        .then((response) => response.json());

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