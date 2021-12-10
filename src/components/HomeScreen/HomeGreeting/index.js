import React, {useEffect, useState} from "react";
import "./homeGreeting.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import userService from "../../service/userService";
import { b64toBlob, contentType } from '../../const'

// TODO: need check on why state does not work

const Greeting = () => {
    // const user = useSelector((state) => state);
    // console.log("in home: ", user);

    const [user, setUser] = useState({});


    useEffect(() =>{
        userService.getProfile()
            .then(user => {
                user.userAvatar = URL.createObjectURL(b64toBlob(user.userAvatar, contentType))
                console.log("home is setting user -->", user);
                setUser(user)
            });
    }, [])
    
    

    return (
        <div className="wd-about">
            <img className="wd-about-img"
                 src="/images/home-about.jpg"
                 alt=""/>
                <div className="wd-user-info text-center">
                    <img className="wd-profile-img"
                         src={user.userAvatar}
                         alt=""/>
                        <h5 className="wd-username">Hello {user.username}</h5>
                        <h6 className="wd-username">Ready to find some Oishii?</h6>
                        <Link to="/profile">
                            {
                                user.username &&
                                <button className="btn btn-outline-primary wd-button my-2">
                                    Your Kitchen
                                </button>
                            }
                            {
                                !user.username &&
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