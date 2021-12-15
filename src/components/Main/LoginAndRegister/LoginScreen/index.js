import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import userService from '../../../service/userService'
import "../loginAndRgister.css";
import {Helmet} from "react-helmet";
import Header from "../../Header";
import {useDispatch} from "react-redux";



const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const history = useHistory();
    const dispatch = useDispatch();

    const checkLogin = (e)=>{
        if (e.key === "Enter")
            login()
    }

    const login = () => {

        userService.login(user)
            .then(newUser => {
                dispatch({
                        type: "set-user",
                        newUser
                })
                history.push('/profile');
            })
            .catch(e => alert("User does not exist or wrong password."))};



    return (
        <>
            <Helmet>
                <title>Login | Oishii</title>
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
                            <label htmlFor="usernameInput" className="form-label">
                                Username
                                <span className="wd-color-coral">*</span>
                            </label>
                            <input className="form-control" id="usernameInput"
                                   placeholder="your username" autoComplete="username"
                                   value={user.username}
                                   onChange={(e) =>
                                       setUser({...user, username: e.target.value})}/>
                        </div>
                        <div className="ms-3 mb-3">
                            <label htmlFor="passwordInput" className="form-label">
                                Password
                                <span className="wd-color-coral">*</span>
                            </label>
                            <input type="password" autoComplete="current-password"
                                   className="form-control" id="passwordInput"
                                   placeholder="your password"
                                   value={user.password}
                                   onChange={(e) =>
                                       setUser({...user, password: e.target.value})}
                                    onKeyPress={e => checkLogin(e)}/>
                        </div>
                        <div className="mt-5 text-center">
                            <button className="btn btn-outline-primary wd-button w-50"
                                    onClick={login}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

};
export default Login;
