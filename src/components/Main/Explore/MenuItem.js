import React, {useEffect, useState} from 'react';
import userService from '../../service/userService';
import recipeService from '../../service/recipeService';
import {Link} from 'react-router-dom';

const MenuItem = ({menuItemId}) => {
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
    

    return (
        <div className="d-flex overflow-hidden align-content-start">
            <Link to={`/details/${menuItemId}`}>
                <li className="list-group-item wd-search-result-item d-flex overflow-hidden"
                    key={menuItem.id}>
                    <span>
                        <img className="wd-search-result-image"
                             src={menuItem.image} alt=""/>
                    </span>
                    <span className="ms-3 overflow-hidden">
                        <h4 className="wd-search-result-name fw-bold wd-color-coral text-nowrap">{menuItem.title}</h4>
                        <div className="d-flex d-inline-block">
                            <h6>servings: {menuItem.servings}</h6>
                            <h6 className="ms-2">| &nbsp;total time: {menuItem.readyInMinutes} min</h6>
                        </div>

                        {/*<h6>{menuItem.id}</h6>*/}
                    </span>
                </li>
            </Link>

    




        </div>
    )
}
export default MenuItem;