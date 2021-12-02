import React, { useEffect, useState } from 'react'
import service from '../service/service'
import oldIngredient from "../service/reducers/data/newRecipe.json";
import oldInstruction from "../service/reducers/data/instruction.json";
import "./recipe.css"

const RecipeScreen = ({recipeID}) => {
    console.log("in 1st line ->", recipeID);
    const [recipe, setRecipe] = useState(oldIngredient);
    // const [instruction, setInstruction] = useState(oldInstruction)
    // useEffect(() => {
    //     service.fetchByID(recipeID)
    //         .then((data) => setRecipe(data))
    //     },[]
    // );
    
    // useEffect(() => {
    //         service.fetchInstruction(recipeID)
    //             .then((data) => setInstruction(data))
    //     },[]
    // );
    
    
    
    return (
        <>
            {/*{JSON.stringify(recipe)}*/}
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
                    

                    <h6 className="wd-color-coral">By {recipe.sourceName}</h6>
                    {recipe.summary.split('.', 4).join(".")
                        .replaceAll("<b>","")
                        .replaceAll("</b>", "")
                       }.
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
                                        {singleIngredient.originalString}
                            </li>))}
                        </ul>
                      
                    </div>
                    <div className="col-12 col-md-7">
                        <h5 className="wd-color-coral fw-bold my-3">
                            Preparation
                        </h5>
                        <ol>
                            {recipe.analyzedInstructions[0].steps.map(data => (
                                <li>
                                    {data.step}
                                </li>
                            ))}
                            
                        </ol>
                    </div>
                </div>
            </div>
        
        </div>
    
    
    </div>
        </>
    )
    };
export default RecipeScreen;