import React, {useEffect, useState} from 'react'
import userService from '../../service/userService'
import recipeService from '../../service/recipeService'
import {Link} from 'react-router-dom'

const MenuItem = ({menuItemId, menuId, isEditor}) => {
    const [menuItem, setMenuItem] = useState({
        id: 236834,
        image: "/images/sample-recipe/thumbnail_sample.jpg",
        title: "sample",
        servings: 3,
        readyInMinutes: 60
    });
    const dbRecipe = menuItemId > 10000000;


    useEffect(() => {
            if (!dbRecipe) {
                recipeService.fetchByID(menuItemId)
                    .then((data) => {
                        setMenuItem(data);
                    })
            } else {
                userService.getRecipe(menuItemId)
                    .then((data) => {
                        setMenuItem(data);
                    })
            }
        },
        [dbRecipe, menuItemId]
    );

    //dbRecipe, menuItemId

    // const deleteRecipeFromMenu = () => {
    //     console.log("before delete recipe from menu ", menuItem.id);
    //     const sourceName = dbRecipe ? menuItem.sourceName : "NONE"
    //     userService.deleteRecipeFromMenu(menuId, menuItem.id, sourceName)
    //         .then(data =>
    //             console.log(data));
    // }


    return (
        <div className="d-flex overflow-hidden align-content-start">
            {/*{*/}
            {/*    isEditor &&*/}
            {/*    <button className="btn btn-sm btn-primary-outline wd-button-transparent"*/}
            {/*            onClick={deleteRecipeFromMenu}>*/}
            {/*        <i className="fa fa-times fa-lg"/>*/}
            {/*    </button>*/}
            {/*}*/}

            <Link to={`/details/${menuItemId}`}>
                <li className="list-group-item wd-search-result-item d-flex overflow-hidden"
                    key={menuItem.id}>
                    <span>
                        <img className="wd-search-result-image"
                             src={menuItem.image} alt=""/>
                             {/*src="/images/sample-recipe/thumbnail_sample.jpg" alt=""/>*/}
                    </span>
                    <span className="ms-3 overflow-hidden">
                        <h4 className="wd-search-result-name fw-bold wd-color-coral text-nowrap">{menuItem.title}</h4>
                        <div className="d-flex d-inline-block">
                            <h6>servings: {menuItem.servings}</h6>
                            <h6 className="ms-2">| &nbsp;total time: {menuItem.readyInMinutes} min</h6>
                        </div>

                        <h6>{menuItem.id}</h6>
                    </span>
                </li>
            </Link>

    




        </div>
    )
}
export default MenuItem;