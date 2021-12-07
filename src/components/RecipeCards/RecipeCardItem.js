import React, {useEffect, useState} from "react";
import {likeRecipe} from "../service/userService";

import recipeService from "../service/recipeService";

const RecipeCardItem = ({recipeId, user}) => {
    console.log("recipeId");
    console.log(recipeId);
    const [recipe, setRecipe] = useState({});
    useEffect(() => {
            recipeService.fetchByID(recipeId)
                .then((data) => {
                    setRecipe(data);
                })
        },[]
    );

    let heartClassName = "fas fa-heart";

    if (user.favRecipeList && user.favRecipeList.includes(recipeId)) {
        heartClassName = "fas fa-heart wd-color-red";
    }

    // TODO like function
    const likeRecipeHandler = () => {
        // likeRecipe(dispatch, recipe);

        // // dispatch({ type: "like-tweet", tweet });
        // console.log("recipe id-->", recipeID);
        // // console.log(user._id);
        // userService.likeRecipe(recipeID, user.username)
        //     .then(data => {
        //         console.log("back from server, recipeList -->", data);
        //         setUser({...user, favRecipeList :data});
        //     });
    };

    return (
        <div className="card mx-2">
            <img src={recipe.image} className="card-img-top wd-card-img" alt="sample"/>
            <button className="btn btn-outline-primary wd-button wd-button-on-img"
                    onClick={() => likeRecipeHandler(recipe.id)}>
                <i className={heartClassName}/>
            </button>
            <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">for {recipe.servings} servings</p>
                <p className="card-text">
                    <small className="text-muted">Presented By
                    { recipe.sourceName === null ? " A Great Anonymous Chef" : " "+ recipe.sourceName }
                    </small></p>
            </div>
        </div>
    )
}

export default RecipeCardItem;