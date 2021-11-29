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