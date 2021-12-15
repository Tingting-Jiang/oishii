import React, {useEffect, useState} from "react";
import userService from "../../service/userService";
import {Link} from "react-router-dom";

const DBRecipeCardItem = ({recipeId, user, dispatch}) => {

    // console.log("in DB recipe CARD", recipeId);

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


    let inList = (recipeId) => {
        return user.favRecipeList.includes(recipeId);
    }


    const likeRecipeHandler1 = (recipeId, dispatch) => {
        if (!user.username || user.username === "") {
            alert("Please Login to like a recipe.")
            return;
        }

        if (inList(recipeId)) {
            console.log("to like", user.id);
            userService.unlikeRecipe(recipeId, user.id, dispatch)
                .then(status =>{
                    console.log("returned@5", status);

                })
        } else {
            console.log("to dislike", user.id);
            userService.likeRecipe(recipeId, user.id, dispatch)
                .then(status => {
                    console.log("returned@6", status);
                })
        }
    };

    // console.log("recipe in DB carditem");
    // console.log(recipe);
    // console.log(!recipe.isDeleted);
    
    return (
        <>
            {
                !recipe.isDeleted && recipe.title && recipe.sourceName === user.username &&
                <div className="card mx-2">
                    <img src={recipe.image} className="card-img-top wd-card-img" alt="sample"/>
                    <button className="btn btn-outline-primary wd-button wd-button-on-img"
                            onClick={() => likeRecipeHandler1(recipe.id, dispatch)}>
                        <i className={`fas fa-heart ${inList(recipeId) ? "wd-color-red" : ""}`}/>
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
            }

        </>


        // !recipe &&
        // <>
        // </>
    )
}

export default DBRecipeCardItem;