import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import userService, {getProfile} from '../../service/userService';
import '../SearchScreen/search.css';
import Header from "../Header";
import { Helmet } from 'react-helmet';
import MenuItem from './MenuItem';
import {useDispatch, useSelector} from "react-redux";
import './menu.css';

const img_list = [
    "/images/main-bg.jpg",
    "/images/salad-bg.jpg",
    "/images/dessert-bg.jpg",
    "/images/pizza-bg.jpg",
    "/images/vegan-bg.jpg",
]

const selectProfile = (profile) => profile;

const Menu = () => {
    // get menu information
    const params = useParams();
    const menuId = params.id;
    const [recipeList, setRecipeList] = useState([]);
    const [menuTitle, setMenuTitle] = useState("Menu");
    useEffect(() =>{
        userService.getMenuDetails(menuId)
            .then(data=> {
                // console.log("menu list ", data.recipeList);
                setRecipeList(data.recipeList);
                setMenuTitle(data.menuName);
            })
    }, []);

    const mid = Math.round(recipeList.length / 2);

    // get user information
    const dispatch = useDispatch();
    useEffect(() => getUser(dispatch), [dispatch]);
    let user = useSelector(selectProfile);

    const getUser = (dispatch) => {
        getProfile(dispatch)
            // .then(res => setUser(profile))
            .then(newUser => {
                // console.log("returned from SESSION", newUser.favRecipeList);
                if (newUser.username && newUser.password) {
                    user = newUser;
                }
            })
            .catch(e => console.log(e));
    }

    // console.log("user in menu =============");
    // console.log(user.username, user.role);
    const isEditor = (user.role === 'editor');
    // console.log(user.role === 'editor');
    
    
    const deleteRecipeFromMenu = (recipeId) => {
        console.log("before delete recipe from menu ");
        userService.deleteRecipeFromMenu(menuId, recipeId)
            .then(res => {
                console.log("---", res)
                if (res.ok) {
                    console.log("------", recipeList);
                    setRecipeList(recipeList.filter(item => {
                        return (item !== recipeId) ? item : null;
                    }));
                    console.log("recipe deleted")
                    console.log("------", recipeList);
                    ;
                }
            })
            .catch(e => console.log(e));
    }
    
    
    
    
    

    return (
        <>
            <Helmet>
                <title>{menuTitle} | Oishii</title>
            </Helmet>
            
            <div className="container mt-2">
                <Header active="explore"/>
                
                <img className="wd-search-bg"
                     src={img_list[menuId-1]}
                     alt=""/>
                
                <div className="text-center my-4">
                    <h1 className="wd-menu-title">- &nbsp;{menuTitle}&nbsp; -</h1>
                    <h6 className="my-2 text-black">Picked by our starred editors!</h6>
                </div>
                
                <div className="mt-4 row justify-content-evenly">
                    {/*<ul className="list-group wd-search-result col-12 col-lg-6 row">*/}
                    {/*    {recipeList.slice(0, mid).map(item =>*/}
                    {/*        <MenuItem menuItemId={item} menuId={menuId} isEditor={isEditor}/>*/}
                    {/*        )}*/}
                    {/*</ul>*/}
                    {/*<ul className="list-group wd-search-result col-12 col-lg-6 row">*/}
                    {/*    {recipeList.slice(mid, recipeList.length).map(item =>*/}
                    {/*        <MenuItem menuItemId={item} menuId={menuId} isEditor={isEditor}/>*/}
                    {/*    )}*/}
                    {/*</ul>*/}
                    <ul className="list-group wd-search-result col-12 col-lg-6 row">
                        {recipeList.slice(0, mid).map(item =>{
                            return (
                            <>
                        {isEditor &&
                            <button className="btn btn-sm btn-primary-outline wd-button-transparent"
                            onClick={() => deleteRecipeFromMenu(item)}>
                            <i className="fa fa-times fa-lg"/>
                            </button>
                        }
    
                            <MenuItem menuItemId={item} menuId={menuId} isEditor={isEditor}/>
                            </>
                            )})}
                    </ul>
                    
    
                    <ul className="list-group wd-search-result col-12 col-lg-6 row">
                        {recipeList.slice(mid, recipeList.length).map(item => {
                            return (
                                <>
                            {isEditor &&
                            <button className="btn btn-sm btn-primary-outline wd-button-transparent"
                                    onClick={() => deleteRecipeFromMenu(item)}>
                                <i className="fa fa-times fa-lg"/>
                            </button>
                        }
                        
                            <MenuItem menuItemId={item} menuId={menuId} isEditor={isEditor}/>
                                </>
                        )})}
                    </ul>
                </div>
            </div>
        </>
    
    );
};
export default Menu;
