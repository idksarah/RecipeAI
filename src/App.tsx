import { createSignal } from 'solid-js'
import './App.css'
import { render } from 'solid-js/web';
import { fetchGPTResponse } from './fetchGPTResponse';

function App() {
    async function getRecipe() {
        setLoading(true);
      
        const response = await fetchGPTResponse(ingredients());
        setRecipe(response);
        setLoading(false);
      }

    const [ingredients, setIngredients] = createSignal("");
    const [recipe, setRecipe] = createSignal({
      preparationMethod: "",
      nutritionalInformations: "",
    });
    const [loading, setLoading] = createSignal(false);

  return (
    <div class="bg-white shadow-md rounded-lg p-8 m-auto max-w-lg">
      <textarea
        value={ingredients()}
        onChange={(ev) => setIngredients(ev.target.value)}
      ></textarea>
      <button onClick={getRecipe} disabled={loading()}>
        Get
      </button>
      {!loading() && recipe().preparationMethod && (
        <>
          <p class="bg-gray-100">{recipe().preparationMethod}</p>
          <p class="bg-gray-100">{recipe().nutritionalInformations}</p>
        </>
      )}
      {}
    </div>
  )
}

export default App
