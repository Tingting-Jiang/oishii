import {BrowserRouter, Route} from "react-router-dom";
import {CookiesProvider} from "react-cookie";
import './App.css';
import Main from "./components/Main";
import Footer from "./components/Main/Footer";
import React from "react";



function App() {
    return (

        // <CookiesProvider>
        //     <BrowserRouter>
        //         <Routes>
        //             <Route path="/" element={<Home/>}/>
        //             <Route path="/home" element={<Home/>}/>
        //             <Route path="/search" element={<Search/>} exact={true}/>
        //             <Route path="/search/:searchTerm" element={<Search/>} exact={true}/>
        //             <Route path="/details/:id" element={<SearchDetail/>} exact={true}/>
        //             <Route path="/profile" element={<Profile/>} exact={true}/>
        //             <Route path="/profile/:id" element={<Profile/>} exact={true}/>
        //
        //             <Route path="/login" element={<Login/>} exact={true}/>
        //             <Route path="/login2" element={<Login2/>} exact={true}/>
        //
        //             <Route path="/register" element={<Register/>} exact={true}/>
        //             <Route path="/create" element={<Create/>} exact={true}/>
        //
        //             <Route path="/register2" element={<Register2/>} exact={true}/>
        //             {/*<Route path="/profile" element={<ProfileScreen/>} exact={true}/>*/}
        //
        //             <Route path="/details/:id" element={<RecipeScreen/>} exact={true}/>
        //             <Route path="/create2" element={<CreateScreen/>} exact={true}/>
        //             <Route path="/editProfile" element={<EditProfile/>} exact={true}/>
        //             <Route path="/create3" element={<CreateNew/>} exact={true}/>
        //
        //             {/*<Route path="/create" element={<CreateScreen/>} exact={true}/>*/}
        //
        //
        //             {/*<Route path="/details/:id" element={<RecipeScreen/>} exact={true}/>*/}
        //             {/*<Route path="/home1" element={<Header/>} exact={true}/>*/}
        //             {/*<Route path="/recipe/detail" element={<RecipeScreen/>} exact={true}/>*/}
        //             {/*<Route path="/oldhome" element={<ExploreAndTrending/>} exact={true}/>*/}
        //         </Routes>
        //         <Footer />
        //     </BrowserRouter>
        //
        //     {/*<Show/>*/}
        //     {/*<RecipeScreen recipeID={5679}/>*/}
        //     {/*<ExploreAndTrending/>*/}
        //
        // </CookiesProvider>


        <CookiesProvider>
            <BrowserRouter>
                <Route path="/" >
                    <Main/>
                    <Footer/>
                </Route>

            </BrowserRouter>
        </CookiesProvider>


    );
}

export default App;
