import logo from './logo.svg';
import './App.css';
// import Show from './components/service/Show'
// import RecipeScreen from './components/RecipeScreen/RecipeScreen'
// import ExploreAndTrending from './components/HomeScreen/ExploreAndTrending'
import Login from './components/LoginScreen/LoginScreen'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="container">
            <BrowserRouter>
                <Routes>
       
            {/*<Route path="/" element={<Home/>}/>*/}
            <Route path="/login" element={<Login/>}/>
            {/*<Route path="/register" element={<Register/>}/>*/}
            {/*<Route path="/profile" element={<Profile/>}/>*/}
                </Routes>
        </BrowserRouter>
        
        {/*<Show/>*/}
        {/*<RecipeScreen recipeID={5679}/>*/}
        {/*<ExploreAndTrending/>*/}
       
    </div>
  );
}

export default App;
