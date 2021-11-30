import React, { useEffect, useState } from 'react';
import service from './service'


const Show = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [recipe, setRecipe] = useState({});
    const [listByIngredients, setListByIngredients] = useState([]);
    const [trendingList, setTrendingList] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [finalList] = useState([]);
    
    
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
    
    
    useEffect(() =>
        service.fetchSearchResult()
            .then(data => setSearchResult(data)), []);
    
    
    useEffect(() =>
        service.fetchByID()
            .then(data => setRecipe(data)), []);
    
   
    useEffect(() =>
        service.fetchByTagAndIngredients()
            .then(data =>setListByIngredients(data)), []);
    
    useEffect(() =>
        service.fetchTrendingList()
            .then(data =>{
                
              
                setTrendingList(data.results.slice(1,8));
                generateList(trendingList);
            }), []);
    
    
    
    //
    // useEffect(() =>
    //     service.fetchTagList()
    //         .then(data =>setTagList(data)), []);

    // console.log("recipe-->", recipe);
    // console.log("listByIngredients --->", listByIngredients);
    console.log("trendingList -->", trendingList);
    // console.log("type chek-->", typeof trendingList);
    // console.log("tagList -->", tagList);
    
    // const getRecommend = (origin) => {
    //     const randInt = getRandomInt(0, 6, origin);
    //     // console.log("The randInt is -->", randInt);
    //     setRecommend(trendingList[randInt]);
    // }
    
    console.log("------------ final list--------", finalList);
    
    
    
    const generateList = (trendingList) =>{
        console.log(" inside generateList");
        for (const singleObject in trendingList) {
            for (const insideObject in singleObject.items) {
                finalList.push(insideObject.id);
            }
        }
        console.log(finalList);
        console.log(" DONE generateList");

    }
    
    
    
    
    return(
        <>
            <p>{searchResult.length}</p>
            <ul className="">
                {searchResult.map(item => (
                    <li key={item.display} >
                        
                        <p>Display: {item.display}</p>
                        <p>Search_value: {item.search_value}</p>
                     
              
                    </li>
                ))}
            </ul>
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