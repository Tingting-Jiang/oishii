import React from 'react';
const API_URL = 'http://localhost:4000';

export const login = (user) =>
    fetch(`${API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    });




export default {
    login,
};