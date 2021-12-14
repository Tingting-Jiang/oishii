import React from "react";
import Header from "../Header";
import {Helmet} from "react-helmet";
import './terms.css';

const TermsOfService = () => {
    return (
        <>
            <Helmet>
                <title>Terms of Service | Oishii</title>
            </Helmet>

            <div className="container mt-2">
                <Header active=""/>

                <hr className="wd-color-coral"/>

                <div>
                    <ul className="nav d-flex d-block d-lg-none">
                        <li className="nav-item">
                            <a className="nav-link" href="/terms-of-service">Terms of Service</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/privacy-policy">Privacy Policy</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/cookie-policy">Cookie Policy</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/send-feedback">Send Feedback</a>
                        </li>
                    </ul>
                </div>

                <div className="row">
                    <ul className="nav flex-column mt-3 d-none d-lg-block col-3">

                        <li className="nav-item">
                            <a className="nav-link" href="/terms-of-service">Terms of Service</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/privacy-policy">Privacy Policy</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/cookie-policy">Cookie Policy</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/send-feedback">Send Feedback</a>
                        </li>

                    </ul>
                    <div className="mt-2 col-12 col-lg-9">
                        <h1 className="wd-terms-title my-2 text-black">Send Your Feedback</h1>
                        <form action="mailto:emailid@email.com" method="post" encType="text/plain">
                            <div className="mb-3">
                                <label htmlFor="userInputName" className="form-label">Your name</label>
                                <input className="form-control" id="userInputName" name="username"
                                       aria-describedby="emailHelp" autoComplete="username"/>
                                <div id="emailHelp" className="form-text">Please let us know who you are.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="userInputEmail" className="form-label">Your Email</label>
                                <input type="email" className="form-control" id="userInputEmail"
                                       aria-describedby="emailHelp" autoComplete="email" name="email"/>
                                    <div id="emailHelp" className="form-text">
                                        We may contact you through your email address.
                                        And We'll never share your email with anyone else.
                                    </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="feedbackSubjectInput" className="form-label">Subject</label>
                                <textarea className="form-control" id="feedbackSubjectInput" name="subject"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="feedbackInput" className="form-label">Your message</label>
                                <textarea className="form-control wd-feedback-input" name="body" id="feedbackInput"/>
                            </div>

                            <button type="submit" value="Send" className="btn btn-outline-primary wd-button">Submit</button>
                        </form>


                    </div>
                </div>

            </div>
        </>

    );
}

export default TermsOfService;