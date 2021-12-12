import React, {useEffect, useState} from "react";
import userService from "../service/userService";
import {Link} from "react-router-dom";

const DBRecipeCardItem = (paras) => {
    let recipeId = paras.recipeId;
    let user = paras.user;
    const setUser = paras.setUser;
    console.log("in DB recipe CARD", recipeId);
    
    
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
            userService.getRecipe(recipeId)
                .then((data) => {
                    setRecipe(data);
                    // console.log("returned data in DB card", data);
                    // console.log(typeof data.image);
                })
        },[]
    );
    
    let heartClassName = "fas fa-heart";
    
    // if (user.favRecipeList && user.favRecipeList.includes(recipeId)) {
    //     heartClassName = "fas fa-heart wd-color-red";
    // }
    
    // if (inList) {
    //     heartClassName = "fas fa-heart wd-color-red";
    // }
    const setHeart = () =>{
        if (inList)
            return "fas fa-heart wd-color-red";
        else
            return "fas fa-heart";
         
        
    }
    
    const[recipeList, setRecipeList]  = useState(user.favRecipeList);
    const [inList, setInList]= useState(recipeList.includes(recipeId));
    
    const likeRecipeHandler1 = (recipeId) => {
        if (user === undefined) {
            alert("Please Login to like a recipe.")
            return;
        }
        const idx = user.favRecipeList.indexOf(recipeId);
        if (idx !== -1) {
            userService.unlikeRecipe(recipeId, user.username)
                .then(status =>{
                    setRecipeList(recipeList.splice(idx, 1));
                    setInList(false);
                    user.favRecipeList = [user.favRecipeList.splice(idx, 1)];
                })
        } else if (idx === -1) {
           
            userService.likeRecipe(recipeId, user.username)
                .then(status =>{
                    setRecipeList([recipeId, ...recipeList]);
                    setInList(true);
                    user.favRecipeList = [recipeId, ...user.favRecipeList];
                })
        }
        
    };
    
    
    
    
    
    
    // if (!recipe.image) {
    //     recipe.image = "/images/sample-recipe/thumbnail_sample.jpg";
    // }
    
    const defaultImage = "/images/sample-recipe/thumbnail_sample.jpg";
    
    // console.log("in like");
    // console.log(user.favRecipeList);
    
    return (
        <div className="card mx-2">
            <img src={recipe.image} className="card-img-top wd-card-img" alt="sample"/>
            <button className="btn btn-outline-primary wd-button wd-button-on-img"
                    onClick={() => likeRecipeHandler1(recipe.id)}>
                <i className={`fas fa-heart ${inList ? "wd-color-red" : ""}`}/>
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

export default DBRecipeCardItem;