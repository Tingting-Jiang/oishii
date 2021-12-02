import React, { useEffect, useState } from 'react'
import service from '../service/service'
import oldIngredient from "../service/reducers/data/newRecipe.json.json";
import oldInstruction from "../service/reducers/data/instruction.json";
import "./recipe.css"

const RecipeScreen = ({recipeID}) => {
    console.log("in 1st line ->", recipeID);
    const [ingredient, setIngredient] = useState(oldIngredient);
    const [instruction, setInstruction] = useState(oldInstruction)
    useEffect(() => {
        service.fetchByID(recipeID)
            .then((data) => setIngredient(data))
        },[]
    );
    
    useEffect(() => {
            service.fetchInstruction(recipeID)
                .then((data) => setInstruction(data))
        },[]
    );
    
    
    
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
                    <h6 className="wd-color-coral">Total Time: {recipe.total_time_minutes} min</h6>
                    <h2 className="wd-recipe-title">
                        {recipe.name}
                    </h2>
                    <h6 className="wd-color-coral">By {recipe.credits[0].name}</h6>
                    <p>{recipe.description}</p>
                </div>
                <div className="d-none d-md-block col-4">
                    <div>
                        <img className="wd-recipe-thumbnail d-md-float-end"
                             src={recipe.thumbnail_url}/>
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
                            <li className="list-group-item">
                                {recipe.sections.map(singleIngredient => (
                                    <div className="d-flex align-items-center py-1">
                                        <i className="fas fa-chevron-circle-right wd-color-coral align-self-center pe-2"></i>
                                        <span className="align-self-center fw-bold">
                                            {singleIngredient.name}
                                        </span>
                                        <ul className="list-group">
                                            {singleIngredient.components.map(item => (
                                            <li className="list-group-item ps-4">
                                                {item.raw_text}
                                            </li>
                                        ))}
                                        </ul>
                                    </div>
                                ))}
                            </li>
                        </ul>
                        
                        
                      
                    </div>
                    <div className="col-12 col-md-7">
                        <h5 className="wd-color-coral fw-bold my-3">
                            Preparation
                        </h5>
                        <ol>
                            {recipe.instructions.map(data => (
                                <li>
                                    {data.display_text}
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