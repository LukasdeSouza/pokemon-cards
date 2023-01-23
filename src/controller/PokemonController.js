
import { baseUrl } from "../services/baseUrl";

import PokemonStore from "../store/PokemonStore";


class PokemonController {
  store = new PokemonStore()

  constructor(store) {
    this.store = store
  }

  async fetchPokemon(page) {
    this.store.setState('loading', true)

    await fetch(`${baseUrl}-form/${page}`)
      .then((data) => data.json()
        .then((res) => this.store.setState('pokemon', res)))
  }


}

export default PokemonController
