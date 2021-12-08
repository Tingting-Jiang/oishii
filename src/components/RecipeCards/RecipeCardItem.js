import React, {useEffect, useState} from "react";

import recipeService from "../service/recipeService";
import userService from "../service/userService";

const RecipeCardItem = (paras) => {
    let recipeId = paras.recipeId;
    let user = paras.user;
    const setUser = paras.setUser;

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
        if (user.username) {
            userService.likeRecipe(recipeId, user.username)
                .then(data => {
                    // console.log("back from server, recipeList -->", data);
                    setUser({...user, favRecipeList: data});
                });
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