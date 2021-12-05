const fetch = require("node-fetch");

const API_KEY = 'bc4fe255dcmsh226f8341d7ebb53p169a42jsn58714141d5e1';
const URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";

// const API_KEY ="8aacabbec3msh0d6aaeca6a49cb0p128f31jsn0c6ed3c6e8d0";

const HOST = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';


module.exports = (app) =>  {
    
    const fetchSearchResult = (req, res) => {
        const str = `/recipes/autocomplete?query=${req.params.key}&number=10`;
        // console.log("Auto complet =>", req.params.key);
        fetch(URL + str, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": HOST,
                "x-rapidapi-key": API_KEY
            }
        })
            .then(response => response.json())
            .then((data) => {
                // console.log("search result -->", data);
                res.json(data);
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
    
    
    const fetchByIngredients= (req, res) => {
        const recipeList = `/recipes/findByIngredients?ingredients=${req.params.ingredients}&number=12&ignorePantry=true&ranking=1`;
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
        const instruction = `/recipes/${req.params.id}/analyzedInstructions?stepBreakdown=true`;
        console.log("in fetchInstruction -->", instruction);
        fetch(URL + instruction, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": HOST,
                "x-rapidapi-key": API_KEY
            }
        })
            .then(response => response.json())
            .then((data) =>{
                // console.log("fetchInstruction data-->", data);
                res.json(data);
            }).catch(e => {
            console.log("error is -->", e);
        })
    }
    
    

    const fetchSimilar = (req, res) =>{
        const similar = `/recipes/${req.params.id}/similar`;
        fetch(URL + similar, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": HOST,
                "x-rapidapi-key": API_KEY
            }
        })
            .then(response => response.json())
            .then((data) =>{
                // console.log("fetchSimilar data-->", data);
                res.json(data);
            }).catch(e => {
            console.log("error is -->", e);
        })
        
        
    }
    
    
    const fetchRandom = (req, res) =>{
        const random = `/recipes/random?number=4`;
        
        console.log("in random -->", random);
        fetch(URL + random, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": HOST,
                "x-rapidapi-key": API_KEY
            }
        })
            .then(response => response.json())
            .then((data) =>{
                // console.log("fetchRandom data-->", data);
                res.json(data);
            }).catch(e => {
            console.log("error is -->", e);
        })
        
        
    }
    
    
    
    
    
    app.get("/search/:key", fetchSearchResult); // auto-complete
    app.get("/details/:id", fetchInfoByID); // recipe-details(ingredients & instructions)
    app.get("/ingredients/:ingredients", fetchByIngredients); // recipe list
    app.get("/trending", fetchRandom); // trending and latest
    app.get("/similar/: id", fetchSimilar); // similar recipe list
    app.get("/instruction/:id", fetchInstruction); // only have instruction
    
    
}

