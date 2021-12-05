import React from "react";
import "./home.css"

import Header from "../Header";

const HomeScreen = () => {
    return (
        <div className="container mt-2">
            <Header active="home"/>



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