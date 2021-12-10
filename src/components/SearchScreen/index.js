import React, {useEffect, useState} from 'react'
import recipeService from '../service/recipeService'
import {Link, useNavigate, useParams} from 'react-router-dom'
import userService from '../service/userService'
import './search.css';
import Header from "../Header";
import { Helmet } from 'react-helmet';
import { b64toBlob, contentType } from '../const'


const Search = () => {
    const params = useParams();
    const ingredient = params.searchTerm || "pork";
    // console.log("searchTerm in Search Screen", ingredient);
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
                        console.log(data);
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
                                <input id="MainSearchInput"
                                       className="form-control wd-main-search-input"
                                       list="datalistOptions"
                                       placeholder="Search Oishii"
                                       onChange={e => searchRecipe(e)}
                                       onKeyPress={e => checkResult(e)}/>

                                <datalist id="datalistOptions">
                                    {searchResult.map(item => (
                                        <option value={item.title}/>
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
                                <button className="btn btn-outline-primary wd-button">
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
                                <Link to={`/details/${item.id}`}>
                                    <li className="list-group-item wd-search-result-item d-flex"
                                        key={item.id}>

                                        <span>
                                            <img className="wd-search-result-image"
                                                 src={item.image} alt=""/>
                                        </span>

                                        <span className="ms-3">
                                            <h5 className="wd-search-result-name">{item.title}</h5>
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
