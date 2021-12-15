import React from "react";
import './footer.css';
import {Link} from "react-router-dom";

const Footer = () => {

    return (
        <div className="wd-footer">
            <div>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h3>Oishii</h3>
                        <p>Presented by Project Oishii Group, Northeastern University @ 2021</p>
                    </div>

                    <div>
                        <div className="d-flex">
                            <Link to="/profile/2">
                                <img className="wd-header-profile-img"
                                     src="/images/user-TT12.jpeg"
                                     alt=""/>
                            </Link>

                            <Link to="/profile/4">
                                <img className="wd-header-profile-img ms-4"
                                     src="/images/sample-user3.png"
                                     alt=""/>
                            </Link>
                        </div>

                    </div>
                </div>
                
                <div>

                </div>
                <span>
                    <Link to="/terms-of-service">
                        <button type="button" className="btn btn-outline-primary text-body wd-button-transparent p-0" >
                            Terms of Service
                        </button>
                    </Link>
                </span>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <span>
                    <Link to="/privacy-policy">
                        <button type="button" className="btn btn-outline-primary text-body wd-button-transparent p-0" >
                            Privacy Policy
                        </button>
                    </Link>
                </span>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <span>
                    <Link to="/cookie-policy">
                        <button type="button" className="btn btn-outline-primary text-body wd-button-transparent p-0" >
                            Cookie Policy
                        </button>
                    </Link>
                </span>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <span>
                    <Link to="/send-feedback">
                        <button type="button" className="btn btn-outline-primary text-body wd-button-transparent p-0" >
                            Send Feedback
                        </button>
                    </Link>
                </span>
            </div>


            <div id="consent-popup" className="hidden">
                <p>Hello! Oishii is a website where you can explore recipes and menus for your dinner or just for fun!
                </p>
                <p>We value the privacy of each user. By using this site you agree to our <a href="/terms-and-conditions" className="wd-color-coral fw-bold">Terms of Use and Privacy Policy</a>.
                    Please check the link and <a id="accept" className="wd-color-coral fw-bold" href="#">Accept</a> before using our website. We hope you have a good time here.
                </p>
            </div>

        </div>
    )
}

export default Footer;

