import React from "react";
import "./categoryNav.css";

//TODO: pages for each link
// maybe just search/salad ?

const CategoryNav = () => {
    return (
        <div className="wd-category-container flex">
            <ul className="nav justify-content-around">
                <li className="nav-item text-center">
                    <img className="wd-category-img"
                         src="/images/category-main.jpg"
                         alt=""/>
                        <a className="nav-link" href="#">Main</a>
                </li>
                <li className="nav-item text-center">
                    <img className="wd-category-img"
                         src="/images/category-salad.jpg"
                         alt=""/>
                        <a className="nav-link" href="#">Salad</a>
                </li>
                <li className="nav-item text-center">
                    <img className="wd-category-img"
                         src="/images/category-dessert.jpg"
                         alt=""/>
                        <a className="nav-link" href="#">Dessert</a>
                </li>
                <li className="nav-item text-center">
                    <img className="wd-category-img"
                         src="/images/category-pizza.jpg"
                         alt=""/>
                        <a className="nav-link" href="#">Pizza</a>
                </li>
                <li className="nav-item text-center">
                    <img className="wd-category-img"
                         src="/images/category-vegan.jpg"
                         alt=""/>
                        <a className="nav-link" href="#">Vegan</a>
                </li>
            </ul>
        </div>
    )
}

export default CategoryNav;