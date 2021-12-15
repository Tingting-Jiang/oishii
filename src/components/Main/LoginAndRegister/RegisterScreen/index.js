import React, { useState } from 'react';
import {Link, useHistory} from "react-router-dom";
import userService from '../../../service/userService'
import { useDispatch } from 'react-redux'
import {Helmet} from "react-helmet";
import Header from "../../Header";

const Register = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
        verifyPassword: "",
        email: "",
        location: "",
        dateOfBirth: "",
        role: "normal",
    });

    const history = useHistory();
    const dispatch = useDispatch();


    const register = () => {
        // check password verify
        if (user.username === "" ||
            user.password === "" ||
            user.password !== user.verifyPassword) {
            alert("Please check your username and password.")
            return;
        }
        // console.log("before send, ", user);
        userService.register(user)
            .then(newUser =>{
                dispatch({
                    type: "set-user",
                    newUser
                })
                history.push('/profile');
            })
            .catch(e =>{
                if (e.status === 404){
                    alert("You already registered, please go to Login");
                    history.push('/login');
                }
            })
        
    };
    
    
    return (
        <>
            <Helmet>
                <title>Register | Oishii</title>
            </Helmet>

            <div className="container mt-2">
                <Header active="profile"/>

                <div className="row align-items-center">
                    <div className="d-none d-md-block col-md-5">
                        <img className="wd-login-bg"
                             src="/images/login-bg.jpg"
                             alt=""/>
                    </div>
                    <div className="d-block d-md-none col-12 mb-3">
                        <img className="wd-login-bg-small"
                             src="/images/login-bg-small.jpg"
                             alt=""/>
                    </div>
                    <div className="col-12 col-md-7">
                        <div className="text-center mb-3">
                            <Link to="/login">
                                <button className="btn btn-outline-primary wd-button wd-button-transparent">
                                    Login
                                </button>
                            </Link>
                            <span className="wd-color-coral">|</span>
                            <Link to="/register">
                                <button className="btn btn-outline-primary wd-button wd-button-transparent">
                                    Register
                                </button>
                            </Link>
                        </div>
                        <div className="ms-3 mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                                <span className="wd-color-coral">*</span>
                            </label>
                            <input className="form-control" id="username"
                                   placeholder="your username" autoComplete="username"
                                   value={user.username}
                                   onChange={(e) =>
                                       setUser({...user, username: e.target.value})}/>
                        </div>
                        <div className="ms-3 mb-3">
                            <label htmlFor="password1" className="form-label">
                                Password
                                <span className="wd-color-coral">*</span>
                            </label>
                            <input type="password" autoComplete="new-password"
                                   className="form-control" id="password1"
                                   placeholder="your password"
                                   value={user.password}
                                   onChange={(e) =>
                                       setUser({...user, password: e.target.value})}/>
                        </div>
                        <div className="ms-3 mb-3">
                            <label htmlFor="password2" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="password2"
                                   placeholder="Verify Password" autoComplete="current-password"
                                   onChange={(e) =>
                                       setUser({...user, verifyPassword: e.target.value})}/>
                            {
                                user && user.verifyPassword !== "" && user.password !== user.verifyPassword &&
                                <span className="wd-color-red">Password don't match</span>
                            }
                        </div>
                        <div className="ms-3 mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input type="email"
                                   autoComplete="email"
                                   className="form-control" id="email"
                                   placeholder="username@email.com"
                                   value={user.email}
                                   onChange={(e) =>
                                       setUser({...user, email: e.target.value})}/>
                        </div>
                        <div className="ms-3 mb-3">
                            <label htmlFor="location" className="form-label">
                                Location
                            </label>
                            <input autoComplete="location"
                                   className="form-control" id="location"
                                   placeholder="your location (only you can see it)"
                                   value={user.location}
                                   onChange={(e) =>
                                       setUser({...user, location: e.target.value})}/>
                        </div>
                        <div className="ms-3 mb-3">
                            <label htmlFor="dateOfBirth" className="form-label">
                                Birthday
                            </label>
                            <input autoComplete="date-of-birth"
                                   className="form-control" id="dateOfBirth"
                                   placeholder="yyyy/mm/dd (only you can see it)"
                                   value={user.dateOfBirth}
                                   onChange={(e) =>
                                       setUser({...user, dateOfBirth: e.target.value})}/>
                        </div>

                        <div className="ms-3 mb-3">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="role"
                                       id="userRole" value="normal"
                                       onChange={(e) => setUser({...user, role: e.target.value})}/>
                                <label className="form-check-label" htmlFor="userRole">Member</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="role"
                                       id="userRole2" value="editor"
                                       onChange={(e) => setUser({...user, role: e.target.value})}/>
                                <label className="form-check-label" htmlFor="userRole2">Editor</label>
                            </div>
                        </div>
                        <div className="mt-5 text-center">
                            <button className="btn btn-outline-primary wd-button w-50"
                                    onClick={register}>
                                Register
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )

};
export default Register;