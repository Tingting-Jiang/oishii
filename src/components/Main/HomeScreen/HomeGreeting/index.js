import React from "react";
import "./homeGreeting.css";
import {Link} from "react-router-dom";

const Greeting = ({profile}) => {

    // console.log("profile in greeting 22222222222222222222");
    // console.log(profile);

    return (
        <div className="wd-about">
            <img className="wd-about-img"
                 src="/images/home-about.jpg"
                 alt=""/>
                <div className="wd-user-info text-center">
                    <img className="wd-profile-img"
                         src={`${profile.userAvatar || "/images/sample-user.jpeg"}`}
                         alt=""/>
                        <h5 className="wd-username">Hello {profile.username}</h5>
                        <h6 className="wd-username">Ready to find some Oishii?</h6>
                        <Link to="/profile">
                            {
                                profile.username &&
                                <button className="btn btn-outline-primary wd-button my-2">
                                    Your Kitchen
                                </button>
                            }
                            {
                                !profile.username &&
                                <button className="btn btn-outline-primary wd-button my-2">
                                    Login / Register
                                </button>
                            }
                        </Link>
                </div>
        </div>
    )
}

export default Greeting;