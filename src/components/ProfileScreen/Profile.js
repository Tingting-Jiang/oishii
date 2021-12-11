import React, { useEffect, useState } from 'react'
import "./profile.css";
import "../oishii.css"
import { useNavigate } from 'react-router';
import userService from '../service/userService'

import RecipeCardItem from '../RecipeCards/RecipeCardItem'
import FollowerList from '../FollowerList'
import DBRecipeCardItem from '../RecipeCards/DBRecipeCardItem'
import { useCookies } from 'react-cookie'




const Profile = () => {
    const [user, setUser] = useState({});
    const [userRecipe, setUserRecipe] = useState([]);
    const [userFavRecipes, setUserFav] = useState([]);
    const [followers, setFollowers] = useState();
    
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    

    const navigate = useNavigate();
    const getProfile = () =>
        userService.getProfile()
            .then(newUser => {
                console.log(newUser)
                setUser(newUser);
                setCookie('user', newUser, { path: '/' })
                
                console.log("returned form server", newUser);
                setUserFav(newUser.favRecipeList);
                setUserRecipe(newUser.usersRecipe);
                setFollowers(newUser.usersFollowers);
            })
            .catch(e => navigate('/login'));
    
    
    const logout = () =>{
        userService.logout()
            .then(res => {
                removeCookie('user')
                navigate("/")
            });
    };
    
    useEffect(getProfile, [navigate]);
    
  
    console.log("user recipe", userRecipe);
    console.log("user fav", userFavRecipes);
    console.log("new user", cookies.user);
    
    
    
    
    
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
                                <a className="nav-link" href="/create">Recipes</a>
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
                                 src={user.userAvatar}/>
                                <h5 className="wd-username">{user.username}</h5>
                                <div className="wd-username">
                <span className="d-inline-block me-2">
                    <i className="fas fa-birthday-cake me-2 wd-color-coral"></i>
                    {user.dateOfBirth}
                </span>
                                    <span className="d-inline-block me-2">
                    <i className="fas fa-map-marker-alt me-2 wd-color-coral"></i>
                                        {user.location}
                </span>
                                </div>
                                <div className="wd-bio">
                                    <p>{user.bio}
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
                        {user.username}'s Recipes
                    </h2>
                 
                    {
                        userRecipe.map(recipeId =>
                            <DBRecipeCardItem key={recipeId} recipeId={recipeId} user={user} setUser={setUser}/>
                        )
                    }
                 
                </div>
        
                <div>
                    <h2 className="wd-block-title">
                        {user.username}'s Favorites
                    </h2>
                    <div className="card-group">
                 
                        {
                            userFavRecipes.map(recipeId =>
                                <RecipeCardItem key={recipeId} recipeId={recipeId} user={user} setUser={setUser}/>
                            )
                        }
                    </div>
                </div>
                
        
                <div>
                    <h2 className="wd-block-title">
                        They like {user.username}!
                    </h2>
                    {followers && <FollowerList followers={followers}/>}
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