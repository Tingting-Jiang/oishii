import React, { useEffect, useState } from 'react'
import userService from '../../service/userService'
import recipeService from '../../service/recipeService'
import { Link } from 'react-router-dom'

const MenuItem = ({menuItemId, menuId}) =>{
    const [menuItem, setMenuItem] = useState({
        id: 236834,
        image: "/images/sample-user.jpeg",
        title: "test",
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
        []
    );
    
    
    const deleteRecipeFromMenu = () =>{
        console.log("before delete recipe from menu");
        const sourceName = dbRecipe ? menuItem.sourceName : "NONE"
        userService.deleteRecipeFromMenu(menuId, menuItemId, sourceName )
            .then(data =>
            console.log(data));
    }
    
    
    return (
        <>
    
          
            <Link to={`/details/${menuItemId}`}>
                <li className="list-group-item wd-search-result-item d-flex"
                    key={menuItem.id}>

                                        <span>
                                            <img className="wd-search-result-image"
                                                 src={menuItem.image} alt=""/>
                                        </span>
            
                    <span className="ms-3">
                                            <h4 className="wd-search-result-name fw-bold wd-color-coral">{menuItem.title}</h4>
                                            <h6 className="my-1">servings: &nbsp;&nbsp;&nbsp;&nbsp;{menuItem.servings}</h6>
                                            <h6 className="">total time:  &nbsp;{menuItem.readyInMinutes} min</h6>
                                            <h6 >{menuItem.id}</h6>
                                        </span>
                </li>
             
                
            </Link>
            <button className="btn btn-primary rounded-pill"
                    onClick={deleteRecipeFromMenu}
            > delete </button>
            
        </>
    )
}
export default MenuItem;