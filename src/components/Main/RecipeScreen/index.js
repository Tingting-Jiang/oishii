import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Helmet} from "react-helmet";
import "./recipe.css";

import userService, {getProfile} from '../../service/userService';
import recipeService from '../../service/recipeService';
import oldIngredient from "../../reducers/data/newRecipe.json";
import Header from "../Header";
import FollowerList from "../FollowerList";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom'

const selectProfile = (profile) => profile;

const RecipeScreen = () => {
    const params = useParams();
    const recipeID = parseInt(params.id);
    // console.log("check type -----@@", typeof recipeID);
    const history = useHistory();
    
    
    
    const dispatch = useDispatch();
    const user = useSelector(selectProfile);
    useEffect(() => getProfile(dispatch), [dispatch]);

    // console.log("in 1st line ->", recipeID);
    // console.log("profile in detail screen ->", user.favRecipeList);
    
    const [recipe, setRecipe] = useState(oldIngredient);
    

    // const [followers, setFollowers] = useState([]);
    const dbRecipe = recipeID > 1000000000;
    


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

  
    const[followers, setFollowers] = useState([]);

    let inList = (recipeId) => {
        return user.favRecipeList.includes(recipeId);
    }
    

    const likeRecipeHandler = (recipeId, dispatch) => {
        if (!user.username || user.username === "") {
            alert("Please Login to like a recipe.")
            return;
        }

        if (inList(recipeId)) {
            userService.unlikeRecipe(recipeId, user.id, dispatch)
                .then(status => {
                    // console.log("returned@1", status);
                    // console.log(user.id, " unfavs ", recipeId)
                    setFollowers(followers.filter(follower => follower !== user.id))
                })
        } else {
            userService.likeRecipe(recipeId, user.id, dispatch)
                .then(status => {
                    // console.log("returned@2", status);
                    // console.log(user.id, " favs ", recipeId)
                    setFollowers([...followers, user.id]);
                })
        }
    };

    // console.log(" followers list =====", followers);

    useEffect(() =>{
        // console.log("send -----", recipeID);
        userService.getRecipeFollowers(recipeID)
            .then(data => {
                // console.log(" followers back ", data);
                setFollowers(data);

            }).catch(e => {
                if (e.status === 200)
                    console.log("ERROR----------- followers, NO followers");
        })},
        []
    );

    const [selectedMenu, setSelectedMenu] = useState(-1);

    const addToMenu = (menuId, recipeID) =>{
        if (menuId < 1) {
            return;
        }

        // console.log(`add ${recipeID} to ${menuId}`)
        userService.addToMenu(menuId, recipeID)
            .then(status =>{
                alert("Successfully added to Menu");
            })
    }
    
    
    const deleteRecipe = () =>{
        userService.deleteRecipe(recipe.id, recipe.sourceName)
            .then(data =>{
                console.log("back from delete recipe")
                alert("Recipe Deleted");
                history.push("/");
            })
    }

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
                                {
                                    user && user.username && user.role === 'editor' &&
                                    <div className="d-flex mb-2">
                                        <select name="" className="form-select form-select-sm" aria-label="menu select"
                                                onChange={(e) => setSelectedMenu(e.target.value)}>
                                            <option selected>Add this recipe to a selected Menu</option>
                                            <option value="1">Main</option>
                                            <option value="2">Salad</option>
                                            <option value="3">Dessert</option>
                                            <option value="4">Pizza</option>
                                            <option value="5">Vegan</option>
                                        </select>

                                        <button className="btn btn-sm btn-outline-primary wd-button ms-2" onClick={() => addToMenu(selectedMenu, recipeID)}>
                                            Add
                                        </button>
                                    </div>
                                }


                                <h6 className="wd-color-coral">Total Time: {recipe.readyInMinutes} min</h6>

                                {/*</ul>*/}

                                <h2 className="wd-recipe-title d-flex align-items-center">
                                    {recipe.title}

                                    <button onClick={() => likeRecipeHandler(recipe.id, dispatch)}
                                            className="btn btn-outline-primary wd-button ms-3">
                                        <i className={`fas fa-heart ${inList(recipe.id) ? "wd-color-red" : ""}`}/>
                                    </button>
                                    {
                                        user && user.username && user.role === 'editor' && dbRecipe &&
                                        <button className="btn btn-outline-danger ms-2"
                                                onClick={deleteRecipe}>Delete</button>
                                    }
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

                                        { recipe.extendedIngredients.length === 0 ?
                                                "Ha... Seems the chef forget to add ingredients list ":(
                                                    recipe.extendedIngredients.map(singleIngredient => (
                                            <li className="list-group-item"
                                            key={singleIngredient.id}>
                                                {singleIngredient.original}
                                            </li>)))}
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
                                                <li key={data.step}>
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