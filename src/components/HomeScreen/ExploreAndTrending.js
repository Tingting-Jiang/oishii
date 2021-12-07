import React, { useEffect, useState } from 'react'
import recipeService from '../service/recipeService';
import userService from '../service/userService';
import "./home.css";
import "../oishii.css"
import { useNavigate } from 'react-router'

const ExploreAndTrending = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [recipeList, setRecipeList] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [trending, setTrending] = useState([]);
    const [latest, setLatest] = useState([]);
    const [user, setUser] = useState({favRecipeList: []});
    const navigate = useNavigate();
    // const [userFav, setUserFav] = useState([]);
    
   
    
    const searchByIngredient = () =>
        recipeService.fetchByIngredients(searchTerm)
            .then(data =>setRecipeList(data));
    
    // useEffect(() =>{
    //     userService.getProfile()
    //         .then(user => {
    //             console.log("in client-->", user);
    //             setUser(user)
    //         });
    // }, [])
    
    
    
    const searchRecipe = (event) => {
        setSearchTerm(event.target.value);
        recipeService.fetchSearchResult(event.target.value)
            .then(data => setSearchResult(data))
    };
    
    //
    // useEffect( () =>
    //     userService.getProfile()
    //         .then(user => setUser(user))
    //         .catch(e => navigate('/login')), [user]);
    //
    //
    
    
    
    
    const likeRecipeHandler = (recipeID) => {
        // dispatch({ type: "like-tweet", tweet });
        console.log("recipe id-->", recipeID);
        // console.log(user._id);
        userService.likeRecipe(recipeID, user.username)
            .then(data => {
            console.log("back from server, recipeList -->", data);
            setUser({...user, favRecipeList :data});
            });
    };

    
    useEffect(() =>
        recipeService.fetchTrending()
            .then(data =>{
                setTrending(data.recipes);
            }), []);

    // useEffect(() =>
    //     recipeService.fetchTrending()
    //         .then(data =>{
    //             setLatest(data.recipes);
    //         }), []);

    // console.log("trending -->", trending);
    
    
    console.log("later -->", user);
    
    
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
                                <a className="nav-link" href="/create">Recipes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/profile">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
    
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
    
                            <li className="nav-item">
                                <a className="nav-link" href="/register">Register</a>
                            </li>
                        </ul>
                    </div>
                    <div className="d-none d-md-block col-4 align-self-center">
                        <div className="align-items-center">
                            <div className="wd-magnifier">
                                <label for="SearchInput">
                                    <i className="fas fa-search"></i>
                                </label>
                            </div>
                            <div>
                                <input id="SearchInput"
                                       list="datalistOptions"
                                       className="form-control wd-search-bar-input"
                                       placeholder="Search Oishii"
                                       onChange={e => searchRecipe(e)}
                                />
                                <datalist id="datalistOptions">
                                    {searchResult.map(item => (
                                            <option value={item.title} />
                                        
                                    ))}
                                </datalist>
                            
                                <button
                                    onClick={e => searchByIngredient(e)}
                                    className="btn btn-primary float-end"
                                >
                                    Search
                                </button>
                            </div>
        
                                <ul className="">
                                    {recipeList.map(item => (
                                        <li key={item.id} >
                    
                                            <p>{item.title} {item.id}</p>
                
                                        </li>
                                    ))}
                                </ul>
                            
                        </div>
                    </div>
                </div>
                <div className="wd-about">
                    <img className="wd-about-img"
                         src="../../images/home-about.jpg"/>
                        <div className="wd-user-info text-center">
                            <img className="wd-profile-img"
                                 src="../../images/sample-user.jpeg"/>
                                <h5 className="wd-username">Hello {user.username}</h5>
                                <h6 className="wd-username">Ready to find some Oishii?</h6>
                                <button className="btn btn-outline-primary wd-button my-2">
                                    Login | Register
                                </button>
                        
                    </div>
                    
                </div>
                <div>
                    <div className="wd-category-container flex">
                        <ul className="nav justify-content-around">
                            <li className="nav-item text-center">
                                <img className="wd-category-img"
                                     src="../../images/category-main.jpg"/>
                                    <a className="nav-link" href="#">Main</a>
                            </li>
                            <li className="nav-item text-center">
                                <img className="wd-category-img"
                                     src="../../images/category-salad.jpg"/>
                                    <a className="nav-link" href="#">Salad</a>
                            </li>
                            <li className="nav-item text-center">
                                <img className="wd-category-img"
                                     src="../../images/category-dessert.jpg"/>
                                    <a className="nav-link" href="#">Dessert</a>
                            </li>
                            <li className="nav-item text-center">
                                <img className="wd-category-img"
                                     src="../../images/category-pizza.jpg"/>
                                    <a className="nav-link" href="#">Pizza</a>
                            </li>
                            <li className="nav-item text-center">
                                <img className="wd-category-img"
                                     src="../../images/category-vegan.jpg"/>
                                    <a className="nav-link" href="#">Vegan</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="wd-block-title">
                            Your Favorites
                        </h2>
                        <div className="card-group">
                            <div className="card">
                                <img src="../../images/recipe-sample-img.jpeg" className="card-img-top wd-card-img" alt="sample"
                                height="322px" width="322px"/>
                                    <button className="btn btn-outline-primary wd-button wd-button-on-img">
                                        <i className="fas fa-heart wd-color-red"></i>
                                    </button>
                                    <div className="card-body">
                                        <h5 className="card-title">Jerk Chicken Wings</h5>
                                        <p className="card-text">for 4 servings</p>
                                        <p className="card-text"><small className="text-muted">Presented by Guinness</small></p>
                                    </div>
                            </div>
                            <div className="card">
                                <img src="../../images/recipe-sample-img2.jpeg" className="card-img-top wd-card-img" alt="sample2"/>
                                    <button className="btn btn-outline-primary wd-button wd-button-on-img">
                                        <i className="fas fa-heart wd-color-red"></i>
                                    </button>
                                    <div className="card-body">
                                        <h5 className="card-title">Roasted Garlic Parmesan Brussels Sprouts</h5>
                                        <p className="card-text">for 4 servings</p>
                                        <p className="card-text"><small className="text-muted">Robin Broadfoot Tasty Team</small></p>
                                    </div>
                            </div>
                            <div className="card">
                                <img src="../../images/recipe-sample-img.jpeg" className="card-img-top wd-card-img" alt="sample"/>
                                    <button className="btn btn-outline-primary wd-button wd-button-on-img">
                                        <i className="fas fa-heart wd-color-red"></i>
                                    </button>
                                    <div className="card-body">
                                        <h5 className="card-title">Jerk Chicken Wings</h5>
                                        <p className="card-text">for 4 servings</p>
                                        <p className="card-text"><small className="text-muted">Presented by Guinness</small></p>
                                    </div>
                            </div>
                            <div className="card">
                                <img src="../../images/recipe-sample-img3.jpeg" className="card-img-top wd-card-img" alt="sample3"/>
                                    <button className="btn btn-outline-primary wd-button wd-button-on-img">
                                        <i className="fas fa-heart wd-color-red"></i>
                                    </button>
                                    <div className="card-body">
                                        <h5 className="card-title">Brie, Bacon, And Cranberry Mini Pies</h5>
                                        <p className="card-text">for 12 servings</p>
                                        <p className="card-text"><small className="text-muted">Matthew Cullum Tasty Team</small></p>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="wd-block-title">
                            Explore Latest
                        </h2>
                        <div className="card-group">
                            {latest.map((item) =>(
                                <div className="card">
                                    <img src={item.image} className="card-img-top wd-card-img" alt="sample"/>
                                    <button className="btn btn-outline-primary wd-button wd-button-on-img">
                                        <i className="fas fa-heart"></i>
                                    </button>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">for {item.servings} servings</p>
                                        <p className="card-text"><small className="text-muted">Presented by {item.sourceName}</small></p>
                                    </div>
                                </div>
            
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="wd-block-title">
                            Trending Recipes
                        </h2>
                        <div className="card-group">
                            {trending.map((item) =>(
                                <div className="card">
                                    <img src={item.image} className="card-img-top wd-card-img" alt="sample"/>
                                    <button className="btn btn-outline-primary wd-button wd-button-on-img"
                                        onClick={() => likeRecipeHandler(item.id)}>
                                        <i className="fas fa-heart text"
                                           style={{ color: user.favRecipeList.includes(item.id) ? "red" : "white" }}
                                        ></i>
                                    </button>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">for {item.servings} servings</p>
                                        <p className="card-text"><small className="text-muted">Presented by {item.sourceName}</small></p>
                                    </div>
                                </div>
                                
                            ))}
                        </div>
                    </div>
                
                </div>
                
            </div>
          
            </>
    )
};
    

export default ExploreAndTrending;