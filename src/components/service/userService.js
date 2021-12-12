const API_URL = 'http://localhost:4000/db';
const API_USER = 'http://localhost:4000/db/user';
const API_RECIPE = 'http://localhost:4000/db/recipe';

const API_ALL = 'http://localhost:4000/db/all';

export const login = (user) =>
    fetch(`${API_USER}/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })

export const register = (user) =>
    fetch(`${API_USER}/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    });

export const getProfile = () =>
    fetch(`${API_USER}/profile`, {
        method: 'POST',
        credentials: 'include',
    })
        .then(res => res.json());


export const logout = () =>
    fetch(`${API_USER}/logout`, {
        method: 'POST',
        credentials: 'include',
    })
        .then(res => res.json());



export const updateProfile = (user) =>
    fetch(`${API_USER}/editProfile`, {
        method: "PUT",
        body: JSON.stringify({user: user}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })

export const getFollowerInfo = (username) =>
    fetch(`${API_URL}/userInfo`, {
        method: "POST",
        body: JSON.stringify({username: username}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res=> res.json());










export const likeRecipe = (recipeID, username) =>
    fetch(`${API_RECIPE}/like`, {
        method: "PUT",
        body: JSON.stringify({recipeID: recipeID, username: username}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
        })
        .then(res => res.json());


export const unlikeRecipe = (recipeID, username) =>
    fetch(`${API_RECIPE}/unlike`, {
        method: "PUT",
        body: JSON.stringify({recipeID: recipeID, username: username}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json());

export const createRecipe = (recipe, username) =>
    fetch(`${API_RECIPE}/upload`, {
        method: "POST",
        body: JSON.stringify({recipe: recipe, username: username}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    });



export const getRecipe = (recipeID) =>
    fetch(`${API_RECIPE}/details`,{
        method: 'POST',
        body: JSON.stringify({recipeID: recipeID}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    }).then((response) => response.json());
    

export const searchRecipeByTitle = (title) =>
    fetch(`${API_RECIPE}/searchRecipe`,{
        method: 'POST',
        body: JSON.stringify({title: title}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json());

    
export const getRecipeFollowers = (recipeID) =>
    fetch(`${API_ALL}/getAllFollowers`, {
        method: 'POST',
        body: JSON.stringify({ recipeID: recipeID }),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json())
   





export const getAllLatestRecipes = () =>
    fetch(`${API_RECIPE}/getAll`, {
        method: 'POST',
        credentials: 'include',
    })
        .then(res => {
            console.log("");
            return res.json()
        });
    
    





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
    getAllLatestRecipes,
    getFollowerInfo
};