import React, { useEffect, useState } from 'react';
import service from './service'


const Show = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [recipe, setRecipe] = useState({});
    const [listByIngredients, setListByIngredients] = useState([]);
    const [trendingList, setTrendingList] = useState([]);
    
    const searchRecipe = (event) =>
        service.fetchSearchResult(event.target.value)
            .then(data => setSearchResult(data));


    const findRecipeByID =(recipe)=>
        service.fetchByID(recipe.id)
            .then(data => setRecipe(data));
    
   
    const searchByIngredient = (event) =>
        service.fetchByTagAndIngredients(event.target.value)
            .then(data =>setListByIngredients(data));

    // useEffect(() =>
    //     service.fetchTrendingList()
    //         .then(data =>{
    //             setTrendingList(data);
    //             // generateList(trendingList);
    //         }), []);

    
    console.log("recipe-->", recipe);
    console.log("search result-->", searchResult);
    // console.log("listByIngredients --->", listByIngredients);
    // console.log("trendingList -->", trendingList);
    // console.log("type chek-->", typeof trendingList);
    
    
    return(
        <>
            <div>
                <h2>Recipes</h2>
                <ul className="list-group">
                    <li className="list-group-item">
                        <input
                            onChange={e => searchRecipe(e)}
                            // defaultValue={movie.title}
                            className="form-control"
                            // style={{ width: "60%" }}
                        />
                        <button
                            onClick={e => searchByIngredient(e)}
                            className="btn btn-success"
                            // style={{ width: "15%" }}
                        >
                            Search
                        </button>
                    </li>
                    </ul>
                </div>
            
             <p>{searchResult.length}</p>
             <ol className="">
                 {searchResult.map(item => (
                     <li key={item.display} >
                        
                         {/*<p>Display: {item.display}</p>*/}
                         <p>Search_value: {item.search_value}</p>
              
                     </li>
                 ))}
             </ol>
             <hr/>
           <p>{recipe.created_at}</p>
            
            {/*<p>{recommend.name}</p>*/}
            
            {/*<ul className="">*/}
            {/*    {recipe.instructions.map(item => (*/}
            {/*        <li key={item.id} >*/}
            {/*    */}
            {/*            <p>{item.display_text}</p>*/}
            
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
            <hr/>
      
            
           
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