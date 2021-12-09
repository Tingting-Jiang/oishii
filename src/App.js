
import './App.css';
import Show from './components/service/Show'
import RecipeScreen from './components/RecipeScreen/RecipeScreen'
import ExploreAndTrending from './components/HomeScreen/ExploreAndTrending'
import Login from './components/LoginScreen1/LoginScreen'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Register from './components/LoginScreen/Register'
import Profile from './components/ProfileScreen/Profile'

import Home from './components/HomeScreen';
import Header from './components/Header'
import CreateScreen from './components/CreateScreen/createScreen';
import {  createStore } from 'redux'
import userReducer from './components/service/reducers/userReducer'
import { Provider } from 'react-redux'
import SearchScreen from './components/SearchScreen/SearchScreen'

const store = createStore(userReducer);


function App() {
  return (
      <Provider store={store}>
    
      <div>
            <BrowserRouter>
                <Routes>
            
                    <Route path="/" element={<ExploreAndTrending/>} exact={true}/>
                    <Route path="/login" element={<Login/>} exact={true} />
                    <Route path="/register" element={<Register/>} exact={true} />
                    <Route path="/profile" element={<Profile/>} exact={true} />
                    <Route path="/details/:id" element={<RecipeScreen/>} exact={true} />
                    <Route path="/create" element={<CreateScreen/>} exact={true} />
                    <Route path="/search" element={<SearchScreen/>} exact={true} />
                    <Route path="/search/:searchTerm" element={<SearchScreen/>} exact={true} />
    
    
                    <Route path="/home" element={<Home/>} exact={true} />
                    <Route path="/home1" element={<Header/>} exact={true} />
                    {/*<Route path="/recipe/detail:id" element={<RecipeScreen/>} exact={true} />*/}
    



                </Routes>
            </BrowserRouter>
        
         {/*<Show/>*/}
        
        
        {/*<RecipeScreen recipeID={5679}/>*/}
        {/*<ExploreAndTrending/>*/}
       
    </div>
      </Provider>
  );
}

export default App;
