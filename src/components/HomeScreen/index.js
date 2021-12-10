import React from "react";
import "./home.css"

import Header from "../Header";
import Greeting from "../HomeScreen/HomeGreeting";
import CategoryNav from "./CategoryNav";
import RecipeCards from "../RecipeCards";
import {Helmet} from "react-helmet";

const HomeScreen = () => {
    return (
        <>
            <Helmet>
                <title>Home | Oishii</title>
            </Helmet>
            <div className="container mt-2">
                <Header active=""/>

                <Greeting />

                <CategoryNav />

                <RecipeCards />
            </div>
        </>

    )
}

export default HomeScreen;