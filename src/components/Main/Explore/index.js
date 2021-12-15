import React, {useEffect} from 'react';
import {getProfile} from '../../service/userService';
import '../SearchScreen/search.css';
import Header from "../Header";
import { Helmet } from 'react-helmet';
import {useDispatch, useSelector} from "react-redux";
import './menu.css';
import ExploreMenuItem from "./ExploreMenuItem";


const selectProfile = (profile) => profile;

const Explore = () => {
    // get shown menu lists information
    const menuIds = [1, 2, 3, 4, 5];

    // get user information
    const dispatch = useDispatch();

    useEffect(() => getUser(dispatch), [dispatch]);

    let user = useSelector(selectProfile);

    const getUser = (dispatch) => {
        getProfile(dispatch)
            .then(newUser => {
                if (newUser.username && newUser.password) {
                    user = newUser;
                }
            })
            .catch(e => console.log(e));
    }


    return (
        <>
            <Helmet>
                <title>Explore | Oishii</title>
            </Helmet>

            <div className="container mt-2">
                <Header active="explore"/>

                <img className="wd-search-bg"
                     src="/images/recipe-bg.jpg"
                     alt=""/>

                <div className="text-center my-4">
                    <h1 className="wd-menu-title">- &nbsp;Menus&nbsp; -</h1>
                    <h6 className="my-2 text-black">Picked by our starred editors!</h6>
                </div>

                <hr className="wd-color-coral"/>

                {
                    menuIds.map(menuId =>
                        <ExploreMenuItem menuId={menuId} user={user} dispatch={dispatch} />
                    )
                }

            </div>
        </>

    );
};
export default Explore;
