const fetch = require("node-fetch");
// const URL = "https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=chicken%20soup";
// const API_KEY = 'bc4fe255dcmsh226f8341d7ebb53p169a42jsn58714141d5e1';
const URL = "https://tasty.p.rapidapi.com";

const API_KEY ="8aacabbec3msh0d6aaeca6a49cb0p128f31jsn0c6ed3c6e8d0";

const HOST = 'tasty.p.rapidapi.com';

module.exports = (app) =>  {
    const getRandomInt = () =>{
        let min = Math.ceil(0);
        let max = Math.floor(10);
        return Math.floor(Math.random() * (10 - 0 + 1) + 0);
    }
    
    
    
    const fetchSearchResult = (req, res) => {
        const str = `/recipes/auto-complete?prefix=${req.params.prefix}`;
        // console.log("in fetchSearchResult -->", str);
    
        fetch(URL + str, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": HOST,
                "x-rapidapi-key": API_KEY
            }
        })
            .then(response => response.json())
            .then((data) => {
                // console.log("fetchData", data.results);
                res.json(data.results);
            })
    }
    
    
    
    const fetchByID = (req, res) => {
        const detail = `/recipes/detail?id=${req.params.id}`;
        // console.log("in fetchByID -->", detail);
        fetch(URL + detail, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": HOST,
                "x-rapidapi-key": API_KEY
            }
        })
            .then(response => response.json())
            .then((data) =>{
                // console.log("fetchByID -->", data);
                res.json(data);
            }).catch(e => {
                console.log("error is -->", e);
        })
        
    }
    
    
    const fetchByTagAndIngredients= (req, res) => {
        const recipeList = `/recipes/list?from=0&size=${req.params.size}&tags=${req.params.tag}&q=${req.params.ingredients}`;
    
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
    
   
    const fetchTrendingList = (req, res) =>{
        const trendingList = `/feeds/list?size=1&timezone=%2B0700&vegetarian=false&from=0`;
        console.log("in fetchTrendingList -->", trendingList);
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
    app.get("/details/:id", fetchByID); // recipe-details
    app.get("/list/:size/:tag/:ingredients", fetchByTagAndIngredients); // recipe list
    app.get("/trending/1", fetchTrendingList); // feed/list
    app.get("/tag/list", fetchTagList); // tag list
    
    
}

