import { GPTRecipe } from "./GPTRecipe";
import { createSignal } from 'solid-js'
import showRecipe from "./Recipe";
import './App.css'

let response

function ChooseRecipe(){
    async function getRecipe() {
        setLoading(true);
        response = await GPTRecipe(ingredients());
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
    <>
    <p>What's in your fridge?</p>
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
    <div class="buttons">
        <button onClick={() => showRecipe(recipe().preparationMethod)}>Next</button>
    </div>
    </>
  )
}

export default ChooseRecipe