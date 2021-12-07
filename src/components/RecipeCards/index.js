import React, {useEffect, useState} from "react";
import "./recipeCards.css"
import userService from "../service/userService";
import recipeService from '../service/recipeService';

const RecipeCards = (
    {type = "userFavorites"}
) => {

    const [user, setUser] = useState({});
    const [recipeList, setRecipeList] = useState([]);

    useEffect(() =>{
        userService.getProfile()
            .then(user => {
                console.log("recipeCards is setting user -->", user);
                setUser(user)
            });
    }, [])

    useEffect(() =>
        recipeService.fetchTrending()
            .then(data =>{
                setRecipeList(data.recipes);
            }), []);

    // card list title
    let blockTitle = "";
    switch (type) {
        case "userFavorites":
            blockTitle = "Your Favorites";
            break;
        case "latest":
            blockTitle = "Explore Latest";
            break;
        case "trending":
            blockTitle = "Trending Recipes";
            break;
        default:
            break;
    }

    return (
        <div>
            <h2 className="wd-block-title">
                {blockTitle}
            </h2>
            <div className="card-group">
                <div className="card mx-2">
                    <img src="/images/recipe-sample-img.jpeg" className="card-img-top wd-card-img" alt="sample"/>
                        <button className="btn btn-outline-primary wd-button wd-button-on-img">
                            <i className="fas fa-heart wd-color-red"/>
                        </button>
                        <div className="card-body">
                            <h5 className="card-title">Jerk Chicken Wings</h5>
                            <p className="card-text">for 4 servings</p>
                            <p className="card-text"><small className="text-muted">Presented by Guinness</small></p>
                        </div>
                </div>
                <div className="card mx-2">
                    <img src="/images/recipe-sample-img2.jpeg" className="card-img-top wd-card-img" alt="sample2"/>
                        <button className="btn btn-outline-primary wd-button wd-button-on-img">
                            <i className="fas fa-heart wd-color-red"/>
                        </button>
                        <div className="card-body">
                            <h5 className="card-title">Roasted Garlic Parmesan Brussels Sprouts</h5>
                            <p className="card-text">for 4 servings</p>
                            <p className="card-text"><small className="text-muted">Robin Broadfoot Tasty Team</small>
                            </p>
                        </div>
                </div>
                <div className="card mx-2">
                    <img src="/images/recipe-sample-img.jpeg" className="card-img-top wd-card-img" alt="sample"/>
                        <button className="btn btn-outline-primary wd-button wd-button-on-img">
                            <i className="fas fa-heart wd-color-red"/>
                        </button>
                        <div className="card-body">
                            <h5 className="card-title">Jerk Chicken Wings</h5>
                            <p className="card-text">for 4 servings</p>
                            <p className="card-text"><small className="text-muted">Presented by Guinness</small></p>
                        </div>
                </div>
                <div className="card mx-2">
                    <img src="/images/recipe-sample-img3.jpeg" className="card-img-top wd-card-img" alt="sample3"/>
                        <button className="btn btn-outline-primary wd-button wd-button-on-img">
                            <i className="fas fa-heart wd-color-red"/>
                        </button>
                        <div className="card-body">
                            <h5 className="card-title">Brie, Bacon, And Cranberry Mini Pies</h5>
                            <p className="card-text">for 12 servings</p>
                            <p className="card-text"><small className="text-muted">Matthew Cullum Tasty Team</small></p>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeCards;