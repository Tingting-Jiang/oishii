import React, { useEffect, useState } from 'react'
import "./profile.css";
import { useNavigate } from 'react-router';
import userService from '../service/userService';
import { useDispatch, useSelector } from 'react-redux';
import Header from "../Header";
import {Helmet} from "react-helmet";


const Profile = () => {
    // const userReducer = useSelector(state => state.user);
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getProfile = () =>
        userService.getProfile()
            .then(newUser => {
                setUser(newUser);
            })
            .catch(e => navigate('/login'));


    const logout = () =>{
        userService.logout()
            .then(res => navigate("/"));
    };

    useEffect(getProfile, [navigate]);

    return (
        <>
            <Helmet>
                <title>{`${user.username}`} | Oishii</title>
            </Helmet>

            <div className="container mt-2">
                <Header active="profile"/>

                <div className="wd-profile-container">
                    <img className="wd-profile-bg"
                         src="/images/profile-bg.jpg"
                         alt=""/>
                    <div className="wd-profile-info text-center flex">
                        <img className="wd-profile-img"
                             src="/images/sample-user.jpeg"
                             alt=""/>
                        <h5 className="wd-username">{user.username}</h5>
                        <div className="wd-username">
                            <span className="d-inline-block me-2">
                                <i className="fas fa-birthday-cake me-2 wd-color-coral"/>
                                Born some date
                            </span>
                            <span className="d-inline-block me-2">
                                <i className="fas fa-map-marker-alt me-2 wd-color-coral"/>
                                Location
                            </span>
                        </div>
                        <div className="wd-bio">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim
                                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip
                                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                                sint occaecat cupidatat non proident, sunt in culpa qui officia
                                deserunt
                                mollit anim id est laborum
                            </p>
                        </div>

                        <button className="btn btn-outline-primary wd-button my-2">
                            Edit Profile / Like <i className="fas fa-heart"/>
                        </button>

                        <button className= "btn btn-danger rounded-pill"
                                onClick={logout}>
                            Log out
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="wd-block-title">
                        {user.username}'s Recipes
                    </h2>
                    <div className="card-group">
                        <div className="card">
                            <img src="/images/recipe-sample-img.jpeg" className="card-img-top wd-card-img"
                                 alt="sample"/>
                            <button className="btn btn-outline-primary wd-button wd-button-on-img">
                                <i className="fas fa-heart"></i>
                            </button>

                            <div className="card-body">
                                <h5 className="card-title">Jerk Chicken Wings</h5>
                                <p className="card-text">for 4 servings</p>
                                <p className="card-text"><small className="text-muted">Presented by Guinness</small>
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img src="../../images/recipe-sample-img2.jpeg" className="card-img-top wd-card-img"
                                 alt="sample2"/>
                            <button className="btn btn-outline-primary wd-button wd-button-on-img">
                                <i className="fas fa-heart"></i>
                            </button>
                            <div className="card-body">
                                <h5 className="card-title">Roasted Garlic Parmesan Brussels Sprouts</h5>
                                <p className="card-text">for 4 servings</p>
                                <p className="card-text"><small className="text-muted">Robin Broadfoot Tasty
                                    Team</small></p>
                            </div>
                        </div>
                        <div className="card">
                            <img src="../../images/recipe-sample-img.jpeg" className="card-img-top wd-card-img"
                                 alt="sample"/>
                            <button className="btn btn-outline-primary wd-button wd-button-on-img">
                                <i className="fas fa-heart"></i>
                            </button>
                            <div className="card-body">
                                <h5 className="card-title">Jerk Chicken Wings</h5>
                                <p className="card-text">for 4 servings</p>
                                <p className="card-text"><small className="text-muted">Presented by Guinness</small>
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img src="../../images/recipe-sample-img3.jpeg" className="card-img-top wd-card-img"
                                 alt="sample3"/>
                            <button className="btn btn-outline-primary wd-button wd-button-on-img">
                                <i className="fas fa-heart"></i>
                            </button>
                            <div className="card-body">
                                <h5 className="card-title">Brie, Bacon, And Cranberry Mini Pies</h5>
                                <p className="card-text">for 12 servings</p>
                                <p className="card-text"><small className="text-muted">Matthew Cullum Tasty
                                    Team</small></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="wd-block-title">
                        {user.username}'s Favorites
                    </h2>
                    <div className="card-group">
                        <div className="card">
                            <img src="../../images/recipe-sample-img.jpeg" className="card-img-top wd-card-img"
                                 alt="sample"/>
                            <button className="btn btn-outline-primary wd-button wd-button-on-img">
                                <i className="fas fa-heart wd-color-red"></i>
                            </button>
                            <div className="card-body">
                                <h5 className="card-title">Jerk Chicken Wings</h5>
                                <p className="card-text">for 4 servings</p>
                                <p className="card-text"><small className="text-muted">Presented by Guinness</small>
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img src="../../images/recipe-sample-img2.jpeg" className="card-img-top wd-card-img"
                                 alt="sample2"/>
                            <button className="btn btn-outline-primary wd-button wd-button-on-img">
                                <i className="fas fa-heart wd-color-red"></i>
                            </button>
                            <div className="card-body">
                                <h5 className="card-title">Roasted Garlic Parmesan Brussels Sprouts</h5>
                                <p className="card-text">for 4 servings</p>
                                <p className="card-text"><small className="text-muted">Robin Broadfoot Tasty
                                    Team</small></p>
                            </div>
                        </div>
                        <div className="card">
                            <img src="../../images/recipe-sample-img.jpeg" className="card-img-top wd-card-img"
                                 alt="sample"/>
                            <button className="btn btn-outline-primary wd-button wd-button-on-img">
                                <i className="fas fa-heart wd-color-red"></i>
                            </button>
                            <div className="card-body">
                                <h5 className="card-title">Jerk Chicken Wings</h5>
                                <p className="card-text">for 4 servings</p>
                                <p className="card-text"><small className="text-muted">Presented by Guinness</small>
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img src="../../images/recipe-sample-img3.jpeg" className="card-img-top wd-card-img"
                                 alt="sample3"/>
                            <button className="btn btn-outline-primary wd-button wd-button-on-img">
                                <i className="fas fa-heart wd-color-red"></i>
                            </button>
                            <div className="card-body">
                                <h5 className="card-title">Brie, Bacon, And Cranberry Mini Pies</h5>
                                <p className="card-text">for 12 servings</p>
                                <p className="card-text"><small className="text-muted">Matthew Cullum Tasty
                                    Team</small></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="wd-block-title">
                        They like {user.username}!
                    </h2>
                    <div className="wd-like-user-container">
                        <ul className="nav wd-like-user">
                            <li className="nav-item text-center me-2">
                                <img className="wd-following-user-img"
                                     src="../../images/sample-user.jpeg"/>
                                <a className="nav-link" href="#">Alice</a>
                            </li>
                            <li className="nav-item text-center me-2">
                                <img className="wd-following-user-img"
                                     src="../../images/sample-user2.png"/>
                                <a className="nav-link" href="#">Bob</a>
                            </li>
                            <li className="nav-item text-center me-2">
                                <img className="wd-following-user-img"
                                     src="../../images/sample-user3.png"/>
                                <a className="nav-link" href="#">Cindy</a>
                            </li>
                            <li className="nav-item text-center me-2">
                                <img className="wd-following-user-img"
                                     src="../../images/sample-user4.png"/>
                                <a className="nav-link" href="#">Diego</a>
                            </li>
                            <li className="nav-item text-center me-2">
                                <img className="wd-following-user-img"
                                     src="../../images/sample-user5.jpeg"/>
                                <a className="nav-link" href="#">Ellen</a>
                            </li>
                            <li className="nav-item text-center me-2">
                                <img className="wd-following-user-img"
                                     src="../../images/sample-user.jpeg"/>
                                <a className="nav-link" href="#">Alice</a>
                            </li>
                            <li className="nav-item text-center me-2">
                                <img className="wd-following-user-img"
                                     src="../../images/sample-user2.png"/>
                                <a className="nav-link" href="#">Bob</a>
                            </li>
                            <li className="nav-item text-center me-2">
                                <img className="wd-following-user-img"
                                     src="../../images/sample-user3.png"/>
                                <a className="nav-link" href="#">Cindy</a>
                            </li>
                            <li className="nav-item text-center me-2">
                                <img className="wd-following-user-img"
                                     src="../../images/sample-user4.png"/>
                                <a className="nav-link" href="#">Diego</a>
                            </li>
                            <li className="nav-item text-center me-2">
                                <img className="wd-following-user-img"
                                     src="../../images/sample-user5.jpeg"/>
                                <a className="nav-link" href="#">Ellen</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </>
    )
};
export default Profile;