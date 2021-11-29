import React from 'react';

const URL1 = 'http://localhost:4000/apple';
const URL2 = 'http://localhost:4000/details/5580';
const URL3 = 'http://localhost:4000/list/4/under_30_minutes/apple';

export const fetchSearchResult = () =>
    fetch(URL1).then((response) => response.json());

export const fetchByID = () =>
    fetch(URL2).then((response) => response.json());

export const fetchList = () =>
    fetch(URL3).then((response) => response.json());


export default {fetchSearchResult, fetchByID, fetchList};