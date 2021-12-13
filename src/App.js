import {BrowserRouter, Route} from "react-router-dom";

import './App.css';
import Main from "./components/Main";
import Footer from "./components/Main/Footer";
import React from "react";

// const reducer = (acc, [key, value]) => {
//     return ({ [key.trim()]: value })
// }

const cookieStorage = {
    getItem: (key) => {
        const cookies = document.cookie
            .split(';')
            .map((cookie) => cookie.split('='))[0];
            // .reduce(reducer);

        if (cookies[0] === key) {
            return cookies[1] === 'true';
        } else {
            return false;
        }
        // return cookies[key];
    },
    setItem: (key, value) => {
        document.cookie = `${key}=${value}`;
    },
}
// cookie storage works without reducer;
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
        }, 0);
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
