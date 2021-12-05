import React, { useEffect, useState } from 'react'
import HeaderNavItem from "./HeaderNavItem";
import headerNavs from "./headerNavs.json";
import "./header.css";
import recipeService from '../service/recipeService'
import { useNavigate } from 'react-router-dom'

const Header = ({
        active = "home"
    }) => {

    // change the active nav's isActive field
    for (let i = 0; i < headerNavs.length; i++) {
        headerNavs[i].isActive = (headerNavs[i].navTitle === active);
    }

    // TODO submit search term and direct to search page
    
    // data part starts from here ----------------
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
            navigate(`/search/${searchTerm}`);
    }
    
    return (
        <>
            <div className="row wd-home-header">
                <div className="col-2 col-md-2">
                    <h1>Oishii</h1>
                </div>
                <div className="col-6 col-md-6 align-self-center">
                    <ul className="nav justify-content-left">
                        {headerNavs.map(nav => {
                            return (
                                <HeaderNavItem key={nav._id}
                                               nav={nav}
                                               isActive={nav.isActive}/>);
                        })}
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


        </>
    )
}

export default Header;