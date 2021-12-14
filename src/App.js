import {BrowserRouter, Route} from "react-router-dom";

import './App.css';
import Main from "./components/Main";
import Footer from "./components/Main/Footer";
import React, {Component} from "react";

const cookieStorage = {
    getItem: (key) => {
        const cookies = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {} );
        return cookies[key];
    },
    setItem: (key, value) => {
        document.cookie = `${key}=${value}`;
    },
}

// remove Inspect -> application -> local storage -> oishii=true to show the notice again

const storageType = cookieStorage;
const consentPropertyName = 'oishii';

const shouldShowPopup = () => !storageType.getItem(consentPropertyName);
const saveToStorage = () => storageType.setItem(consentPropertyName, true);

window.onload = () => {
    const consentPopup = document.getElementById('consent-popup');
    const acceptBtn = document.getElementById('accept');

    const acceptFn = e => {
        saveToStorage(storageType);
        consentPopup.classList.add('hidden');
    };

    acceptBtn.addEventListener('click', acceptFn);

    if (shouldShowPopup()) {
        // eslint-disable-next-line no-restricted-globals
        // const consent = confirm('Agree to us?');
        // if (consent) {
        //     saveToStorage();
        // }
        setTimeout(() => {
            consentPopup.classList.remove('hidden');
        }, 1000);
    }
};

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

