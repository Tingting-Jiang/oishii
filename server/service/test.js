const fetch = require("node-fetch");
// const URL = "https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=chicken%20soup";
// const API_KEY = 'bc4fe255dcmsh226f8341d7ebb53p169a42jsn58714141d5e1';
const URL = "https://tasty.p.rapidapi.com";

const API_KEY ="8aacabbec3msh0d6aaeca6a49cb0p128f31jsn0c6ed3c6e8d0";

const HOST = 'tasty.p.rapidapi.com';


const dao = require("../db/latestRecipes/recipe-dao")

module.exports = (app) =>  {
    const getRandomInt = () =>{
        let min = Math.ceil(0);
        let max = Math.floor(10);
        return Math.floor(Math.random() * (10 - 0 + 1) + 0);
    }
    
    
    
    const fetchSearchResult = (req, res) => {
        const str = `/recipes/auto-complete?prefix=${req.params.prefix}`;
        fetch(URL + str, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": HOST,
                "x-rapidapi-key": API_KEY
            }
        })
            .then(response => response.json())
            .then((data) => {
                res.json(data.results);
            })
    }
    
    
    
    const fetchByID = (req, res) => {
        const detail = `/recipes/detail?id=${req.params.id}`;
        console.log("in FetchByID -->", detail);
        fetch(URL + detail, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": HOST,
                "x-rapidapi-key": API_KEY
            }
        })
            .then(response => response.json())
            .then((data) =>{
                res.json(data);
            }).catch(e => {
                console.log("error is -->", e);
        })
        
    }
    
    
    const fetchByTagAndIngredients= (req, res) => {
        // const recipeList = `/recipes/list?from=0&size=${req.params.size}&tags=${req.params.tag}&q=${req.params.ingredients}`;
        const recipeList = `/recipes/list?from=0&size=${req.params.size}&q=${req.params.ingredients}`;
    
        console.log("in fetchByTagAndIngredients -->", recipeList);
        fetch(URL + recipeList, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": HOST,
                "x-rapidapi-key": API_KEY
            }
        })
            .then(response => response.json())
            .then((data) =>{
                // console.log("fetchByTagAndIngredients -->", data);
                res.json(data);
            }).catch(e => {
            console.log("error is -->", e);
        })
        
    }
    
   
    // const fetchTrendingList = (req, res) =>{
    //     const trendingList = `/feeds/list?size=1&timezone=%2B0700&vegetarian=false&from=0`;
    //     console.log("in fetchTrendingList -->", trendingList);
    //     fetch(URL + trendingList, {
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-host": HOST,
    //             "x-rapidapi-key": API_KEY
    //         }
    //     })
    //         .then(response => response.json())
    //         .then((data) =>{
    //             // console.log("fetchTrendingList data-->", data);
    //             res.json(data);
    //         }).catch(e => {
    //         console.log("error is -->", e);
    //     })
    // }
    
    
    const addTrendingToDB = () => {
        const trending= `/feeds/list?size=1&timezone=%2B0700&vegetarian=false&from=0`;
            console.log("in fetchTrendingList -->", trending);
            fetch(URL + trending, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": HOST,
                    "x-rapidapi-key": API_KEY
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log("before process data ----")
                    processRecipe(data.results);
                    console.log("DONE process data ----")
                })
                .catch(err => {
                    console.error(err);
                });
        
    }
    
    const processRecipe = (data) => {
        for(let i = 1; i < 8; i++) { // item is an object
            let firstObject = data[i];
                let recipeList = firstObject.items;  // item.items is an array;
                recipeList.forEach((recipe) => {  // recipe is an object
                    const newRecipe = {
                        ID: recipe.id,
                        thumbnail_url: recipe.thumbnail_url,
                        name: recipe.name,
                        description: recipe.description,
                        num_servings: recipe.num_servings,
                        author_name: recipe.credits[0].name
                    }
                     dao.createRecipe(newRecipe);
                })
            }
        }
    
    
    const fetchFromDB = (req, res) =>{
       // addTrendingToDB();
       dao.findAllRecipes()
           .then(recipes => res.json(recipes));
        
    }
    
    
    
    
    
    const fetchTagList = (req, res) =>{
        const tag = "/tags/list";
        fetch(URL + tag, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": HOST,
                "x-rapidapi-key": API_KEY
            }
        })
            .then(response => response.json())
            .then((data) =>{
                // console.log("fetchTagList data-->", data);
                res.json(data);
            }).catch(e => {
            console.log("error is -->", e);
        })
        
        
    }
    
    app.get("/:prefix", fetchSearchResult); // auto-complete
    app.get("/details/:id", fetchByID); // recipe-details
    // app.get("/list/:size/:tag/:ingredients", fetchByTagAndIngredients); // recipe list
    app.get("/list/:size/:ingredients", fetchByTagAndIngredients); // recipe list
    
    // app.get("/trending/1", fetchTrendingList); // feed/list
    app.get("/tag/list", fetchTagList); // tag list
    app.get("/trending/1", fetchFromDB); // feed/list
    
    
}

