import React from "react";
import userService from "../../service/userService";
import {Link} from "react-router-dom";

const RecipeCardItemByObject = ({recipe, user, dispatch}) => {

    // console.log("In Recipe Card Object", recipe.id);

    const inList = (recipe) => {
        return user.favRecipeList.includes(recipe.id);
    }
    

    const likeRecipeHandler1 = (recipeId, dispatch) => {
        if (!user.username || user.username === "") {
            alert("Please Login to like a recipe.")
            return;
        }

        if (inList(recipe)) {
            userService.unlikeRecipe(recipeId, user.id, dispatch)
                .then(status =>{
                    // console.log("returned@3", status);
                })
        } else {
            userService.likeRecipe(recipeId, user.id, dispatch)
                .then(status => {
                    // console.log("recipeId in Object Cards");
                    // console.log(recipeId);
                    // console.log("returned@4", status);
                })
        }
    };

    if (!recipe.image) {
        recipe.image = "/images/sample-recipe/thumbnail_sample.jpg";
    }

    // console.log("recipe in carditem by OBJECT");
    // console.log(recipe);

    return (
        !recipe.isDeleted &&
        <div className="card mx-2">
            <img src={recipe.image} className="card-img-top wd-card-img" alt="sample"/>
            <button className="btn btn-outline-primary wd-button wd-button-on-img"
                    onClick={() => likeRecipeHandler1(recipe.id, dispatch)}>
                <i className={`fas fa-heart ${inList(recipe) ? "wd-color-red" : ""}`}/>
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

export default RecipeCardItemByObject;