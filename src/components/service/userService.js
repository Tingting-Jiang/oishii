const API_URL = 'http://localhost:4000/db';
const API_USER = 'http://localhost:4000/db/user';
const API_RECIPE = 'http://localhost:4000/db/recipe';

const API_ALL = 'http://localhost:4000/db/all';
const API_MENU = 'http://localhost:4000/db/menu';


export const login = (user) =>
    fetch(`${API_USER}/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {
        if (res.ok)
            return res.json();
        else throw res;
    });

export const register = (user) =>
    fetch(`${API_USER}/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => {
            if (res.ok)
                return res.json();
            else throw res;
        });


export const getProfile = (dispatch) =>
    fetch(`${API_USER}/profile`, {
        method: 'POST',
        credentials: 'include',
    })
        .then(res =>{
            if (res.ok)
                return res.json();
            else throw res;
        })
        .then(newUser => {
            console.log("dispatch get user in getProfile service")
            console.log(newUser)
            dispatch({
                type: 'get-user',
                newUser
            })
            return(newUser);
        })
        .catch(e => console.log("No session record",e ));

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


export const updateProfile = (dispatch, newProfile) =>
    fetch(`${API_USER}/editProfile`, {
        method: "PUT",
        body: JSON.stringify({user: newProfile}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {
        dispatch({
            type: 'update-profile',
            newProfile
        })
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
        .then(res => res.json());


export const getUserById = (userId) =>
    fetch(`${API_USER}/findUser`, {
        method: "POST",
        body: JSON.stringify({userId: userId}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json());



export const getAllUsers = () =>
    fetch(`${API_USER}/allUsers`, {
        method: 'POST',
        credentials: 'include',
    })
        .then(res => res.json());
    




export const deleteUser = (userId) =>
    fetch(`${API_USER}/delete`, {
        method: 'DELETE',
        body: JSON.stringify({ userId: userId }),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json());


export const changeRole = (userId, currentRole) =>
    fetch(`${API_USER}/changeRole`, {
        method: 'PUT',
        body: JSON.stringify({ userId: userId, currentRole: currentRole }),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })
    











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


export const likeUser = (userId, otherUserId) =>
    fetch(`${API_USER}/likeUser`, {
            method: "PUT",
        body: JSON.stringify({userId: userId, otherUserId: otherUserId}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json())


export const unLikeUser = (userId, otherUserId) =>
    fetch(`${API_USER}/unLikeUser`, {
        method: "PUT",
        body: JSON.stringify({userId: userId, otherUserId: otherUserId}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json())




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
        .then(res => {
            if (res.ok)
                return res.json();
            else throw res;
        });
   





export const getAllLatestRecipes = () =>
    fetch(`${API_RECIPE}/getAll`, {
        method: 'POST',
        credentials: 'include',
    })
        .then(res => {
            console.log("");
            return res.json()
        });




export const getMenuDetails = (menuId) =>
    fetch(`${API_MENU}/getMenuDetail`, {
        method: 'POST',
        body: JSON.stringify({ menuId: menuId }),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => {
            if (res.ok)
                return res.json();
            else throw res;
        });


export const addToMenu = (menuId, recipeId) =>
   
    fetch(`${API_MENU}/addToMenu`, {
        method: 'POST',
        body: JSON.stringify({ menuId: menuId, recipeId: recipeId }),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => {
            console.log(`${API_MENU}/addToMenu`);
            if (res.ok)
                return res.json();
            else throw res;
        });




export const deleteRecipeFromMenu = (menuId, recipeId) =>
    fetch(`${API_MENU}/deleteRecipeFromMenu`, {
        method: 'DELETE',
        body: JSON.stringify({
            menuId: menuId,
            recipeId: recipeId
        }),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })

export const deleteRecipe = (recipeId, sourceName) =>
    fetch(`${API_RECIPE}/deleteRecipe`, {
        method: 'DELETE',
        body: JSON.stringify({ recipeId: recipeId, sourceName: sourceName }),
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
    likeUser,
    unLikeUser,
    getAllUsers,
    deleteUser,
    changeRole,
    unlikeRecipe,
    createRecipe,
    getRecipe,
    searchRecipeByTitle,
    getRecipeFollowers,
    updateProfile,
    getAllLatestRecipes,
    getFollowerInfo,
    getMenuDetails,
    deleteRecipeFromMenu,
    addToMenu,
    deleteRecipe
};