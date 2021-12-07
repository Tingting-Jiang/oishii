import React, {useEffect, useState} from "react";
import "./recipeCards.css"
import userService from "../service/userService";
import recipeService from '../service/recipeService';
import RecipeCardItem from './RecipeCardItem';
import RecipeCardItemByObject from "./RecipeCardItemByObject";

const RecipeCards = () => {

    const [user, setUser] = useState({});
    const [trendingList, setTrendingList] = useState([]);

    useEffect(() =>{
        userService.getProfile()
            .then(user => {
                // console.log("recipeCards is setting user -->", user);
                setUser(user)
            });
    }, [])

    // get user fav recipes
    let userFavRecipes = [];
    if (user.favRecipeList) {
        for (let i=0; i<4; i++) {
            userFavRecipes.push(user.favRecipeList[i]);
        }
    }

    // get latest from db
    // TODO
    let latestList = [];

    //get trending recipes
    useEffect(() =>
        recipeService.fetchTrending()
            .then(data =>{
                setTrendingList(data.recipes);
            }), []);

    console.log(trendingList);

    return (
        <>
            {
                user.username &&
                <div>
                    <h2 className="wd-block-title">
                        Your Favorites
                    </h2>
                    <div className="card-group">
                        {
                            userFavRecipes.map(recipeId =>
                                <RecipeCardItem key={recipeId} recipeId={recipeId} user={user}/>
                            )
                        }
                    </div>
                </div>
            }

            <div>
                <h2 className="wd-block-title">
                    Explore Latest
                </h2>
                <div className="card-group">
                    {
                        latestList.map(recipe =>
                            <RecipeCardItemByObject key={recipe.id} recipe={recipe} user={user}/>
                        )
                    }
                </div>
            </div>

            <div>
                <h2 className="wd-block-title">
                    Trending Recipes
                </h2>
                <div className="card-group">
                    {
                        trendingList.map(recipe =>
                            <RecipeCardItemByObject key={recipe.id} recipe={recipe} user={user}/>
                        )
                    }
                </div>
            </div>






        </>

    )
}

export default RecipeCards;