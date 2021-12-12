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

export const getProfile = (dispatch) =>
    fetch(`${API_USER}/profile`, {
        method: 'POST',
        credentials: 'include',
    })
        .then(res => res.json())
        .then(newUser => {
            dispatch({
                type: 'get-user',
                newUser
            })
            return(newUser);
        })
        .catch(e => console.log(e));

export const logout = (dispatch) =>
    fetch(`${API_USER}/logout`, {
        method: 'POST',
        credentials: 'include',
    })
        .then(res => {
            dispatch({
                type: 'logout-user',
            })
        })



export const updateProfile = (user) =>
    fetch(`${API_USER}/editProfile`, {
        method: "PUT",
        body: JSON.stringify({user: user}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })

export const getFollowerInfo = (userID) =>
    fetch(`${API_URL}/userInfo`, {
        method: "POST",
        body: JSON.stringify({userID: userID}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res=> res.json());






export const getFavList = (dispatch) =>
    fetch(`${API_USER}/profile`, {
        method: 'POST',
        credentials: 'include',
    })
        .then(res => res.json())
        .then(newUser => {
            const list = newUser.favRecipeList;
            dispatch({
                type: 'get-user-fav',
                list
            })
            return(list);
        })


export const unlikeRecipe = (recipeId, userID, dispatch) =>
    fetch(`${API_RECIPE}/unlike`, {
        method: "PUT",
        body: JSON.stringify({recipeID: recipeId, userID: userID}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })
        // .then(res => res.json())
        .then(res => {
            dispatch ({
                type: 'unlike-recipe',
                recipeId
            })
            return (recipeId);
        })


export const likeRecipe = (recipeId, userID, dispatch) =>
    fetch(`${API_RECIPE}/like`, {
        method: "PUT",
        body: JSON.stringify({recipeID: recipeId, userID: userID}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
        })
        // .then(res => res.json())
        .then(res => {
            dispatch ({
                type: 'like-recipe',
                recipeId
            })
            return (recipeId);
        })


export const createRecipe = (recipe, userID) =>
    fetch(`${API_RECIPE}/upload`, {
        method: "POST",
        body: JSON.stringify({recipe: recipe, userID: userID}),
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