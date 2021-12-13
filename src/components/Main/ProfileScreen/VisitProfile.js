import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory, useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
// useParams from react-router does not work
import "./profile.css";
import {getUserById, getProfile} from '../../service/userService';
import Header from "../Header";
import RecipeCardItem from "../RecipeCards/RecipeCardItem";
import FollowerList from "../FollowerList";
import DBRecipeCardItem from '../RecipeCards/DBRecipeCardItem'

const selectProfile = (profile) => profile;

const VisitProfile = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const profileVisited = params.id;

    // http://localhost:3000/profile/4
    console.log("profileVisited");
    console.log(profileVisited);

    useEffect(() => getUser(dispatch), [history, dispatch]);

    let profile = useSelector(selectProfile);

    const redirectProfile = () => {
        history.push('/profile');
    }

    console.log("user logged in");
    console.log(profile);


    const getUser = (dispatch) => {
        getProfile(dispatch)
            // .then(res => setUser(profile))
            .then(newUser => {
                console.log("returned from SESSION", newUser.id);
                if (newUser.id === profileVisited) {
                    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@")
                    redirectProfile();
                }
            })
        .catch(e => console.log(e));
    }

    // user being visited
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
    });

    console.log("user being visited");
    console.log(user);

    useEffect(() =>{
        getUserById(Number(profileVisited))
            .then(data => {
                console.log("profile Visited", data);
                setUser(data);
            })
            .catch(e => history.push('/profile'))
    }, []);


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

                        <button className="btn btn-outline-primary wd-button my-2">
                            Like <i className="fas fa-heart"/>
                        </button>

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

// const VisitProfile = () => {
//     const params = useParams();
//     const profileVisited = params.id;
//
//     console.log("profileVisited");
//     console.log(profileVisited);
//
//     return (
//         <h1>Visiting</h1>
//     )
// }


export default VisitProfile;