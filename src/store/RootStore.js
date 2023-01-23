import { createContext } from "react";

import PokemonStore from "./PokemonStore";

class RootStore {
  constructor() {
    this.pokemonStore = new PokemonStore()
  }
}

export { RootStore }

const RootStoreContext = createContext(new RootStore())

export default RootStoreContext