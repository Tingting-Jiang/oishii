import React, {useEffect, useState} from 'react'
import recipeService from '../../service/recipeService'
import {Link, useHistory, useParams} from 'react-router-dom'
import userService from '../../service/userService'
import './search.css';
import Header from "../Header";
import { Helmet } from 'react-helmet';


const Search = () => {
    const params = useParams();
    const ingredient = params.searchTerm || "pork";
    // console.log("searchTerm in Search Screen", ingredient);
    const navigate = useHistory();
    let totalRecipes= [];
    
    const [searchTerm, setSearchTerm] = useState(ingredient);
    const [searchResult, setSearchResult] = useState([]);
    const [recipeList, setRecipeList] = useState([]);
    
    const searchRecipe = (event) => {
        setSearchTerm(event.target.value);
        recipeService.fetchSearchResult(event.target.value)
            .then(data => {
                setSearchResult(data)
            });
    };
    

    
    
    
    const checkResult = (e) =>{
        if (e.key === "Enter")
            clickSearch()

    }

    const clickSearch = () => {
        navigate.push(`/search/${searchTerm}`);
        userService.searchRecipeByTitle(searchTerm)
            .then(data => {
                    console.log("db data length ==>", data.length );
                    if (data.length !== 0) {
                        console.log("search DB");
                        console.log(data);
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
                totalRecipes = [];
            });
    }
    
    

    const getRandomRecipe= () =>{
        console.log("in get random recipe");
        recipeService.getRandomRecipe()
            .then(data =>{
                navigate.push(`/details/${data.id}`);
            
            })
    }
    
    
    useEffect(clickSearch, [])
  
    
    
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
                                       onChange={e => searchRecipe(e)}
                                        onKeyPress={e => checkResult(e)}/>
    
    
                                <datalist id="item-list">
                                    {searchResult.map(item => (
                                        <option value={item.title} >
                                        </option>
                                    ))}
                                </datalist>
                            </div>
                        </div>

                        <div className="my-3">
                            <span>
                             
                                <button onClick={clickSearch}
                                        className="btn btn-outline-primary wd-button me-3">
                                    Search For Recipe
                                </button>
                            </span>
                            <span>
                                {/*TODO direct to a random recipe page*/}
                                <button className="btn btn-outline-primary wd-button"
                                    onClick={getRandomRecipe}>
                                    Get a Lucky Oishii
                                </button>
                            </span>
                        </div>

                    </div>
                </div>

                <div className="container">
                    <ul className="list-group wd-search-result">
                        {recipeList.map(item => {
                            return (
                                <Link to={`/details/${item.id === undefined? item._id: item.id}`}>
                                    <li className="list-group-item wd-search-result-item d-flex"
                                        key={item.id}>

                                        <span>
                                            <img className="wd-search-result-image"
                                                 src={item.image} alt=""/>
                                        </span>

                                        <span className="ms-3">
                                            <h4 className="wd-search-result-name fw-bold wd-color-coral">{item.title}</h4>
                                             <h5 className="wd-search-result-name my-1"> Servings: {item.servings}</h5>
                                             <h5 className="wd-search-result-name">Preparation Time: {item.readyInMinutes} minutes</h5>
                                        </span>


                                    </li>
                                </Link>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>

    );
};
export default Search;
