import logo from './logo.svg';
import './App.css';
import Show from './components/service/Show'
import RecipeScreen from './components/RecipeScreen/RecipeScreen'
import ExploreAndTrending from './components/HomeScreen/ExploreAndTrending'

function App() {
  return (
    <div className="container">
        {/*<Show/>*/}
        {/*<RecipeScreen recipeID={5679}/>*/}
        <ExploreAndTrending/>
    </div>
  );
}

export default App;
