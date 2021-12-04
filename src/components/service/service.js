import React from 'react';
const URL = 'http://localhost:4000';
const URL1 = 'http://localhost:4000/apple';
const URL2 = 'http://localhost:4000/details/5580';
const URL3 = 'http://localhost:4000/list/4/under_30_minutes/apple';
const URL4 = 'http://localhost:4000/trending/1';
const URL5 = 'http://localhost:4000/tag/list';

export const fetchSearchResult = (key_words) =>
    // key_words = key_words.replace(/\s+/g, '%20');
    fetch(`${URL}/search/${key_words.replace(/\s+/g, "%20")}`)
        .then((response) => response.json());

export const fetchByID = (id) =>
    fetch(`${URL}/details/${id}`)
        .then((response) => response.json());

export const fetchInstruction = (id) =>
    fetch(`${URL}/instruction/${id}`)
        .then((response) => response.json());

export const fetchByIngredients = (ingredient) =>
    fetch(`${URL}/ingredients/${ingredient.replace(/\s+/g, "%20")}`)
        .then((response) => response.json());

export const fetchSimilar = (id) =>
    fetch(`${URL}/similar/${id}`)
        .then((response) => response.json());

export const fetchTrending = () =>
    fetch(`${URL}/trending`)
        .then((response) => response.json());




export default {
    fetchSearchResult,
    fetchByID,
    fetchByIngredients,
    fetchSimilar,
    fetchTrending,
    fetchInstruction
};