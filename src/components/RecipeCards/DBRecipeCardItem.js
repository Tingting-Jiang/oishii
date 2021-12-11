import React, {useEffect, useState} from "react";
import userService from "../service/userService";
import {Link} from "react-router-dom";
import { b64toBlob, contentType } from '../const'

const DBRecipeCardItem = (paras) => {
    let recipeId = paras.recipeId;
    let user = paras.user;
    const setUser = paras.setUser;
    
    const [recipe, setRecipe] = useState({});
    useEffect(() => {
            userService.getRecipe(recipeId)
                .then((data) => {
                    data.image = URL.createObjectURL(b64toBlob(data.image, contentType))
                    setRecipe(data);
                })
        },[]
    );
    
    let heartClassName = "fas fa-heart";
    
    if (user.favRecipeList && user.favRecipeList.includes(recipeId)) {
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
    
    const likeRecipeHandler1 = (recipeId) => {
        if (user === undefined) {
            alert("Please Login to like a recipe.")
            return;
        }
        const idx = user.favRecipeList.indexOf(recipeId);
        if (idx !== -1) {
            userService.unlikeRecipe(recipeId, user.username)
                .then(status =>{
                    user.favRecipeList.splice(idx, 1);
                })
        } else if (idx === -1) {
            userService.likeRecipe(recipeId, user.username)
                .then(status =>{
                    user.favRecipeList = [recipeId, ...user.favRecipeList];
                })
        }
        
    };
    
    if (!recipe.image) {
        recipe.image = "/images/sample-recipe/thumbnail_sample.jpg";
    }
    
    // console.log("in like");
    // console.log(user.favRecipeList);
    
    return (
        <div className="card mx-2">
            <img src={recipe.image} className="card-img-top wd-card-img" alt="sample"/>
            <button className="btn btn-outline-primary wd-button wd-button-on-img"
                    onClick={() => likeRecipeHandler1(recipe._id)}>
                <i className={heartClassName}/>
            </button>
            <Link to={`/details/${recipe._id}`}>
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

export default DBRecipeCardItem;