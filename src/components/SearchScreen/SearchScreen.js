import React, { useEffect, useState } from 'react'
import recipeService from '../service/recipeService'
import { Link, useNavigate, useParams } from 'react-router-dom'
import userService from '../service/userService'
import './search.css';
import {b64toBlob, contentType} from '../const'

//TODO: can get recipe summary by ID
const SearchScreen = () => {
    const params = useParams();
    const ingredient = params.searchTerm || "pork";
    console.log("searchTerm in Search Screen", ingredient);
    const navigate = useNavigate();
    let totalRecipes= [];
    
    const [searchTerm, setSearchTerm] = useState(ingredient);
    const [searchResult, setSearchResult] = useState([]);
    const [recipeList, setRecipeList] = useState([]);
    
    
    
    
    const searchRecipe = (event) => {
        setSearchTerm(event.target.value);
        recipeService.fetchSearchResult(event.target.value)
            .then(data => {
                console.log("auto complete result -> API");
                
                setSearchResult(data)
                
            });
    };
    
    
    const checkResult = (e) =>{
        if (e.key === "Enter")
            clickSearch()
    }
    
    
    const clickSearch = () => {
        navigate(`/search/${searchTerm}`);
        userService.searchRecipeByTitle(searchTerm)
            .then(data => {
                console.log("db data length ==>", data.length );
                    if (data.length !== 0) {
                        console.log("search DB");
                        for (let item of data) {
                            item.image = URL.createObjectURL(b64toBlob(item.image, contentType));
                        }
                        totalRecipes = data;
                        
                    }
                }
            )
    
        recipeService.fetchByIngredients(searchTerm)
            .then(data => {
                if (totalRecipes.length !== 0) {
                    for (let item of data)
                        totalRecipes = [...totalRecipes, item];
                }
                else {
                    totalRecipes = data;
                   
                }
                setRecipeList(totalRecipes)
                console.log("total@2", totalRecipes);
                totalRecipes = [];
            });
    }
    
    useEffect(clickSearch, [])
 
   
    return (
        <>
            <div className="container mt-2">
                <div className="row wd-home-header">
                    <div className="col-2 col-md-2">
                        <h1>Oishii</h1>
                    </div>
                    <div className="col-6 col-md-6 align-self-center">
                        <ul className="nav justify-content-left">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link wd-color-coral fw-bold" href="#">Recipes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                        </ul>
                    </div>
                </div>
           
        
                <img className="wd-search-bg"
                     src="../../images/search-bg.jpg"/>
        
                <div className="wd-search-container">
                    <div className="wd-search-region text-center flex">
                        <div className="align-items-center">
                            <div className="wd-magnifier wd-main-magnifier">
                                <label htmlFor="MainSearchInput">
                                    <i className="fas fa-search"></i>
                                </label>
                            </div>
                            <div>
                                <input id="SearchInput"
                                       className="form-control wd-search-bar-input"
                                       list="datalistOptions"
                                       placeholder="Search Oishii"
                                       onChange={e => searchRecipe(e)}
                                onKeyPress={e => checkResult(e)}/>
                                    
    
                                <datalist id="datalistOptions">
                                    {searchResult.map(item => (
                                        <option value={item.title} />
    
                                    ))}
                                </datalist>
                            </div>
                            <button onClick={clickSearch} className="btn btn-pink ">
                                Search
                            </button>
                        </div>
                
                        <div className="my-3">
            <span>
                <button className="btn btn-outline-primary wd-button">
                    Search For Recipe
                </button>
            </span>
                            <span>
                <button className="btn btn-outline-primary wd-button">
                    Get a Lucky Oishii
                </button>
            </span>
                        </div>
            
                    </div>
                </div>
    
                <div className="container">
                    <ul className="list-group wd-search-result">
                        {recipeList.map(item =>{
                            return(
                            <li className="list-group-item wd-search-result-item d-flex"
                                key={item.id}>
                               
                                <span>
                                    <img className="wd-search-result-image"
                                         src={item.image} alt=""/>
                                </span>
                                <Link to={item._id === undefined ?`/details/${item.id}` : `/details/${item._id}`}>
                                <span className="ms-3">
                                    <h5 className="wd-search-result-name">{item.title}</h5>
                                    
                                </span>
                                    </Link>
                              
                            </li>
                            )
                        })}
                        
                    </ul>
                </div>
            
                
                <div className="wd-footer">
                    <div>
                        <h3>Oishii</h3>
                        <p>Presented by Project Oishii Group</p>
                        <span>Privacy Policy</span> | <span>Send Feedback</span>
                    </div>
                </div>
            </div>
          
        </>
    
    );
};
export default SearchScreen;
