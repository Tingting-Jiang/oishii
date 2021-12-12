import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Helmet} from "react-helmet";

import "./recipe.css";

import userService, {getProfile} from '../../service/userService';
import recipeService from '../../service/recipeService';
// TODO: fake loading recipe
import oldIngredient from "../../reducers/data/newRecipe.json";
import Header from "../Header";
import FollowerList from "../FollowerList";
import {useDispatch, useSelector} from "react-redux";

const selectProfile = (profile) => profile;

const RecipeScreen = () => {
    const params = useParams();
    const recipeID = params.id;

    const dispatch = useDispatch();
    const user = useSelector(selectProfile);
    useEffect(() => getProfile(dispatch), [dispatch]);

    // console.log("in 1st line ->", recipeID);
    // console.log("profile in detail screen ->", user.favRecipeList);
    
    const [recipe, setRecipe] = useState(oldIngredient);

    // const [followers, setFollowers] = useState([]);
    const dbRecipe = recipeID.length > 10;


    useEffect(() => {
            if (!dbRecipe) {
                recipeService.fetchByID(recipeID)
                    .then((data) => {
                        setRecipe(data);
                        // console.log("in recipe API", data)
                    })
            } else {
                userService.getRecipe(recipeID)
                    .then((data) => {
                        // console.log(" back from DB ", data);
                        setRecipe(data);
                    })
            }
        },
        []
    );

    // get user session
    // const [user, setUser] = useState({});
    const [error, setError] = useState(false);


    let inList = (recipeId) => {
        return user.favRecipeList.includes(recipeId);
    }


    const likeRecipeHandler = (recipeId, dispatch) => {
        if (!user.username || user.username === "") {
            alert("Please Login to like a recipe.")
            return;
        }

        if (inList(recipeId)) {
            userService.unlikeRecipe(recipeId, user.username, dispatch)
                .then(status =>{
                    console.log("returned@1", status);

                })
        } else {
            userService.likeRecipe(recipeId, user.username, dispatch)
                .then(status => {
                    console.log("returned@2", status);
                })
        }
    };

    const[followers, setFollowers] = useState(["TT12"]);
    useEffect(() =>
        // console.log("send -----", recipeID);
        userService.getRecipeFollowers(recipeID)
            .then(data => {
                console.log(" followers back ", data);
                setFollowers(data);
            }) .catch(e => {
            console.log("ERROR----------- followers", e.status);
            setError(true);
        }),
        []
    );

    // const followers =["TT12", "kk"];

    return (
        <>
            <Helmet>
                <title>{recipe.title} | Oishii</title>
            </Helmet>
            <div className="container mt-2">
                <Header active="search"/>
                <div className="wd-recipe-container d-flex">
                    <div className="wd-recipe-bg">
                        <img className="wd-bg"
                             src="/images/recipe-bg.jpg"
                             alt=""/>
                    </div>

                    <div className="wd-recipe">
                        <div className="row">
                            <div className="col-12 col-md-8">
                                <h6 className="wd-color-coral">Total Time: {recipe.readyInMinutes} min</h6>

                                <h2 className="wd-recipe-title d-flex align-items-center">
                                    {recipe.title}

                                    <button onClick={() => likeRecipeHandler(recipe.id, dispatch)}
                                            className="btn btn-outline-primary wd-button ms-3">
                                        <i className={`fas fa-heart ${inList(recipe.id) ? "wd-color-red" : ""}`}/>
                                    </button>
                                </h2>

                                <h6 className="wd-color-coral">
                                    By
                                    {recipe.sourceName === null ? " A Great Anonymous Chef" : " "+ recipe.sourceName }
                                </h6>
                                <div className="wd-recipe-intro">
                                    <p>
                                        {recipe.summary.split('.', 4).join(".")
                                            .replaceAll("<b>","")
                                            .replaceAll("</b>", "")
                                        }.
                                    </p>
                                </div>
                            </div>

                            <div className="d-none d-md-block col-4">
                                <div>
                                    <img className="wd-recipe-thumbnail d-md-float-end"
                                         src={recipe.image}/>
                                </div>
                            </div>
                        </div>
                        <div className="wd-recipe-detail-container">
                            <div className="wd-recipe-detail row">
                                <div className="col-12 col-md-5">
                                    <h5 className="wd-color-coral fw-bold my-3">
                                        Ingredients
                                    </h5>
                                    <ul className="list-group">

                                        {recipe.extendedIngredients.map(singleIngredient => (
                                            <li className="list-group-item">
                                                {singleIngredient.original}
                                            </li>))}
                                    </ul>
                                </div>
                                <div className="col-12 col-md-7">
                                    <h5 className="wd-color-coral fw-bold my-3">
                                        Preparation
                                    </h5>

                                    <ol>
                                        {recipe.analyzedInstructions.length === 0 ?
                                            "Oops... The recipe seems get lost, try another key word ":
                                            (recipe.analyzedInstructions[0].steps.map(data => (
                                                <li>
                                                    {data.step}
                                                </li>)
                                            ))}

                                        {recipe.analyzedInstructions.length === 0 ? "" :<li>Enjoy!</li>}

                                    </ol>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div>
                    <h5 className="wd-color-coral fw-bold my-3">
                        See Who Likes This Recipe
                    </h5>
                    {/*<h4>followers</h4>{JSON.stringify(followers)}*/}

                    <FollowerList followers={followers}/>

                </div>
            </div>
        </>
    )
};
export default RecipeScreen;