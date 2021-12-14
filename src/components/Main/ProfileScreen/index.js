import React, {useEffect} from 'react'
import "./profile.css";
import { getProfile, logout } from '../../service/userService';
import {useDispatch, useSelector} from 'react-redux';
import Header from "../Header";
import {Helmet} from "react-helmet";
import RecipeCardItem from "../RecipeCards/RecipeCardItem";
import {Link, useHistory} from "react-router-dom";
import FollowerList from "../FollowerList";
import DBRecipeCardItem from '../RecipeCards/DBRecipeCardItem';

const selectProfile = (profile) => profile;

const Profile = () => {

    const dispatch = useDispatch();
    const history = useHistory();
<<<<<<< HEAD

=======
>>>>>>> ce5ce2c9b4a84470637037cce30894463d73d524

    useEffect(() => getUser(dispatch), [history, dispatch]);

    let user = useSelector(selectProfile);
    // console.log("user in profile screen 333333333333");
    // console.log(user);
    

<<<<<<< HEAD
=======
    const redirectLogin = () => {
        history.push('/login');
    }

>>>>>>> ce5ce2c9b4a84470637037cce30894463d73d524
    const getUser = (dispatch) => {
        getProfile(dispatch)
            // .then(res => setUser(profile))
            .then(newUser => {
                // console.log("returned from SESSION", newUser.favRecipeList);
                console.log("returned from SESSION", newUser.usersRecipe);
                
                if (newUser.username && newUser.password) {
                    user = newUser;
                } else {
                    redirectLogin();
                }
            })
            .catch(e => redirectLogin());
        // .catch(e => console.log(e));
    }

    useEffect(() => getUser(dispatch), [history, dispatch]);
<<<<<<< HEAD
    
    const redirectLogin = () => {
        history.push('/login');
    }

   
=======
>>>>>>> ce5ce2c9b4a84470637037cce30894463d73d524

    const logoutHandler = (dispatch) => {
        logout(dispatch)
            .then(res => {
                history.push("/");
            });
    }


    let userFavRecipes = [];
    if (user && user.favRecipeList) {
        for (let i=0; i<4; i++) {
            user.favRecipeList[i] &&
            userFavRecipes.push(user.favRecipeList[i]);
        }
    }


    return (
        <>
            <Helmet>
                <title>{`${user.username || 'Profile'}`} | Oishii</title>
            </Helmet>

            <div className="container mt-2">
                <Header active="profile"/>

                <div className="wd-profile-container">
                    <img className="wd-profile-bg"
                         src="/images/profile-bg.jpg"
                         alt=""/>
                    <div className="wd-profile-info text-center flex">
                        <img className="wd-profile-img"
                             src={`${user.userAvatar || "/images/sample-user.jpeg"}`}
                             alt=""/>
                        <h5 className="wd-username">{user.username}</h5>
                        <div className="wd-username">
                            {
                                user.dateOfBirth &&
                                <span className="d-inline-block me-2">
                                <i className="fas fa-birthday-cake me-2 wd-color-coral"/>
                                    {/*<Birthdate birthdate={user.birthday}/>*/}
                                    Born some date
                                </span>
                            }
                            {
                                user.location &&
                                <span className="d-inline-block me-2">
                                <i className="fas fa-map-marker-alt me-2 wd-color-coral"/>
                                    {user.location}
                                </span>
                            }
                        </div>
                        <div className="wd-bio">
                            <p>
                                {user.bio}
                            </p>
                        </div>

                        {
                            user.username &&
                                <>
                                    <Link to="/edit-profile">
                                        <button className="btn btn-outline-primary wd-button my-2">
                                            Edit Profile
                                        </button>
                                    </Link>

                                    <button className= "btn btn-outline-danger ms-3"
                                            onClick={() => logoutHandler(dispatch)}>
                                        Log out
                                    </button>
                                </>
                        }
                        {
                            user.role === 'admin' &&
                            <Link to="/plmoknijnkdjcbdudbshxyajbf-manage-users">
                                <button className="btn btn-outline-primary ms-3">
                                    Manage Users
                                </button>
                            </Link>
                        }

                    </div>
                </div>

                <div>
                    <h2 className="wd-block-title">
                        {user.username}'s Recipes
                    </h2>
                    {
                        (!user.usersRecipe || user.usersRecipe.length === 0) &&
                        <Link to="/create">
                            <div className="btn btn-outline-primary wd-button wd-button-transparent">
                                <h4>Create your first recipe</h4>
                            </div>
                        </Link>
                    }
                    <div className="card-group">
                        {
                            user.usersRecipe && user.usersRecipe.length > 0 &&
                            user.usersRecipe.map(recipeId =>
                                <DBRecipeCardItem key={recipeId} recipeId={recipeId} user={user} dispatch={dispatch}/>
                            )
                        }
                    </div>
                </div>

                <div>
                    <h2 className="wd-block-title">
                        {user.username}'s Favorites
                    </h2>
                    <div className="card-group">
                        {
                            userFavRecipes.length === 0 &&
                            <h5 className="ms-2">Like some recipes and check them here!</h5>

                        }
                        {
                            userFavRecipes.map(recipeId =>
                                <RecipeCardItem key={recipeId} recipeId={recipeId} user={user} dispatch={dispatch}/>
                            )
                        }
                    </div>
                </div>

                <div>
                    <h2 className="wd-block-title">
                        They like {user.username}!
                    </h2>
                    <FollowerList followers={user.usersFollowers}/>
                </div>

            </div>
        </>
    )
};



export default Profile;