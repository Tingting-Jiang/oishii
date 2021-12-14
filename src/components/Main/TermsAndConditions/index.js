import React from "react";
import {Helmet} from "react-helmet";
import Header from "../Header";

const TermsAndConditions = () => {

    return (
        <>
            <Helmet>
                <title>Terms | Oishii</title>
            </Helmet>

            <div className="container mt-2">
                <Header active=""/>
                <hr className="wd-color-coral"/>
                <div className="d-flex">
                    <ul className="nav flex-column">

                        <li className="nav-item">
                            <a className="nav-link active" href="/terms-of-service">Terms of Service</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/privacy-policy">Privacy Policy</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/cookie-policy">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/send-feedback">Send Feedback</a>
                        </li>

                    </ul>
                    <div className="mx-5 mt-2">
                        Right column
                    </div>
                </div>

            </div>
        </>

    )
}

export default TermsAndConditions;