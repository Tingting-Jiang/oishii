import React from "react";
import "./home.css"

import Header from "../Header";
import Greeting from "../HomeScreen/HomeGreeting";
import CategoryNav from "./CategoryNav";
import RecipeCards from "../RecipeCards";

const HomeScreen = () => {
    return (
        <div className="container mt-2">
            <Header active="home"/>

            <Greeting />

            <CategoryNav />

            <RecipeCards type="userFavorites"/>

            <RecipeCards type="latest"/>

            <RecipeCards type="trending"/>

            <div className="wd-footer">
                <div>
                    <h3>Oishii</h3>
                    <p>Presented by Project Oishii Group</p>
                    <span>Privacy Policy</span> | <span>Send Feedback</span>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen;