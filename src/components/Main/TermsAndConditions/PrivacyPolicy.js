import React from "react";
import Header from "../Header";
import {Helmet} from "react-helmet";

const PrivacyPolicy = () => {
    return (
        <>
            <Helmet>
                <title>Privacy Policy | Oishii</title>
            </Helmet>

            <Header active=""/>
            <h1>
                Privacy Policy
            </h1>
        </>

    );
}

export default PrivacyPolicy;