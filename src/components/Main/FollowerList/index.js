import React from 'react'
import "./followerlist.css";
import FollowerDetail from './FollowerDetail'

const FollowerList = ({followers, profile}) => {
    // console.log(" followers list =====", followers);
    
    return (
        <div className="wd-like-user-container">
            <ul className="nav wd-like-user">
                {
                    (!followers || followers.length === 0) &&
                        <h5 className="ms-2">Oops. No followers yet.</h5>
                }

                {
                    followers && followers.map(singleFollower => (
                    <FollowerDetail follower={singleFollower} profile={profile}/>
                    ))
                }

            </ul>
        </div>
    )
}

export default  FollowerList;