import React, { useEffect, useState } from 'react';
import service from './service'


const Show = () => {
    const [data, setData] = useState([]);
    useEffect(() => service.fetchSearchResult().then(data => setData(data)), []);
    
    const[recipe, setRecipe] = useState({});
    useEffect(() => service.fetchByID().then(data => {
        // console.log("in useEffect: ----", data);
        setRecipe(data);
    }), []);
    
    console.log("recipe-------", recipe);
    
    
    return(
        <>
            <p>{data.length}</p>
            <ul className="">
                {data.map(item => (
                    <li key={item.display} >
                        
                        <p>Display: {item.display}</p>
                        <p>Search_value: {item.search_value}</p>
                        <p>type: {item.type}</p>
              
                    </li>
                ))}
            </ul>
            <hr/>
            
            
           <p>{recipe.created_at}</p>
    
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