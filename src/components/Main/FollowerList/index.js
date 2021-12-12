import React from "react";
import "./followerlist.css";
import {Link} from "react-router-dom";

const FollowerList = ({followers}) => {
    return (
        <div className="wd-like-user-container">
            <ul className="nav wd-like-user">
                {
                    (!followers || followers.length === 0) &&
                        <h4>Oops. No followers yet.</h4>
                }
                {
                    followers && followers.map(follower => (
                    <Link to={`/profile/${follower._id}`}>
                        <li className="nav-item text-center me-2">
                            <img className="wd-following-user-img"
                                 src={follower.userAvatar} alt=""/>
                            {/*TODO: change to button or text*/}
                            <button className="nav-link wd-button-transparent">{follower.username}</button>
                        </li>
                    </Link>

                    ))
                }

            </ul>
        </div>
    )
}

export default  FollowerList;