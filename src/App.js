import logo from './logo.svg';
import './App.css';
import Show from './components/service/Show'
import RecipeScreen from './components/RecipeScreen/RecipeScreen'
import ExploreAndTrending from './components/HomeScreen/ExploreAndTrending'
import Login from './components/LoginScreen1/LoginScreen'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Register from './components/LoginScreen/Register'
import Profile from './components/ProfileScreen/Profile'

import Home from './components/HomeScreen';

function App() {
  return (
    <div className="container">
            <BrowserRouter>
                <Routes>
            
                    <Route path="/" element={<ExploreAndTrending/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/recipe/:id" element={<RecipeScreen/>}/>

                    <Route path="/home" element={<Home/>} />

                </Routes>
            </BrowserRouter>
        
         {/*<Show/>*/}
        
        
        {/*<RecipeScreen recipeID={5679}/>*/}
        {/*<ExploreAndTrending/>*/}
       
    </div>
  );
}

export default App;
