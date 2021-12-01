import React, { useEffect, useState } from 'react';
import service from './service'


const Show = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [recipeList, setRecipeList] = useState([]);
    // const [listByIngredients, setListByIngredients] = useState([]);
    const [trendingList, setTrendingList] = useState([]);
    const [recipeDetail, setRecipeDetail] = useState({});
    
    const searchRecipe = (event) =>{
        setSearchTerm(event.target.value);
        service.fetchSearchResult(event.target.value)
            .then(data => setSearchResult(data))
    };


    const findRecipeByID =(recipe)=>
        service.fetchByID(recipe.id)
            .then(data => setRecipeDetail(data));
    
   
    const searchByIngredient = () =>
        service.fetchByTagAndIngredients(searchTerm)
            .then(data =>setRecipeList(data.results));

    // useEffect(() =>
    //     service.fetchTrendingList()
    //         .then(data =>{
    //             setTrendingList(data);
    //             // generateList(trendingList);
    //         }), []);

    
    console.log("recipe-->", recipeList);
    console.log("search result-->", searchResult);
    // console.log("listByIngredients --->", listByIngredients);
    // console.log("trendingList -->", trendingList);
    // console.log("type chek-->", typeof trendingList);
    
    
    return(
        <>
            <h2>Recipes</h2>
            <p>The length of search result: {searchResult.length}</p>
                <input
                    onChange={e => searchRecipe(e)}
                    className="form-control"
                    list="datalistOptions"
                    placeholder="Type to search..."
                />
            <datalist id="datalistOptions">
    
                {searchResult.map(item => (
                            <option value={item.search_value} >
                            </option>
                        ))}
                
            </datalist>
   
                <button
                    onClick={e => searchByIngredient(e)}
                    className="btn btn-primary float-end"
                >
                    Search
                </button>
               
            
            
             
             {/*// <ol className="">*/}
             {/*//     {searchResult.map(item => (*/}
             {/*//         <li key={item.display} >*/}
             {/*//*/}
             {/*//             /!*<p>Display: {item.display}</p>*!/*/}
             {/*//             <p>Search_value: {item.search_value}</p>*/}
             {/*//*/}
             {/*//         </li>*/}
             {/*//     ))}*/}
             {/*// </ol>*/}
             <hr/>
      
            
            {/*<p>{recommend.name}</p>*/}
            
            <ul className="">
                {recipeList.map(item => (
                    <li key={item.id} >
                        
                        <p>{item.name} {item.id}</p>
            
                    </li>
                ))}
            </ul>
      
            
           
        </>
    )
}
export default Show;

// Trending
//1. Weekly Meal Planning Made Easy  -> 6 recipes
//2. Trending  -> 8 recipes
//3. Popular Recipes This Week  -> 8 recipes



//Recommendation
//4. Fall Sweets -> 8 recipes
//5. Squash for Dinner -> 8 recipes
//6. Pancakes -> 8 recipes
//7. Breakfast Cups -> 8 recipes