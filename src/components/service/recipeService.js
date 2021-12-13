import React from 'react';
const URL = 'http://localhost:4000/api';

export const fetchSearchResult = (key_words) =>
    // key_words = key_words.replace(/\s+/g, '%20');
    fetch(`${URL}/search/${key_words.replace(/\s+/g, "%20")}`)
        .then((response) => response.json());

export const fetchByID= (id) =>
    fetch(`${URL}/details/${id}`)
        .then((response) => response.json());

export const fetchMainInfoByID= (id) =>
    fetch(`${URL}/main/${id}`)
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

export const getRandomRecipe = () =>
    fetch(`${URL}/random`)
        .then((response) => response.json());




export default {
    fetchSearchResult,
    fetchByID,
    fetchByIngredients,
    fetchSimilar,
    fetchTrending,
    fetchInstruction,
    getRandomRecipe,
    fetchMainInfoByID
};