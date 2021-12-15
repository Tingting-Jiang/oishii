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

    useEffect(() => getUser(dispatch), [history, dispatch]);

    let user = useSelector(selectProfile);
    // console.log("user in profile screen 333333333333");
    // console.log(user);

    const redirectLogin = () => {
        history.push('/login');
    }

    const getUser = (dispatch) => {
        getProfile(dispatch)
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
    }

    useEffect(() => getUser(dispatch), [history, dispatch]);

    const logoutHandler = (dispatch) => {
        logout(dispatch)
            .then(res => {
                history.push("/");
            });
    }

    // get user fav list
    let userFavRecipes = [];
    if (user && user.favRecipeList) {
        for (let i=0; i<4; i++) {
            user.favRecipeList[i] &&
            userFavRecipes.push(user.favRecipeList[i]);
        }
    }

    // get user generated list
    let userCreateRecipes = [];
    if (user && user.usersRecipe) {
        for (let i=0; i<4; i++) {
            user.usersRecipe[i] &&
            userCreateRecipes.push(user.usersRecipe[i]);
        }
    }

    console.log(userCreateRecipes);

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
                                    {/*Born some date*/}
                                    {user.dateOfBirth}
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
                        userCreateRecipes.length === 0 &&
                        <Link to="/create">
                            <div className="btn btn-outline-primary wd-button wd-button-transparent">
                                <h4>Create your first recipe</h4>
                            </div>
                        </Link>
                    }
                    <div className="card-group">
                        {
                            userCreateRecipes.map(recipeId =>
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