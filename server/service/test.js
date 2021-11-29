const fetch = require("node-fetch");
// const URL = "https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=chicken%20soup";
const API_KEY = 'bc4fe255dcmsh226f8341d7ebb53p169a42jsn58714141d5e1';
const URL = "https://tasty.p.rapidapi.com/recipes";

const HOST = 'tasty.p.rapidapi.com';

module.exports = (app) =>  {
    const fetchSearchResult = (req, res) => {
        const str = `/auto-complete?prefix=${req.params.prefix}`;
        // console.log("in fetchSearchResult -->", URL + str);
    
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
        const detail = `/detail?id=${req.params.id}`;
        console.log("in fetchByID -->", URL + detail);
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
    
    app.get("/:prefix", fetchSearchResult);
    app.get("/details/:id", fetchByID);
    
}

