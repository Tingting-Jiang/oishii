import React from "react";
import "./categoryNav.css";
import menu from "../../../const/const"


const CategoryNav = () => {
    return (
        <div className="wd-category-container flex">
            <ul className="nav justify-content-around">
                <li className="nav-item text-center">
                    <img className="wd-category-img"
                         src={menu.main}
                         alt=""/>
                        <a className="nav-link" href="/menu/1">Main</a>
                </li>
                <li className="nav-item text-center">
                    <img className="wd-category-img"
                         src={menu.salad}
                         alt=""/>
                        <a className="nav-link" href="/menu/2">Salad</a>
                </li>
                <li className="nav-item text-center">
                    <img className="wd-category-img"
                         src={menu.dessert}
                         alt=""/>
                        <a className="nav-link" href="/menu/3">Dessert</a>
                </li>
                <li className="nav-item text-center">
                    <img className="wd-category-img"
                         src={menu.pizza}
                         alt=""/>
                        <a className="nav-link" href="/menu/4">Pizza</a>
                </li>
                <li className="nav-item text-center">
                    <img className="wd-category-img"
                         src={menu.vegan}
                         alt=""/>
                        <a className="nav-link" href="/menu/5">Vegan</a>
                </li>
            </ul>
        </div>
    )
}

export default CategoryNav;