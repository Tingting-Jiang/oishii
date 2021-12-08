
const initialState = {
    user: {},
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "get-user":
            console.log("state: ", state);
            state = action.newUser;
            console.log("in reducer", state);
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
       
        default:
            console.log("in default ", state);
            return state;
    }
};

export default userReducer;
