import React, {useEffect, useState} from "react";
import userService from "../../service/userService";
import RecipeCardItem from "../RecipeCards/RecipeCardItem";
import {Link} from "react-router-dom";


const ExploreMenuItem = ({menuId, user, dispatch}) => {
    const [recipeList, setRecipeList] = useState([]);
    const [menuTitle, setMenuTitle] = useState("Menu");

    useEffect(() => {
        userService.getMenuDetails(menuId)
            .then(data => {
                // console.log("menu list ", data.recipeList);
                setRecipeList(data.recipeList);
                setMenuTitle(data.menuName);
            })
    }, []);

    let startIdx = 0;
    let number = 4;

    console.log(recipeList);

    return (
        <div>
            <Link to={`/menu/${menuId}`}>
                <h2 className="wd-block-title" title="Show more in this menu">
                    {menuTitle}
                </h2>
            </Link>
            <div className="card-group">
                {
                    recipeList.slice(startIdx, number).map(recipeId =>
                        <RecipeCardItem key={recipeId} recipeId={recipeId} user={user} dispatch={dispatch}/>
                    )
                }

            </div>
        </div>
    )

};

export default ExploreMenuItem;