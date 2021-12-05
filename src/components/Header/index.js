import React from "react";
import HeaderNavItem from "./HeaderNavItem";
import headerNavs from "./headerNavs.json";

const Header = ({
        active = "home"
    }) => {

    // change the active nav's isActive field
    for (let i = 0; i < headerNavs.length; i++) {
        headerNavs[i].isActive = (headerNavs[i].navTitle === active);
    }

    return (
        <>
            <div className="row wd-home-header">
                <div className="col-2 col-md-2">
                    <h1>Oishii</h1>
                </div>
                <div className="col-6 col-md-6 align-self-center">
                    <ul className="nav justify-content-left">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Recipes</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#">Profile</a>
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
                                   placeholder="Search Oishii">
                        </div>
                    </div>
                </div>
            </div>

            {headerNavs.map(nav => {
                return (
                    <HeaderNavItem key={nav._id}
                                   nav={nav}
                                   isActive={nav.isActive}/>);
            })}
        </>
    )
}

export default Header;