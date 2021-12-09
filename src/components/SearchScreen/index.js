import React, {useEffect, useState} from 'react'
import recipeService from '../service/recipeService'
import {Link, useNavigate, useParams} from 'react-router-dom'
import userService from '../service/userService'
import './search.css';
import Header from "../Header";
import { Helmet } from 'react-helmet';


const Search = () => {
    const params = useParams();
    const ingredient = params.searchTerm || "pork";
    console.log("searchTerm in Search Screen", ingredient);

    const [searchTerm, setSearchTerm] = useState(ingredient);
    const [searchResult, setSearchResult] = useState([]);
    const [recipeList, setRecipeList] = useState([]);

    const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }
    //TODO: here content type only include png
    const contentType = 'image/png';

    const searchRecipe = (event) => {
        setSearchTerm(event.target.value);
        recipeService.fetchSearchResult(event.target.value)
            .then(data => {
                // console.log("auto complete result ->", data);
                setSearchResult(data)

            });
    };


    const navigate = useNavigate();
    const submitSearchHandler = (e) => {
        if (e.key === "Enter") {
            navigate(`/search/${searchTerm}`);
            recipeService.fetchByIngredients(searchTerm)
                .then(data => {
                    console.log(data.length);
                    setRecipeList(data)
                });
        }
    }

    const clickSearch = () => {
        navigate(`/search/${searchTerm}`);
        recipeService.fetchByIngredients(searchTerm)
            .then(data => {
                console.log(data.length);
                setRecipeList(data)
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
                     src="/images/search-bg.jpg"/>

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
                                       onKeyPress={e => submitSearchHandler(e)}/>

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