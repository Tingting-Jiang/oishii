import {BrowserRouter, Route, Routes} from 'react-router-dom';

import './App.css';
// import RecipeScreen from './components/RecipeScreen/RecipeScreen'
// import ExploreAndTrending from './components/HomeScreen/ExploreAndTrending'

import Login from './components/LoginAndRegister/LoginScreen';
import Register from './components/LoginAndRegister/RegisterScreen/';

import Register2 from './components/LoginAndRegister/RegisterScreen/Register';
import Login2 from './components/LoginAndRegister/LoginScreen/LoginScreen';


import Home from './components/HomeScreen/';
import Footer from "./components/Footer";
import Search from './components/SearchScreen';
import SearchDetail from "./components/RecipeScreen";

import Profile from "./components/ProfileScreen";

// import Profile2 from "./components/ProfileScreen/Profile";

import Create from './components/CreateScreen';


import CreateScreen from './components/CreateScreen/createScreen';

import RecipeScreen from './components/RecipeScreen'

import EditProfile from './components/ProfileScreen/EditProfile';
import { CookiesProvider } from "react-cookie";

import LoginOld from './components/LoginAndRegister/LoginScreen/LoginScreen'
import CreateNew from './components/CreateScreen/create'

import {Provider} from "react-redux";
import userReducer from "./components/reducers/userReducer";
import {createStore} from "redux";




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

        <Provider store={createStore(userReducer)}>
            <CookiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/search" element={<Search/>} exact={true}/>
                        <Route path="/search/:searchTerm" element={<Search/>} exact={true}/>
                        <Route path="/details/:id" element={<SearchDetail/>} exact={true}/>
                        <Route path="/profile" element={<Profile/>} exact={true}/>
                        <Route path="/profile/:id" element={<Profile/>} exact={true}/>

                        <Route path="/login" element={<Login/>} exact={true}/>
                        <Route path="/login2" element={<Login2/>} exact={true}/>

                        <Route path="/register" element={<Register/>} exact={true}/>
                        <Route path="/create" element={<Create/>} exact={true}/>

                        <Route path="/register2" element={<Register2/>} exact={true}/>
                        {/*<Route path="/profile" element={<ProfileScreen/>} exact={true}/>*/}

                        <Route path="/details/:id" element={<RecipeScreen/>} exact={true}/>
                        <Route path="/create2" element={<CreateScreen/>} exact={true}/>
                        <Route path="/editProfile" element={<EditProfile/>} exact={true}/>

                        {/*<Route path="/create" element={<CreateScreen/>} exact={true}/>*/}


                        {/*<Route path="/details/:id" element={<RecipeScreen/>} exact={true}/>*/}
                        {/*<Route path="/home1" element={<Header/>} exact={true}/>*/}
                        {/*<Route path="/recipe/detail" element={<RecipeScreen/>} exact={true}/>*/}
                        {/*<Route path="/oldhome" element={<ExploreAndTrending/>} exact={true}/>*/}
                    </Routes>
                    <Footer />
                </BrowserRouter>

                {/*<Show/>*/}
                {/*<RecipeScreen recipeID={5679}/>*/}
                {/*<ExploreAndTrending/>*/}

            </CookiesProvider>
        </Provider>


    );
}

export default App;
