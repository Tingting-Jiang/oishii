import React from "react";

import {Route} from "react-router-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import userReducer from "../reducers/userReducer";

import Home from "./HomeScreen";
import Profile from "./ProfileScreen";
import Search from './SearchScreen';
import SearchDetail from "./RecipeScreen";

import Login from './LoginAndRegister/LoginScreen';
import Register from './LoginAndRegister/RegisterScreen/';
import Create from './CreateScreen';
import EditProfile from "./ProfileScreen/EditProfile";
import VisitProfile from "./ProfileScreen/VisitProfile";
import PrivacyPolicy from "./TermsAndConditions/PrivacyPolicy";


import AllUsers from './SearchScreen/AllUsers'

import Menu from './Explore/Menu';
import Explore from './Explore'


const store = createStore(userReducer);

const Main = () => {

    return (
        <Provider store={store}>

            <Route path={["/", "/home", "/index"]} exact={true} component={Home} />

            <Route path={["/profile"]} exact={true}>
                <Profile />
            </Route>

            <Route path="/profile/:id" exact={true} component={VisitProfile}/>
            <Route path={["/edit-profile"]} exact={true} component={EditProfile}/>

            <Route path="/search" exact={true} component={Search} />
            <Route path="/search/:searchTerm" exact={true} component={Search} />
            <Route path="/details/:id" exact={true} component={SearchDetail} />

            <Route path="/login" exact={true} component={Login} />
            <Route path="/register" exact={true} component={Register} />

            <Route path="/create" exact={true} component={Create} />

    
            {/*<Route path="/menu/:id" exact={true} component={Menu} />*/}
    
            <Route path="/allUsers" exact={true} component={AllUsers} />
    
    
            

            <Route path="/explore" exact={true} component={Explore} />
            <Route path="/menu/:id" exact={true} component={Menu} />


            <Route path="/termsAndConditions" exact={true} component={PrivacyPolicy} />


        </Provider>
    )

}
export default Main;