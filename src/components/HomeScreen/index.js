import React from "react";
import "./home.css"

import Header from "../Header";
import Greeting from "../HomeScreen/HomeGreeting";
import CategoryNav from "./CategoryNav";
import RecipeCards from "../RecipeCards";
import Footer from "../Footer";

const HomeScreen = () => {
    return (
        <div className="container mt-2">
            <Header active="home"/>

            <Greeting />

            <CategoryNav />

            <RecipeCards />

            <Footer />
        </div>
    )
}

export default HomeScreen;