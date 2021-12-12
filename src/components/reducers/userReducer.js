const initialUser = {
    username: "",
    email: "",
    favRecipeList: [],
    usersRecipe: [],
    usersFollowers: [],
    userAvatar: "/images/sample-user.jpeg",
    location: "",
    dateOfBirth: "",
    bio: "",
    role: "normal",
}

const userReducer = (state = initialUser, action) => {
    console.log("action: ")
    console.log(action)

    switch (action.type) {
        // after login
        case "set-user":
            state = action.newUser;
            console.log("after setting user", state);
            return state;

        case "get-user":
            console.log("state: ", state);
            state = action.newUser;
            return state;

        case "logout-user":
            state = {
                username: "",
                email: "",
                favRecipeList: [],
                usersRecipe: [],
                usersFollowers: [],
                userAvatar: "/images/sample-user.jpeg",
                location: "",
                dateOfBirth: "",
                bio: "",
                role: "normal"
            }
            return state;
        

        case "update-profile":
            const updatedProfile = {
                ...state.profile,
                userName: action.newProfile.userName,
                bio: action.newProfile.bio,
                location: action.newProfile.location,
                website: action.newProfile.website,
                dateOfBirth: action.newProfile.dateOfBirth,
            };
            
            state = {
                ...state,
                profile: updatedProfile,
            };
            
            return state;

        case "like-recipe":
            state = {
                ...state,
                favRecipeList: [
                    action.recipeId,
                    ...state.favRecipeList
                ]
            };
            return state;

        case "unlike-recipe":
            state = {
                ...state,
                favRecipeList: state.favRecipeList.filter(
                    recipeID => recipeID !== action.recipeId
                )
            }
            return state;

        case "get-user-fav":
            state = {
                ...state,
                favRecipeList: action.list
            };
            console.log("state: ", state.favRecipeList);
            return state;


        default:
            console.log("in default ", state);
            return state;
    }
};

export default userReducer;

