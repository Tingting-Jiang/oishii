import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Helmet} from "react-helmet";
import {b64toBlob, contentType} from '../const'

import "./recipe.css";

import userService from '../service/userService';
import recipeService from '../service/recipeService';
// TODO: fake loading recipe
import oldIngredient from "../reducers/data/newRecipe.json";
import Header from "../Header";
import FollowerList from "../FollowerList";


const RecipeScreen = () => {
    const params = useParams();
    const recipeID = params.id;

    console.log("in 1st line ->", recipeID);
    const [recipe, setRecipe] = useState(oldIngredient);
    const [image, setImage] = useState(oldIngredient.image);
    // const [followers, setFollowers] = useState([]);
    const dbRecipe = recipeID.length > 10;
    

    useEffect(() => {
            if (!dbRecipe) {
                recipeService.fetchByID(recipeID)
                    .then((data) => {
                        setRecipe(data);
                        setImage(data.image);

                    })
            } else {
                userService.getRecipe(recipeID)
                    .then((data) => {
                        console.log(" back ", data);
                        setImage(URL.createObjectURL(b64toBlob(data.image, contentType)));
                        setRecipe(data);
                    })
            }
        },
        []
    );

    // get user session
    const [user, setUser] = useState({});
    useEffect(() =>{
        userService.getProfile()
            .then(user => {
                setUser(user)
            });
    }, [])

    let heartClassName = "fas fa-heart";

    if (user.favRecipeList && user.favRecipeList.includes(recipe.id)) {
        heartClassName = "fas fa-heart wd-color-red";
    }

    const likeRecipeHandler = (recipeId) => {
        if (user.username) {
            userService.likeRecipe(recipeId, user.username)
                .then(data => {
                    // console.log("back from server, recipeList -->", data);
                    setUser({...user, favRecipeList: data});
                });
        } else {
            alert("Please Login to like a recipe.")
        }
    };
    
    
    // useEffect(() => {
    //     userService.getRecipeFollowers(recipeID)
    //         .then((data) => {
    //             console.log(" back ", data);
    //             for (let item of data) {
    //                 item.userAvatar = URL.createObjectURL(b64toBlob(item.userAvatar, contentType));
    //             }
    //             setFollowers(data);
    //         })
    //     },
    //     []
    // );

    // for test
    const followers = [
        {
            "username": "Alice",
            "userAvatar": "/images/sample-user.jpeg",
            "_id": 123
        },
        {
            "username": "Bob",
            "userAvatar": "/images/sample-user2.png",
            "_id": 124
        },
    ]

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

                                    <button onClick={() => likeRecipeHandler(recipe.id)}
                                            className="btn btn-outline-primary wd-button ms-3">
                                        <i className={heartClassName}/>
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
                                         src={image}/>
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

                    {/*TODO: input should be a list of users following this recipe*/}
                    <FollowerList followers={followers}/>

                </div>
            </div>
        </>
    )
};
export default RecipeScreen;