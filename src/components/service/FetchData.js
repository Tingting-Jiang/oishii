import React from 'react';

const URL = 'http://localhost:4000/123';

export const fetchData= () =>
    fetch(URL).then((response) => response.json());


export default {fetchData};