import {BrowserRouter, Route} from "react-router-dom";

import './App.css';
import Main from "./components/Main";
import Footer from "./components/Main/Footer";
import React from "react";



function App() {
    return (
        <BrowserRouter>
            <Route path="/" >
                <Main/>
                <Footer/>
            </Route>

        </BrowserRouter>


    );
}

export default App;
