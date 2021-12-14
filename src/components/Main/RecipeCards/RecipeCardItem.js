import React, {useEffect, useState} from "react";

import recipeService from "../../service/recipeService";
import userService from "../../service/userService";
import {Link} from "react-router-dom";

const RecipeCardItem = ({recipeId, user, dispatch}) => {

    // console.log("in normal recipe CARD", recipeId);

    const [recipe, setRecipe] = useState({});
    const dbRecipe = recipeId > 10000000;

    
    useEffect(() => {
            if (!dbRecipe) {
                recipeService.fetchByID(recipeId)
                    .then((data) => {
                        setRecipe(data);
                    })
            } else {
                userService.getRecipe(recipeId)
                    .then((data) => {
                        // console.log(" back ", data);
                        setRecipe(data);
                    })
            }
        },
        []
    );

    if (!recipe.image) {
        recipe.image = "/images/sample-recipe/thumbnail_sample.jpg";
    }


    let inList = (recipeId) => {
        return user.favRecipeList.includes(recipeId);
    }

    
    const likeRecipeHandler1 = (recipeId, dispatch) => {
        if (!user.username || user.username === "") {
            alert("Please Login to like a recipe.")
            return;
        }

        if (inList(recipeId)) {
            userService.unlikeRecipe(recipeId, user.id, dispatch)
                .then(status => {
                    console.log("returned@1", status);
                })
        } else {
            userService.likeRecipe(recipeId, user.id, dispatch)
                .then(status => {
                    console.log("returned@2", status);
                })
        }
    };

    // console.log("recipe in carditem");
    // console.log(recipe);

    return (
        !recipe.isDeleted &&
        <div className="card mx-2">
            <img src={recipe.image} className="card-img-top wd-card-img" alt="sample"/>
            <button className="btn btn-outline-primary wd-button wd-button-on-img"
                    onClick={() => likeRecipeHandler1(recipe.id, dispatch)}>

                <i className={`fas fa-heart ${inList(recipe.id) ? "wd-color-red" : ""}`}/>
            </button>
            <Link to={`/details/${recipe.id}`}>
                <div className="card-body">
                    {/*<h5 className="card-title">{recipe.id}</h5>*/}
                    <h5 className="card-title">{recipe.title}</h5>
                    <p className="card-text">for {recipe.servings} servings</p>
                    <p className="card-text">
                        <small className="text-muted">Presented By
                            { recipe.sourceName === null ? " A Great Anonymous Chef" : " "+ recipe.sourceName }
                        </small></p>
                </div>
            </Link>

        </div>
    )
}

export default RecipeCardItem;