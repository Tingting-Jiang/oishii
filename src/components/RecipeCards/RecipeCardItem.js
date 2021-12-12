import React, {useEffect, useState} from "react";

import recipeService from "../service/recipeService";
import userService from "../service/userService";
import {Link} from "react-router-dom";

const RecipeCardItem = (paras) => {
    let recipeId = paras.recipeId;
    let user = paras.user;
    const setUser = paras.setUser;
    console.log("in normal recipe CARD", recipeId);

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
                        console.log(" back ", data);
                        setRecipe(data);
                    })
            }
        },
        []
    );
    
    
    
    
    
    
    // useEffect(() => {
    //         recipeService.fetchByID(recipeId)
    //             .then((data) => {
    //                 setRecipe(data);
    //             })
    //     },[]
    // );

    let heartClassName = "fas fa-heart";

    if (user.favRecipeList && user.favRecipeList.includes(recipeId)) {
        heartClassName = "fas fa-heart wd-color-red";
    }

    // const likeRecipeHandler = (recipeId) => {
    //     if (user.username) {
    //         userService.likeRecipe(recipeId, user.username)
    //             .then(data => {
    //                 // console.log("back from server, recipeList -->", data);
    //                 setUser({...user, favRecipeList: data});
    //             });
    //     } else {
    //         alert("Please Login to like a recipe.")
    //     }
    // };

    if (!recipe.image) {
        recipe.image = "/images/sample-recipe/thumbnail_sample.jpg";
    }
    
    const[recipeList, setRecipeList]  = useState(user.favRecipeList);
    const [inList, setInList]= useState(recipeList.includes(recipeId));
    
    const likeRecipeHandler1 = (recipeId) => {
        console.log("WHY ARE YOU NOT BEING CALLED");
        if (user === undefined) {
            alert("Please Login to like a recipe.")
            return;
        }
        const idx = user.favRecipeList.indexOf(recipeId);
        if (idx !== -1) {
            console.log("@1")
            userService.unlikeRecipe(recipeId, user.username)
                .then(status =>{
                    console.log("returned@1", status);
                    setRecipeList(recipeList.splice(idx, 1));
                    setInList(false);
                })
        } else if (idx === -1) {
            console.log("@2")
            userService.likeRecipe(recipeId, user.username)
                .then(status =>{
                    console.log("returned@2", status);
                    setRecipeList([recipeId, ...recipeList]);
                    setInList(true);
                })
        }
        
    };
    
    


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

export default RecipeCardItem;