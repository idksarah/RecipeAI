import { GPTRecipe } from "./GPTRecipe";
import { createSignal } from 'solid-js';
import Recipe from "./Recipe";
import './App.css';

function ChooseRecipe() {
    const [ingredients, setIngredients] = createSignal("");
    const [recipe, setRecipe] = createSignal({
        preparationMethod: "",
        nutritionalInformations: "",
        dishName: ""
    });
    const [loading, setLoading] = createSignal(false);
    const [showingRecipe, setShowingRecipe] = createSignal(false);

    async function getRecipe() {
        setLoading(true);
        let response = await GPTRecipe(ingredients());
        setRecipe(response);
        setLoading(false);
    }

    return (
        <>
            {!showingRecipe() ? ( 
                <>
                  <div class="container">
                    <p class="whatinyofridge">What's in your fridge?</p>
                    <p class="cooksomethin">Let's cook something!</p>
                      <div class="recipeInput">
                        <textarea
                              value={ingredients()}
                              onChange={(ev) => setIngredients(ev.target.value)}
                          ></textarea>
                          <button onClick={getRecipe} disabled={loading()}>
                              Get
                          </button>
                      </div>
                        {!loading() && recipe().preparationMethod && (
                            <div class="goToRecipe">
                                <p class="bg-gray-100">Let's make <span class="dishName">{recipe().dishName}</span>!</p>
                                <div class="buttons">
                                    <button class="btn" onClick={() => setShowingRecipe(true)}>Next</button>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            ) : ( 
                <Recipe json={JSON.stringify(recipe())} />
            )}
        </>
    );
}

export default ChooseRecipe;
