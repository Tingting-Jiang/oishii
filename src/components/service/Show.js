import React, { useEffect, useState } from 'react';
import recipeService from './recipeService'


const Show = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [recipeList, setRecipeList] = useState([]);
   
    
    const searchRecipe = (event) =>{
        setSearchTerm(event.target.value);
        recipeService.fetchSearchResult(event.target.value)
            .then(data => setSearchResult(data))
    };


    // const findRecipeByID =(recipe)=>
    //     service.fetchByID(recipe.id)
    //         .then(data => setRecipeDetail(data));
    
   
    const searchByIngredient = () =>
        recipeService.fetchByIngredients(searchTerm)
            .then(data =>setRecipeList(data));
    
    
    // console.log("recipe-->", recipeList);
    console.log("search result-->", searchResult);
  
    
    
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
                            <option value={item.title} >
                            </option>
                        ))}
                
            </datalist>
   
                <button
                    onClick={e => searchByIngredient(e)}
                    className="btn btn-primary float-end"
                >
                    Search
                </button>
             <hr/>
            
            <ul className="">
                {recipeList.map(item => (
                    <li key={item.id} >
                        
                        <p>{item.title} {item.id}</p>
            
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