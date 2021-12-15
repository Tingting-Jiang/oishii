import React, {useEffect, useState} from 'react'
import HeaderNavItem from "./HeaderNavItem";
import headerNavs from "./headerNavs.json";
import "./header.css";
import recipeService from '../../service/recipeService';
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../service/userService";

const selectProfile = (profile) => profile;

const Header = ({
        active = "home"
}) => {
    const dispatch = useDispatch();

    // change the active nav's isActive field
    for (let i = 0; i < headerNavs.length; i++) {
        headerNavs[i].isActive = (headerNavs[i].navTitle === active);
    }
    
    // data part starts from here ----------------
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    
    const searchRecipe = (event) => {
        setSearchTerm(event.target.value);
        recipeService.fetchSearchResult(event.target.value)
            .then(data => {
                // console.log("auto complete result ->", data);
                setSearchResult(data)
            
            })
    };
    
    const navigate = useHistory();
    const submitSearchHandler = (e) => {
        if(e.key === "Enter")
            navigate.push(`/search/${searchTerm}`);
    }


    // get login in user
    let user = useSelector(selectProfile);

    useEffect(() => getUser(dispatch), [dispatch]);

    const getUser = (dispatch) => {
        getProfile(dispatch)
            // .then(res => setUser(profile))
            .then(newUser => {
                // console.log("returned from SESSION", newUser.favRecipeList);
                if (newUser && newUser.username && newUser.password) {
                    user = newUser;
                }
            })
            .catch(e => console.log(e));
    }

    return (
        <>
            <div className="row wd-home-header">
                <div className="col-2 col-md-2">
                    <h1><a href="/home">Oishii</a></h1>
                </div>
                <div className="col-6 col-md-9 col-xl-6 align-self-center">
                    <ul className="nav justify-content-left">
                        {headerNavs.map(nav => {
                            return (
                                <HeaderNavItem key={nav._id}
                                               nav={nav}
                                               isActive={nav.isActive}/>);
                        })}
                        {
                            user.role === 'admin' &&
                            <li className="nav-item">
                                <a className='nav-link text-danger' href="/allUsers">User</a>
                            </li>
                        }
                    </ul>
                </div>
                <div className="d-none d-xl-block col-xl-3 align-self-center">
                    <div className="align-items-center">
                        <div className="wd-magnifier">
                            <label htmlFor="SearchInput">
                                <i className="fas fa-search"/>
                            </label>
                        </div>
                        <div>
                            <input id="SearchInput"
                                   className="form-control wd-search-bar-input"
                                   list="datalistOptions"
                                   placeholder="Search Oishii"
                                   onChange={e => searchRecipe(e)}
                                   onKeyPress={e => submitSearchHandler(e)}/>
    
                            <datalist id="datalistOptions">
                                {searchResult.map(item => (
                                    <option value={item.title} />
                                ))}
                            </datalist>
                        </div>
                    </div>
                </div>
                {
                    user && user.username && user.id &&
                    <div className="d-none d-lg-block col-lg-1 align-self-center text-center">
                        <img className="wd-header-profile-img"
                             src={`${user.userAvatar || "/images/sample-user.jpeg"}`}
                             alt=""/>
                    </div>
                }

            </div>


        </>
    )
}

export default Header;