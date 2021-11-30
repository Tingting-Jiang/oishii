// useEffect(() =>{
//     fetch("https://tasty.p.rapidapi.com/recipes/detail?id=5580", {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "tasty.p.rapidapi.com",
//             "x-rapidapi-key": "bc4fe255dcmsh226f8341d7ebb53p169a42jsn58714141d5e1"
//         }
//     })
//         .then(response => response.json())
//         .then((data) =>{
//             console.log("in useEffect: ----", data);
//             setRecipe(data);
//                         } )}, []);



// const getRandomInt = (min, max, origin) =>{
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     let newInt = Math.floor(Math.random() * (max - min + 1) + min);
//     while (newInt === origin){
//         newInt = Math.floor(Math.random() * (max - min + 1) + min);
//     }
//     return newInt;
// }
//


// import { useState } from 'react'
//
// const [tagList, setTagList] = useState([]);

// useEffect(() =>
//     service.fetchTagList()
//         .then(data =>setTagList(data)), []);
