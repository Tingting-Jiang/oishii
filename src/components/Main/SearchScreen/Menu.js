import React, {useEffect, useState} from 'react'
import recipeService from '../../service/recipeService'
import {Link, useHistory, useParams} from 'react-router-dom'
import userService from '../../service/userService'
import './search.css';
import Header from "../Header";
import { Helmet } from 'react-helmet';
import MenuItem from './MenuItem'


const Menu = () => {
    const params = useParams();
    const menuId = params.id;
    const [recipeList, setRecipeList] = useState([]);
    useEffect(() =>{
        userService.getMenuDetails(menuId)
            .then(data=> {
                // console.log("menu list ", data.recipeList);
                setRecipeList(data.recipeList);
            })
        
    }, []);
    
    
  
    const mid = Math.round(recipeList.length / 2);
  
    
    return (
        <>
            <Helmet>
                <title>Search | Oishii</title>
            </Helmet>
            
            <div className="container mt-2">
                <Header active="search"/>
                
                <img className="wd-search-bg"
                     src="/images/search-bg.jpg"
                     alt=""/>
                
                <div className="wd-search-container">
                    <div className="wd-search-region text-center flex">
                        <div className="align-items-center">
                            <div className="wd-magnifier wd-main-magnifier">
                                <label htmlFor="MainSearchInput">
                                    <i className="fas fa-search"/>
                                </label>
                            </div>
                            <div>
                                <input
                                    className="form-control wd-main-search-input"
                                    list="item-list"
                                    placeholder="Search Oishii"
                                   />
                                
                                
                               
                            </div>
                        </div>
                        
                        <div className="my-3">
                            <span>
                             
                                <button
                                        className="btn btn-outline-primary wd-button me-3">
                                    Search For Recipe
                                </button>
                            </span>
                            <span>
                                {/*TODO direct to a random recipe page*/}
                                <button className="btn btn-outline-primary wd-button"
                                        >
                                    Get a Lucky Oishii
                                </button>
                            </span>
                        </div>
                    
                    </div>
                </div>
                
                <div className="row justify-content-evenly">
                    <ul className="list-group wd-search-result col-12 col-md-6 row">
                        {recipeList.slice(0, mid).map(item =>
                           <MenuItem menuItemId={item} menuId={menuId}/>
                           
    
                            )}
                    </ul>
                    <ul className="list-group wd-search-result col-12 col-md-6 row">
                        {recipeList.slice(mid, recipeList.length).map(item =>
                            <MenuItem menuItemId={item} menuId={menuId} />
                        )}
                    </ul>
                </div>
            </div>
        </>
    
    );
};
export default Menu;
