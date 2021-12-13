import React, {useEffect, useState} from "react";
import "./recipeCards.css"
import userService, {getFavList} from "../../service/userService";
import recipeService from '../../service/recipeService';
import RecipeCardItem from './RecipeCardItem';
import RecipeCardItemByObject from "./RecipeCardItemByObject";
import {useDispatch} from "react-redux";


const RecipeCards = ({profile}) => {

    const dispatch = useDispatch();

    useEffect(() => getFavList(dispatch), [dispatch]);

    const [trendingList, setTrendingList] = useState([]);
    // console.log("user favRecipeList 99999999999999999999999");
    // console.log(profile.favRecipeList);

    // get user fav recipes
    let userFavRecipes = [];
    if (profile.favRecipeList) {
        for (let i=0; i<4; i++) {
            profile.favRecipeList[i] &&
            userFavRecipes.push(profile.favRecipeList[i]);
        }
    }

    // TODO get latest from db
    const [latestList, setLatest]  = useState([]);
    
    useEffect(() =>
        userService.getAllLatestRecipes()
            .then(data =>{
                setLatest(data);
            })
    ,[])

    //get trending recipes
    useEffect(() =>
        recipeService.fetchTrending()
            .then(data =>{
                setTrendingList(data.recipes);
            }), []);

    // console.log(trendingList);

    return (
        <>
            {
                profile.username &&
                <div>
                    <h2 className="wd-block-title">
                        Your Favorites
                    </h2>
                    <div className="card-group">
                        {
                            userFavRecipes.length === 0 &&
                            <h5>Like some recipes and check them here!</h5>

                        }
                        {
                            userFavRecipes.map(recipeId =>
                                <RecipeCardItem key={recipeId} recipeId={recipeId} user={profile} dispatch={dispatch}/>
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
                            <RecipeCardItemByObject key={recipe.id} recipe={recipe} user={profile} dispatch={dispatch}/>
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
                            <RecipeCardItemByObject key={recipe.id} recipe={recipe} user={profile} dispatch={dispatch}/>
                        )
                    }
                </div>
            </div>

        </>

    )
}

export default RecipeCards;