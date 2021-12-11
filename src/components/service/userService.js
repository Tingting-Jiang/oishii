const API_URL = 'http://localhost:4000/db';

export const login = (user) =>
    fetch(`${API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })

export const register = (user) =>
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


export const likeRecipe = (recipeID, username) =>
    fetch(`${API_URL}/like`, {
        method: "PUT",
        body: JSON.stringify({recipeID: recipeID, username: username}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
        })
        .then(res => res.json());


export const unlikeRecipe = (recipeID, username) =>
    fetch(`${API_URL}/unlike`, {
        method: "PUT",
        body: JSON.stringify({recipeID: recipeID, username: username}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json());

export const createRecipe = (formData) =>
    fetch(`${API_URL}/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
    });

export const updateAvatar = (avatar) =>
    fetch(`${API_URL}/updateAvatar`, {
        method: 'POST',
        credentials: 'include',
        body: avatar,
    });



export const getRecipe = (recipeID) =>
    fetch(`${API_URL}/details`,{
        method: 'POST',
        body: JSON.stringify({recipeID: recipeID}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json());

export const searchRecipeByTitle = (title) =>
    fetch(`${API_URL}/searchRecipe`,{
        method: 'POST',
        body: JSON.stringify({title: title}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json());

    
export const getRecipeFollowers = (recipeID) =>
    fetch(`${API_URL}/recipeFollowers`, {
    
        method: 'POST',
        body: JSON.stringify({ recipeID: recipeID }),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })

export const updateProfile = (user) =>
    fetch(`${API_URL}/editProfile`, {
        method: "PUT",
        body: JSON.stringify({user: user}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })
    
    
    





export default {
    login,
    register,
    getProfile,
    logout,
    likeRecipe,
    unlikeRecipe,
    createRecipe,
    getRecipe,
    searchRecipeByTitle,
    getRecipeFollowers,
    updateProfile,
    updateAvatar
};