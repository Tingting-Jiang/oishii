import React from 'react';

const URL1 = 'http://localhost:4000/chicken%20soup';
const URL2 = 'http://localhost:4000/details/5580';

export const fetchSearchResult = () =>
    fetch(URL1).then((response) => response.json());

export const fetchByID = () =>
    fetch(URL2).then((response) => response.json());


export default {fetchSearchResult, fetchByID};