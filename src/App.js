import logo from './logo.svg';
import './App.css';
import Show from './components/service/Show'
import RecipeScreen from './components/RecipeScreen/RecipeScreen'

function App() {
  return (
    <div className="container">
        {/*<Show/>*/}
        <RecipeScreen recipeID={716429}/>
        
    </div>
  );
}

export default App;
