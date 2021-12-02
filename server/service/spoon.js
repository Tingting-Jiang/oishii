const fetch = require("node-fetch");
// const URL = "https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=chicken%20soup";
// const API_KEY = 'bc4fe255dcmsh226f8341d7ebb53p169a42jsn58714141d5e1';
const URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";

const API_KEY ="8aacabbec3msh0d6aaeca6a49cb0p128f31jsn0c6ed3c6e8d0";

const HOST = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';


module.exports = (app) =>  {
    
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
    
    
    
    const fetchInfoByID = (req, res) => {
        const detail = `/recipes/${req.params.id}/information`;
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
    
   
    const fetchInstruction = (req, res) =>{
        const trendingList = `/recipes/${req.params.id}/analyzedInstructions?stepBreakdown=true`;
        console.log("in fetchInstruction -->", trendingList);
        fetch(URL + trendingList, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": HOST,
                "x-rapidapi-key": API_KEY
            }
        })
            .then(response => response.json())
            .then((data) =>{
                // console.log("fetchTrendingList data-->", data);
                res.json(data);
            }).catch(e => {
            console.log("error is -->", e);
        })
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
    app.get("/details/:id", fetchInfoByID); // recipe-details
    // app.get("/list/:size/:tag/:ingredients", fetchByTagAndIngredients); // recipe list
    app.get("/list/:size/:ingredients", fetchByTagAndIngredients); // recipe list
    
    // app.get("/trending/1", fetchTrendingList); // feed/list
    app.get("/tag/list", fetchTagList); // tag list
    app.get("/instruction/:id", fetchInstruction); // feed/list
    
    
}

