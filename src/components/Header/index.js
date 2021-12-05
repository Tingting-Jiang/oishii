import React from "react";
import HeaderNavItem from "./HeaderNavItem";
import headerNavs from "./headerNavs.json";
import "./header.css";

const Header = ({
        active = "home"
    }) => {

    // change the active nav's isActive field
    for (let i = 0; i < headerNavs.length; i++) {
        headerNavs[i].isActive = (headerNavs[i].navTitle === active);
    }

    // TODO submit search term and direct to search page
    const submitSearchHandler = () => {

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
                                   placeholder="Search Oishii"
                                   onKeyPress={submitSearchHandler}/>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Header;