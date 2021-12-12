import React, {useEffect, useState} from "react";
import "./home.css"

import Header from "../Header";
import Greeting from "./HomeGreeting";
import CategoryNav from "./CategoryNav";
import RecipeCards from "../RecipeCards";
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../service/userService";

const selectProfile = (profile) => profile;

const HomeScreen = () => {

    const dispatch = useDispatch();
    const profile = useSelector(selectProfile);
    useEffect(() => getProfile(dispatch), [dispatch]);

    return (
        <>
            <Helmet>
                <title>Home | Oishii</title>
            </Helmet>

            <div className="container mt-2">
                <Header active=""/>

                <Greeting profile={profile}/>

                <CategoryNav />

                <RecipeCards profile={profile} />
            </div>
        </>

    )
}

export default HomeScreen;