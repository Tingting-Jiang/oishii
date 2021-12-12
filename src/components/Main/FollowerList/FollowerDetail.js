import React, { useEffect, useState } from 'react'
import "./followerlist.css";
import {Link} from "react-router-dom";
import userService from '../../service/userService'

const FollowerDetail = ({follower}) => {
    console.log("in follower detail ===>", follower);
    
    const [followerNew, setFollowerDetail] = useState( {
            // _id: "61aec5a4057e001f4f4d5745",
            // username: 'kk',
            // userAvatar: "https://firebasestorage.googleapis.com/v0/b/oishii-794ac.appspot.com/o/avatar.jpeg-1639206936623?alt=media&token=2656ba69-1ca6-4f15-bc5e-09e5f0fee56f'"
        }
    );
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
        
            <Link to={`/profile/${followerNew._id}`}>
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