import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory, useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
// useParams from react-router does not work
import "./profile.css";
import userService, {getUserById, getProfile} from '../../service/userService';
import Header from "../Header";
import RecipeCardItem from "../RecipeCards/RecipeCardItem";
import FollowerList from "../FollowerList";
import DBRecipeCardItem from '../RecipeCards/DBRecipeCardItem';

const selectProfile = (profile) => profile;


const VisitProfile = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const profileVisited = Number(params.id);
    
    const getUser = (dispatch) => {
        getProfile(dispatch)
            .then(newUser => {
                if (newUser.id === profileVisited) {
                    redirectProfile();
                }
            })
            .catch(e => console.log(e));
    }

    // initialize isFav const
    const [isFav, setFav] = useState(true);

    // user logged in => profile
    useEffect(() => getUser(dispatch), [history, dispatch]);
    let profile = useSelector(selectProfile);

    const redirectProfile = () => {
        history.push('/profile');
    }

    console.log("user logged in");
    console.log(profile);


    // user being visited => user
    const [user, setUser] = useState({
        username: "",
        email: "",
        favRecipeList: [],
        usersRecipe: [],
        usersFollowers: [],
        userAvatar: "/images/sample-user.jpeg",
        location: "",
        dateOfBirth: "",
        bio: "",
        role: "normal",
        id: -1,
    });

    console.log("user being visited");
    console.log(user);

    useEffect(() => {
        getUserById(profileVisited)
            .then(data => {
                // console.log("profile Visited", data);
                setUser(data);
                setFav(user.usersFollowers.includes(profile.id));
                // console.log("user.usersFollowers.includes(profile.id)");
                // console.log(user.usersFollowers);
                // console.log(profile.id);
                // console.log(user.usersFollowers.includes(profile.id));
                // console.log("isFav in get user");
                // console.log(isFav);
            })
            .catch(e => history.push('/profile'))
    }, [history, profileVisited, isFav]);

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
    
    // check if profile like visited user
    // console.log("isFav");
    // console.log(isFav);

    // profile favs user, user followers +1
    const likeUserHandler = () => {
        if (!profile.username || !profile.id ) {
            alert("Please log in to fav a user.");
            return;
        }
        if (!isFav) {
            console.log("to like")
            userService.likeUser(profile.id, user.id)
                .then(res => {
                    user.usersFollowers = [profile.id, ...user.usersFollowers]
                    setUser(user)
                    setFav(!isFav)
                    console.log(user.username, " is liked by ", profile.username);
                })
        } else {
            console.log("to unlike")
            userService.unLikeUser(profile.id, user.id)
                .then(res => {
                    user.usersFollowers = user.usersFollowers.filter(
                        followerID => followerID !== profile.id)
                    setUser(user)
                    setFav(!isFav);
                    console.log(user.username, " is unliked by ", profile.username);
                })
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
                                    {/*{user.dateOfBirth}*/}
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

                        <button className="btn btn-outline-primary wd-button my-2" onClick={likeUserHandler}>
                            Like <i className={`fas fa-heart ${isFav ? "wd-color-red" : ""}`}/>
                        </button>

                    </div>
                </div>

                <div>
                    <h2 className="wd-block-title">
                        {user.username}'s Recipes
                    </h2>
                    {
                        userCreateRecipes.length === 0 &&
                        <div className="btn btn-outline-primary wd-button wd-button-transparent">
                            <h4>Oops, no recipes now.</h4>
                        </div>
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
                    <FollowerList followers={user.usersFollowers} profile={profile}/>
                </div>
            </div>
        </>
    )
};

export default VisitProfile;