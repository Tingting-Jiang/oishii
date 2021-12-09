import React from "react";
import "./home.css"

import Header from "../Header";
import Greeting from "../HomeScreen/HomeGreeting";
import CategoryNav from "./CategoryNav";
import RecipeCards from "../RecipeCards";

const HomeScreen = () => {
    return (
        <div className="container mt-2">
            <Header active=""/>

            <Greeting />

            <CategoryNav />

            <RecipeCards />
        </div>
    )
}

export default HomeScreen;