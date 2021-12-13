import React, { useState } from 'react'
import "./followerlist.css";
import {Link} from "react-router-dom";
import FollowerDetail from './FollowerDetail'

const FollowerList = ({followers}) => {
    console.log(" followers index", followers);
    
    return (
        <div className="wd-like-user-container">
            <ul className="nav wd-like-user">
                {
                    (!followers || followers.length === 0) &&
                        <h5 className="ms-2">Oops. No followers yet.</h5>
                }

                {
                    followers && followers.map(singleFollower => (
                    <FollowerDetail follower={singleFollower}/>
                    ))
                }

            </ul>
        </div>
    )
}

export default  FollowerList;