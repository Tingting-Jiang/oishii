import React, { useEffect, useState } from 'react';
import {fetchData} from "./FetchData";


const Show = () => {
    const [data, setData] = useState([]);
    useEffect(() => fetchData().then(data=> setData(data)), []);
    
    // useEffect(() => {
    //         fetch("https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=chicken%20soup", {
    //             "method": "GET",
    //             "headers": {
    //                 "x-rapidapi-host": "tasty.p.rapidapi.com",
    //                 "x-rapidapi-key": "bc4fe255dcmsh226f8341d7ebb53p169a42jsn58714141d5e1"
    //             }
    //         })
    //             .then(response =>
    //                 // console.log(response);
    //                 response.json()
    //             )
    //             .then((data) =>{
    //                 console.log("in useEffect: ----", data.results);
    //                 setData(data.results);
    //             } )}
    //     ,[]);
    
    
    
    
    console.log(data);
    
    return(
        <>
            <p>{data.length}</p>
            <ul className="">
                {data.map(item => (
                    <li  >
                        
                        <p>Display: {item.display}</p>
                        <p>Search_value: {item.search_value}</p>
                        <p>type: {item.type}</p>
              
                    </li>
                ))}
            </ul>
            
           
        </>
    )
}
export default Show;