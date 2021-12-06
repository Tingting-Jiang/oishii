import React from "react";
import "./homeGreeting.css";
import {Link} from "react-router-dom";

// TODO: This file needs user session info.
// show "your kitchen if logged in, show Login | Register if not logged in

const Greeting = () => {
    return (
        <div className="wd-about">
            <img className="wd-about-img"
                 src="/images/home-about.jpg"
                 alt=""/>
                <div className="wd-user-info text-center">
                    <img className="wd-profile-img"
                         src="/images/sample-user.jpeg"
                         alt=""/>
                        <h5 className="wd-username">Hello</h5>
                        <h6 className="wd-username">Ready to find some Oishii?</h6>
                        <Link to="/profile">
                            <button className="btn btn-outline-primary wd-button my-2"
                                    onClick="window.location.href='profile';">
                                Your Kitchen
                            </button>
                        </Link>
                </div>
        </div>
    )
}

export default Greeting;