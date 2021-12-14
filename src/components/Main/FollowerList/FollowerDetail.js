import React, {useEffect, useState} from 'react'
import "./followerlist.css";
import {Link} from "react-router-dom";
import userService from '../../service/userService'
import {useHistory} from "react-router";


const FollowerDetail = ({follower, profile}) => {
    console.log("in follower detail ===>", follower);
    const history = useHistory();
    const [followerNew, setFollowerDetail] = useState( {});
    useEffect(() =>{
        userService.getFollowerInfo(follower)
            .then(data => {
                console.log("follower Detail", data);
                setFollowerDetail(data);
            })
    }, []);

    const reDirectHandler = () => {
        if (followerNew.id === profile.id) {
            history.push('/profile');
        } else {
            // history.push('/profile');
            history.push(`/profile/${followerNew.id}`);
        }

    }

    return (

            <Link to={`/profile/${followerNew.id}`}>
                <li className="nav-item text-center align-items-center mx-2 wd-follower flex">
                    <img className="wd-following-user-img"
                         src={followerNew.userAvatar} alt=""/>

                    <p className="nav-link btn btn-outline-primary px-0 align-self-center wd-button-transparent"
                            onClick={reDirectHandler}>
                        {followerNew.username}
                    </p>
                </li>
            </Link>
    )
}

export default  FollowerDetail;