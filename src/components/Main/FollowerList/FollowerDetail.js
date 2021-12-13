import React, { useEffect, useState } from 'react'
import "./followerlist.css";
import {Link} from "react-router-dom";
import userService from '../../service/userService'

const FollowerDetail = ({follower}) => {
    console.log("in follower detail ===>", follower);
    
    const [followerNew, setFollowerDetail] = useState( {});
    useEffect(() =>{
        userService.getFollowerInfo(follower)
            .then(data => {
                console.log("follower Detail", data);
                setFollowerDetail(data);
            })
    }, []);

    console.log("followerNew");
    console.log(followerNew);
    
    
    return (
        
        
            <Link to={`/profile/${followerNew.id}`}>
                <li className="nav-item text-center me-2">
                    <img className="wd-following-user-img"
                         src={followerNew.userAvatar} alt=""/>
                    {/*TODO: change to button or text*/}
                    
                    <button className="nav-link wd-button-transparent">{followerNew.username}</button>
                </li>
            </Link>

    )
}

export default  FollowerDetail;