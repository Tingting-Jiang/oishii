import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import userService from '../../service/userService'
import "../../oishii.css";



const LoginOld = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const login = () => {
        userService.login(user)
            .then((response) => response.json())
            .then(newUser => {
                console.log("newUser");
               console.log(newUser);
                navigate('/profile');
        })};

    
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
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link wd-color-coral fw-bold" href="#">Recipes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/profile">Profile</a>
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
        
                <div className="row align-items-center">
                    <div className="d-none d-md-block col-md-5">
                        <img className="wd-login-bg"
                             src="../../images/login-bg.jpg"
                             alt=""/>
                    </div>
                    <div className="d-block d-md-none col-12 mb-3">
                        <img className="wd-login-bg-small"
                             src="../../images/login-bg-small.jpg"
                             alt=""/>
                    </div>
                    <div className="col-12 col-md-7">
                        <div className="text-center mb-3">
                            <button className="btn btn-outline-primary wd-button wd-button-transparent">
                                Login
                            </button>
                            <span className="wd-color-coral">|</span>
                            <button className="btn btn-outline-primary wd-button wd-button-transparent">
                                Register
                            </button>
                        </div>
                        <div className="ms-3 mb-3">
                            <label htmlFor="usernameInput" className="form-label">
                                Username
                                <span className="wd-color-coral">*</span>
                            </label>
                            <input className="form-control" id="usernameInput" placeholder="your username"
                                   value={user.username}
                                   onChange={(e) =>
                                       setUser({...user, username: e.target.value})}/>
                        </div>
                        <div className="ms-3 mb-3">
                            <label htmlFor="emailInput" className="form-label">
                                Email
                            </label>
                            <input type="email" className="form-control" id="emailInput"
                                   placeholder="username@email.com"
                                   value={user.email}
                                   onChange={(e) =>
                                       setUser({...user, email: e.target.value})}/>
                        </div>
                        
                        <div className="ms-3 mb-3">
                            <label htmlFor="passwordInput" className="form-label">
                                Password
                                <span className="wd-color-coral">*</span>
                            </label>
                            <input type="password" className="form-control" id="passwordInput"
                                   placeholder="your password"
                                   value={user.password}
                                   onChange={(e) =>
                                       setUser({...user, password: e.target.value})}/>
                        </div>
                        
                        <div className="mt-4 text-center">
                            <button className="btn btn-outline-primary wd-button w-50"
                                    onClick={login}>>
                                Register
                            </button>
                        </div>
            
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
export default LoginOld;