import React from "react";
import userService from "../service/userService";
import {Link} from "react-router-dom";

const RecipeCardItemByObject = (paras) => {

    // dont know why I can not pass 3 parameters, react regards them as a whole.
    let recipe = paras.recipe;
    let user = paras.user;
    const setUser = paras.setUser;

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

    if (!recipe.image) {
        recipe.image = "/images/sample-recipe/thumbnail_sample.jpg";
    }

    return (
        <div className="card mx-2">
            <img src={recipe.image} className="card-img-top wd-card-img" alt="sample"/>
            <button className="btn btn-outline-primary wd-button wd-button-on-img"
                    onClick={() => likeRecipeHandler(recipe.id)}>
                <i className={heartClassName}/>
            </button>
            <Link to={`/details/${recipe.id}`}>
                <div className="card-body">
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

export default RecipeCardItemByObject;