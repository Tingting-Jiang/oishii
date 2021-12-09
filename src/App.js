import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import './App.css';
import RecipeScreen from './components/RecipeScreen/RecipeScreen'
import ExploreAndTrending from './components/HomeScreen/ExploreAndTrending'
import Login from './components/LoginScreen1/LoginScreen'
import Register from './components/LoginScreen/Register'
import Profile from './components/ProfileScreen/Profile'

import Home from './components/HomeScreen/';
import Header from './components/Header'
import CreateScreen from './components/CreateScreen/createScreen';

import userReducer from './components/service/reducers/userReducer';

import SearchScreen from './components/SearchScreen/SearchScreen';
import Footer from "./components/Footer";

const store = createStore(userReducer);


function App() {
    return (
        <Provider store={store}>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/login" element={<Login/>} exact={true}/>
                    <Route path="/register" element={<Register/>} exact={true}/>
                    <Route path="/profile" element={<Profile/>} exact={true}/>
                    <Route path="/recipe/:id" element={<RecipeScreen/>} exact={true}/>
                    <Route path="/create" element={<CreateScreen/>} exact={true}/>
                    <Route path="/search" element={<SearchScreen/>} exact={true}/>

                    <Route path="/home1" element={<Header/>} exact={true}/>
                    <Route path="/recipe/detail" element={<RecipeScreen/>} exact={true}/>
                    <Route path="/oldhome" element={<ExploreAndTrending/>} exact={true}/>
                </Routes>
                <Footer />
            </BrowserRouter>

            {/*<Show/>*/}
            {/*<RecipeScreen recipeID={5679}/>*/}
            {/*<ExploreAndTrending/>*/}


        </Provider>
    );
}

export default App;
