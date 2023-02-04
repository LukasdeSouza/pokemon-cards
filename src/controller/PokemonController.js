
import { baseUrl } from "../services/baseUrl";

import PokemonStore from "../store/PokemonStore";


class PokemonController {
  store = new PokemonStore()

  constructor(store) {
    this.store = store
  }

  async fetchPokemon(page) {
    this.store.setState('loading', true)

    setTimeout(() => {
      fetch(`${baseUrl}-form/${page}`)
        .then((data) => data.json()
          .then((res) => this.store.setState('pokemon', res)))
        .finally(() => {
          this.store.setState('loading', false)
        })
    }, 500)

  }

}

export default PokemonController
