import React, { useEffect, useState } from 'react'
import "./profile.css";
import "../oishii.css"
import { useNavigate } from 'react-router';
import userService from '../service/userService'


const Profile = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const getProfile = () =>
        userService.getProfile()
            .then(user => setUser(user))
            .catch(e => navigate('/login'));
    
    
    const logout = () =>{
        userService.logout()
            .then(res => navigate("/"));
        
    };
    
    useEffect(getProfile, [navigate]);
    
    
    return (
        <>
            <div className="container mt-2">
                <div className="row wd-home-header">
                    <div className="col-2 col-md-2">
                        <h1>Oishii</h1>
                    </div>
                    <div className="col-6 col-md-6 align-self-center">
                        <ul className="nav justify-content-left">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Recipes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                        </ul>
                    </div>
                    <div className="d-none d-md-block col-4 align-self-center">
                        <div className="align-items-center">
                            <div className="wd-magnifier">
                                <label htmlFor="SearchInput">
                                    <i className="fas fa-search"></i>
                                </label>
                            </div>
                            <div>
                                <input id="SearchInput"
                                       className="form-control wd-search-bar-input"
                                       placeholder="Search Oishii"/>
                            </div>
                        </div>
                    </div>
                </div>
        
                <div className="wd-profile-container">
                    <img className="wd-profile-bg"
                         src="../../images/profile-bg.jpg"/>
                        <div className="wd-profile-info text-center flex">
                            <img className="wd-profile-img"
                                 src="../../images/sample-user.jpeg"/>
                                <h5 className="wd-username">{user.username}</h5>
                                <div className="wd-username">
                <span className="d-inline-block me-2">
                    <i className="fas fa-birthday-cake me-2 wd-color-coral"></i>
                    Born some date
                </span>
                                    <span className="d-inline-block me-2">
                    <i className="fas fa-map-marker-alt me-2 wd-color-coral"></i>
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
                                    Edit Profile / Like <i className="fas fa-heart"></i>
                                </button>
    
                            <button className= "btn btn-danger rounded-pill"
                                    onClick={logout}>
                                Log out
                            </button>
                        </div>
                </div>
        
                <div>
                    <h2 className="wd-block-title">
                        Username's Recipes
                    </h2>
                    <div className="card-group">
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
                        Username's Favorites
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
                        They like Username!
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
        
                <div className="wd-footer">
                    <div>
                        <h3>Oishii</h3>
                        <p>Presented by Project Oishii Group</p>
                        <span>Privacy Policy</span> | <span>Send Feedback</span>
                    </div>
                </div>
            </div>
        </>
)
};
export default Profile;