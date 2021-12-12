import React, { useEffect, useState } from 'react'
import recipeService from '../../service/recipeService'
import oldIngredient from "../../reducers/data/newRecipe.json";
import oldInstruction from "../../reducers/data/instruction.json";
import "./recipe.css"
import "../../oishii.css"
import { useParams } from 'react-router-dom'
import userService from '../../service/userService'
import {b64toBlob,contentType} from '../../const'

const RecipeScreen = () => {
    const params = useParams();
    const recipeID = params.id || params._id;
    
    console.log("in 1st line ->", recipeID);
    const [recipe, setRecipe] = useState(oldIngredient);
    const [image, setImage] = useState(oldIngredient.image);
    
    useEffect(() => {
        if (recipeID.length < 10) {
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
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Recipes</a>
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
        <div className="wd-recipe-container d-flex">
        <div className="wd-recipe-bg">
            <img className="wd-bg"
                 src="../../images/recipe-bg.jpg"/>
        </div>
        
        <div className="wd-recipe">
            <div className="row">
                <div className="col-12 col-md-8">
                    <h6 className="wd-color-coral">Total Time: {recipe.readyInMinutes} min</h6>
                    
                    <h2 className="wd-recipe-title">
                        {recipe.title}
                    
                    <button className="btn btn-outline-primary wd-button ms-3">
                        <i className="fas fa-heart"></i>
                    </button>
                    </h2>
                    

                    <h6 className="wd-color-coral">By
                        {recipe.sourceName === null ? " A Great Anonymous Chef" : " "+ recipe.sourceName }
                    </h6>
                    {recipe.summary.split('.', 4).join(".")
                        .replaceAll("<b>","")
                        .replaceAll("</b>", "")
                       }.
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
export default RecipeScreen;