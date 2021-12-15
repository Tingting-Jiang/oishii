import React from "react";
import {Helmet} from "react-helmet";
import Header from "../Header";

const TermsAndConditions = () => {

    return (
        <>
            <Helmet>
                <title>Terms | Oishii</title>
            </Helmet>

            <div className="container mt-2">
                <Header active=""/>
                <hr className="wd-color-coral"/>
                <div>
                    <ul className="nav d-flex d-block d-lg-none">
                        <li className="nav-item">
                            <a className="nav-link" href="/terms-of-service">Terms of Service</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/privacy-policy">Privacy Policy</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/cookie-policy">Cookie Policy</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/send-feedback">Send Feedback</a>
                        </li>
                    </ul>
                </div>

                <div className="row">

                    <ul className="nav flex-column mt-3 d-none d-lg-block col-3">

                        <li className="nav-item">
                            <a className="nav-link" href="/terms-of-service">Terms of Service</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/privacy-policy">Privacy Policy</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/cookie-policy">Cookie Policy</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/send-feedback">Send Feedback</a>
                        </li>

                    </ul>
                    <div className="mt-2 col-12 col-lg-9 h-75">
                        <div className="wd-terms-body">
                            <h1 className="text-center my-3 wd-terms-title fw-bold text-black">About Oishii</h1>

                            <p>Oishii is a website for searching, sharing and creating recipes. Users could find
                                relevant recipes they are interested in with some keywords and save them for later
                                reviews. Users can also generate their own recipes and publish on Oishii. Users could
                                build relationships by following other users.</p>

                            <p>Our website also provides some picked up collections of recipes, called menus, and
                                presents them in groups. Users could find menus by titles or just explore all existing
                                menus to have fun.
                            </p>

                            <p>Each recipe is presented with the recipe’s author, ingredients and steps. Recipe writers
                                are encouraged to create new works and editors would add featured recipes into menus.
                            </p>

                            <p>You can check our Terms of Service, Privacy Policy and Cookie Policy from the navigation
                                button or send us a message of anything you would like to share with us.</p>

                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}

export default TermsAndConditions;