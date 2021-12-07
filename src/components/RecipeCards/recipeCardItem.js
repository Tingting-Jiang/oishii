import React from "react";

const recipeCardItem = (recipe, user={}) => {

    let heartClassName = "fas fa-heart";

    if (user) {
        if (user.favRecipeList.includes(recipeID)) {
            heartClassName = "fas fa-heart wd-color-red";
        }
    }

    return (
        <div className="card mx-2">
            <img src="/images/recipe-sample-img.jpeg" className="card-img-top wd-card-img" alt="sample"/>
            <button className="btn btn-outline-primary wd-button wd-button-on-img">
                <i className={heartClassName}/>
            </button>
            <div className="card-body">
                <h5 className="card-title">Jerk Chicken Wings</h5>
                <p className="card-text">for 4 servings</p>
                <p className="card-text"><small className="text-muted">Presented by Guinness</small></p>
            </div>
        </div>
    )
}

export default recipeCardItem;