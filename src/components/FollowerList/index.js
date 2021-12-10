import React from "react";
import "./followerlist.css";
import {Link} from "react-router-dom";

const FollowerList = ({followers}) => {
    return (
        <div className="wd-like-user-container">
            <ul className="nav wd-like-user">
                {followers.map(follower => (
                    <Link to={`/profile/${follower._id}`}>
                        <li className="nav-item text-center me-2">
                            <img className="wd-following-user-img"
                                 src={follower.userAvatar}/>

                            <a className="nav-link">{follower.username}</a>
                        </li>
                    </Link>

                    ))}

            </ul>
        </div>
    )
}

export default  FollowerList;