// import owner from "./data/profile.json";
//
const initialState = {
    user: {},
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "get-user":
            console.log("state: ", state);
            console.log("before", state.user);
            state = {
                ...state,
                user: action.user,
            };
            console.log("in reducer", action.user);
            return state;
        
        // return action.profile;
        
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
        default:
            return state;
    }
};

export default userReducer;
