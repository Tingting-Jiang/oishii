import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import './App.css';
// import RecipeScreen from './components/RecipeScreen/RecipeScreen'
// import ExploreAndTrending from './components/HomeScreen/ExploreAndTrending'
import Login from './components/LoginScreen1/LoginScreen'
import Register from './components/LoginScreen/Register'
import Profile from './components/ProfileScreen/Profile'

import Home from './components/HomeScreen/';
import Footer from "./components/Footer";
import Search from './components/SearchScreen';
import SearchDetail from "./components/RecipeScreen";

import CreateScreen from './components/CreateScreen/createScreen';

import userReducer from './components/service/reducers/userReducer';
import RecipeScreen from './components/RecipeScreen'
import EditProfile from './components/ProfileScreen/EditProfile';
import { CookiesProvider } from "react-cookie";


const store = createStore(userReducer);


function App() {
    return (
        <CookiesProvider>
        <Provider store={store}>
            

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/search" element={<Search/>} exact={true}/>
                    <Route path="/search/:searchTerm" element={<Search/>} exact={true}/>
                    <Route path="/details/:id" element={<SearchDetail/>} exact={true}/>

                    <Route path="/login" element={<Login/>} exact={true}/>
                    <Route path="/register" element={<Register/>} exact={true}/>
                    <Route path="/profile" element={<Profile/>} exact={true}/>

                    <Route path="/details/:id" element={<RecipeScreen/>} exact={true}/>
                    <Route path="/create" element={<CreateScreen/>} exact={true}/>
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


        </Provider>
        </CookiesProvider>
    );
}

export default App;
