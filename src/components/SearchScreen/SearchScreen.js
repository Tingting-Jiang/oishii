import React, { useState } from 'react'
import recipeService from '../service/recipeService'
import { useNavigate } from 'react-router-dom';


const SearchScreen = () => {
    
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    
    const searchRecipe = (event) => {
        setSearchTerm(event.target.value);
        recipeService.fetchSearchResult(event.target.value)
            .then(data => {
                // console.log("auto complete result ->", data);
                setSearchResult(data)
                
            })
    };
    
    const navigate = useNavigate();
    const submitSearchHandler = (e) => {
        if(e.key === "Enter")
            navigate(`/recipe/${searchTerm}`);
    }
    
    
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
                    <div className="d-none d-md-block col-4 align-self-center">
                        <div className="align-items-center">
                            <div className="wd-magnifier">
                                <label htmlFor="SearchInput">
                                    <i className="fas fa-search"/>
                                </label>
                            </div>
                            <div>
                                <input id="SearchInput"
                                       className="form-control wd-search-bar-input"
                                       list="datalistOptions"
                                       placeholder="Search Oishii"
                                       onChange={e => searchRecipe(e)}
                                       onKeyPress={e => submitSearchHandler(e)}/>
            
                                <datalist id="datalistOptions">
                                    {searchResult.map(item => (
                                        <option value={item.title} />
                
                                    ))}
                                </datalist>
                           
                        </div>
                        </div>
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
                                    <input id="MainSearchInput"
                                           className="form-control wd-main-search-input"
                                           placeholder="Search Oishii"/>
                                </div>
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
                            <li className="list-group-item wd-search-result-item d-flex">
                <span>
                    <img className="wd-search-result-image"
                         src="../../images/sample_search_result.jpeg" alt=""/>
                </span>
                                <span className="ms-3">
                    <h5 className="wd-search-result-name">Super Easy Eggplant Parmesan with a really loooooooooong name and an ugly title which will be hidden in xs small screen</h5>
                </span>
                            </li>
                            <li className="list-group-item wd-search-result-item d-flex">
                <span>
                    <img className="wd-search-result-image"
                         src="../../images/sample_search_result.jpeg" alt=""/>
                </span>
                                <span className="ms-3">
                    <h5 className="wd-search-result-name">Super Easy Eggplant Parmesan</h5>
                </span>
                            </li>
                            <li className="list-group-item wd-search-result-item d-flex">
                <span>
                    <img className="wd-search-result-image"
                         src="../../images/sample_search_result.jpeg" alt=""/>
                </span>
                                <span className="ms-3">
                    <h5 className="wd-search-result-name">Super Easy Eggplant Parmesan</h5>
                </span>
                            </li>
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
    )
    
    
    
};
export default SearchScreen;