const fetch = require("node-fetch");
const URL = "https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=chicken%20soup";
const API_KEY = 'bc4fe255dcmsh226f8341d7ebb53p169a42jsn58714141d5e1';
const HOST = 'tasty.p.rapidapi.com';

module.exports = (app) =>  {
    const fetchData = (req, res) => {
     
    
        fetch(URL, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": HOST,
                "x-rapidapi-key": API_KEY
            }
        })
            .then(response =>
                response.json()
            )
            .then((data) =>{
                console.log("fetchData", data.results);
                res.json(data.results);
            } )
    }
    
    app.get("/123", fetchData);
}

