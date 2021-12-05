import React from 'react';
const API_URL = 'http://localhost:4000/api';

export const login = (user) =>
    // console.log("in userService -->", user);
    fetch(`${API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    });


export const register = (user) =>
    // console.log("in userService -->", user);
    fetch(`${API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    });

export const getProfile = () =>
    fetch(`${API_URL}/profile`, {
        method: 'POST',
        credentials: 'include',
    })
        .then(res => res.json());


export const logout = () =>
    fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
    })
        .then(res => res.json());


export const likeRecipe = (recipeID) =>
    fetch(`${API_URL}/like/${recipeID}`, {
        method: "PUT",
    }).then((response) =>
        console.log("back from DB like recipe")
        );




export default {
    login,
    register,
    getProfile,
    logout,
    likeRecipe
};