import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import userService, {getProfile} from '../../service/userService'
import './search.css';
import Header from "../Header";
import { Helmet } from 'react-helmet';
import {useDispatch, useSelector} from "react-redux";

const selectProfile = (profile) => profile;

const AllUsers = () => {

    // get login user information
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => getUser(dispatch), [history, dispatch]);

    let user = useSelector(selectProfile);


    const getUser = (dispatch) => {
        getProfile(dispatch)
            // .then(res => setUser(profile))
            .then(newUser => {
                // console.log("returned from SESSION", newUser.favRecipeList);
                if (newUser.username && newUser.password) {
                    user = newUser;
                } else {
                    history.push('/login');
                }
                if (user.role !== 'admin') {
                    history.push('/');
                }
            })
            .catch(e => history.push('/login'));
        // .catch(e => console.log(e));
    }

    const [userList, setUserList] = useState([]);

    useEffect(() => {userService.getAllUsers(dispatch).then(r => console.log(r))}, []);


    const mid = Math.round(userList.length / 2);


    const deleteUser = (userId) =>{
        console.log("to delete ", userId);
        userService.deleteUser(userId)
            .then(data =>
            console.log("user deleted"));
        
    }
    
    const changeRole = (userId, currentRole) =>{
        console.log("current role--", currentRole);
        userService.changeRole(userId, currentRole)
            .then(data =>
                console.log("role changed"));
        
    }
    
    
    return (
        <>
            <Helmet>
                <title>Search | Oishii</title>
            </Helmet>
            
            <div className="container mt-2">
                <Header active="search"/>
                
                <img className="wd-search-bg"
                     src="/images/search-bg.jpg"
                     alt=""/>
                
                <div className="wd-search-container">
                    <div className="wd-search-region text-center flex">
                        <div className="align-items-center">
                            <div className="wd-magnifier wd-main-magnifier">
                                <label htmlFor="MainSearchInput">
                                    <i className="fas fa-search"/>
                                </label>
                            </div>
                            <div>
                                <input
                                    className="form-control wd-main-search-input"
                                    list="item-list"
                                    placeholder="Search Oishii"
                                />
                            
                            
                            
                            </div>
                        </div>
                        
                        <div className="my-3">
                            <span>
                             
                                <button
                                    className="btn btn-outline-primary wd-button me-3">
                                    Search For Recipe
                                </button>
                            </span>
                            <span>
                                {/*TODO direct to a random recipe page*/}
                                <button className="btn btn-outline-primary wd-button"
                                >
                                    Get a Lucky Oishii
                                </button>
                            </span>
                        </div>
                    
                    </div>
                </div>
                
                <div className="row justify-content-evenly">
                    <ul className="list-group wd-search-result col-12 col-md-6 row">
                        {userList.slice(0, mid).map(item =>{
                            return (
                                <>
                           
                            <Link to={`/profile/${item.id}`}>
                                <li className="list-group-item wd-search-result-item d-flex"
                                    key={item.id}>

                                        <span>
                                            <img className="wd-search-result-image"
                                                 src={item.userAvatar} alt=""/>
                                        </span>
            
                                    <span className="ms-3">
                                            <h4 className="wd-search-result-name fw-bold wd-color-coral">{item.username}</h4>
                                            <h6 className="my-1">Role: &nbsp;&nbsp;&nbsp;&nbsp;{item.role}</h6>
                                            <h6 >{item.id}</h6>
                                    </span>
                                </li>
                            </Link>
                            <button className="btn btn-primary rounded-pill"
                                onClick={() => deleteUser(item.id)}> delete </button>
    
                                    <button className="btn btn-primary rounded-pill"
                                            onClick={() => changeRole(item.id, item.role)}> ChangeRole </button>
                            
                                </>
                        )
                        })}
                    </ul>
                    <ul className="list-group wd-search-result col-12 col-md-6 row">
                        {userList.slice(mid, userList.length).map(item =>{
                            return (
                            <>
    
                            <Link to={`/profile/${item.id}`}>
                            <li className="list-group-item wd-search-result-item d-flex"
                            key={item.id}>
    
                            <span>
                            <img className="wd-search-result-image"
                            src={item.userAvatar} alt=""/>
                            </span>
    
                            <span className="ms-3">
                            <h4 className="wd-search-result-name fw-bold wd-color-coral">{item.username}</h4>
                            <h6 className="my-1">Role: &nbsp;&nbsp;&nbsp;&nbsp;{item.role}</h6>
                            <h6 >{item.id}</h6>
                            </span>
                            </li>
                            </Link>
                            <button className="btn btn-primary rounded-pill"
                            onClick={() => deleteUser(item.id)}> delete </button>
    
                            <button className="btn btn-primary rounded-pill"
                            onClick={() => changeRole(item.id, item.role)}> ChangeRole </button>
    
                            </>
                            )}
                        )}
                    </ul>
                </div>
            </div>
        </>
    
    );
};
export default AllUsers;
