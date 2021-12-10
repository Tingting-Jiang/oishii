import React, { useEffect, useState } from 'react'
import "./profile.css";
import { useNavigate } from 'react-router';
import userService from '../service/userService';
import { useDispatch, useSelector } from 'react-redux';
import Header from "../Header";
import {Helmet} from "react-helmet";
import RecipeCardItem from "../RecipeCards/RecipeCardItem";
import {Link} from "react-router-dom";
import FollowerList from "../FollowerList";


const Profile = () => {
    // const userReducer = useSelector(state => state.user);
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getProfile = () =>
        userService.getProfile()
            .then(newUser => {
                setUser(newUser);
            })
            .catch(e => navigate('/login'));

    const logout = () =>{
        userService.logout()
            .then(res => navigate("/"));
    };

    useEffect(getProfile, [navigate]);

    let userFavRecipes = [];
    if (user.favRecipeList) {
        for (let i=0; i<4; i++) {
            user.favRecipeList[i] &&
            userFavRecipes.push(user.favRecipeList[i]);
        }
    }

    console.log(user);

    console.log("userFavRecipes");
    console.log(userFavRecipes);

    console.log(user.userAvatar);

    return (
        <>
            <Helmet>
                <title>{`${user.username}`} | Oishii</title>
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
                                user.birthday &&
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
                                    <button className="btn btn-outline-primary wd-button my-2">
                                        Edit Profile
                                    </button>
                                    <button className= "btn btn-outline-danger ms-3"
                                            onClick={logout}>
                                        Log out
                                    </button>
                                </>
                        }
                        {
                            !user.username &&
                            <>
                                <button className="btn btn-outline-primary wd-button my-2">
                                    Like <i className="fas fa-heart"/>
                                </button>
                            </>
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
                                <RecipeCardItem key={recipeId} recipeId={recipeId} user={user} setUser={setUser}/>
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
                            <h5>Like some recipes and check them here!</h5>

                        }
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
                    <FollowerList followers={user.usersFollowers}/>
                </div>

            </div>
        </>
    )
};
export default Profile;