import React from "react";
import "./categoryNav.css";

//TODO: hardcoded link

const CategoryNav = () => {
    return (
        <div className="wd-category-container flex">
            <ul className="nav justify-content-around">
                <li className="nav-item text-center">
                    <img className="wd-category-img"
                         src="/images/category-main.jpg"
                         alt=""/>
                        <a className="nav-link" href="/menu/1">Main</a>
                </li>
                <li className="nav-item text-center">
                    <img className="wd-category-img"
                         src="/images/category-salad.jpg"
                         alt=""/>
                        <a className="nav-link" href="/menu/2">Salad</a>
                </li>
                <li className="nav-item text-center">
                    <img className="wd-category-img"
                         src="/images/category-dessert.jpg"
                         alt=""/>
                        <a className="nav-link" href="/menu/3">Dessert</a>
                </li>
                <li className="nav-item text-center">
                    <img className="wd-category-img"
                         src="/images/category-pizza.jpg"
                         alt=""/>
                        <a className="nav-link" href="/menu/4">Pizza</a>
                </li>
                <li className="nav-item text-center">
                    <img className="wd-category-img"
                         src="/images/category-vegan.jpg"
                         alt=""/>
                        <a className="nav-link" href="/menu/5">Vegan</a>
                </li>
            </ul>
        </div>
    )
}

export default CategoryNav;