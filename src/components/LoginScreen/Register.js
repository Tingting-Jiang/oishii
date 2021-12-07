import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import userService from '../service/userService'
import { useDispatch } from 'react-redux'



const Register = () => {
    const [user, setUser] = useState({});
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const register = () => {
        userService.register(user)
            .then((response) => response.json())
            .then(newUser => {
                console.log(newUser);
                dispatch({
                    type: "get-user",
                    newUser
                });
                navigate('/profile')
            })
            .catch(e => console.log(e));
    };
    
    
    return (
        <>
            <div className="row">
                <h1>Register Page</h1>
                <div className="col-4">
                    <h1>Left</h1>
                    
                    <div className="my-3">
                        <label for="username" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="username"
                               placeholder="Username"
                               value={user.username}
                               onChange={(e) =>
                                   setUser({...user, username: e.target.value})}/>
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password"
                               placeholder="Password"
                               value={user.password}
                               onChange={(e) =>
                                   setUser({...user, password: e.target.value})}/>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="password2" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="password2"
                               placeholder="Verify Password"
                               onChange={(e) =>
                                   setUser({...user, verifyPassword: e.target.value})}/>
                        {
                            user && user.verifyPassword !== "" && user.password !== user.verifyPassword &&
                                <span>Password don't match</span>
                        }
                    </div>
                    
                    <div className="mb-3">
                        <div className="form-check">
                            <label className="form-check-label" for="remember">
                                Remember me
                            </label>
                            
                            <input type="checkbox" className="form-check-input" id="remember"/>
                        
                        </div>
                    </div>
                    <button type="submit"
                            className="btn btn-primary"
                            onClick={register}>
                        Register
                    </button>
                
                </div>
                
                
                <div className="col-1">
                    {/*<h1>Middle</h1>*/}
                </div>
                
                
                <div className="col-6">
                    <h1>Right</h1>
                    <img src="../../images/recipe2.jpg"/>
                </div>
            
            
            </div>
        
        </>
    )
    
};
export default Register;