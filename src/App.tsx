
import './App.css'
import { render } from 'solid-js/web';
import { fetchGPTResponse } from './fetchGPTResponse';
import ChooseRecipe from './ChooseRecipe';
import showRecipe from './Recipe';
import {tts} from './tts'
import getUserAudio from './getUserAudio';

function App() {
  return(
    // ChooseRecipe()
    // showRecipe(`{
    //     "preparationMethod": "1. Soak 300g of tteok (Korean rice cakes) in warm water for about 30 minutes to soften them. 2. In a saucepan, combine 3 cups of water, 2 tablespoons of gochujang (Korean chili paste), 2 tablespoons of sugar, and 1 tablespoon of soy sauce. Stir well and bring to a boil over medium heat. 3. Once boiling, add the soaked tteok to the saucepan and cook for about 10 minutes, stirring occasionally until the tteok become soft and chewy. 4. Add 100g of fish cakes and 1/2 cup of diced onion to the saucepan and continue cooking for another 5 minutes. 5. If desired, add 1/2 cup of sliced green onions and sesame seeds for garnish before serving. 6. Serve hot and enjoy your homemade tteokbokki!"
    // }`)
    getUserAudio()
  )
}

export default App
