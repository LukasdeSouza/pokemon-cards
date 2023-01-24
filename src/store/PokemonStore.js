import { action, makeAutoObservable, observable, computed } from "mobx";

class PokemonStore {

  state = {
    pokemon: [],
    page: 1,
    loading: false,
  }
  alert = {
    open: false,
    message: '',
    type: 'success'
  }

  constructor() {
    makeAutoObservable(this, {
      state: observable,
      pagination: observable,
      filters: observable,

      setState: action,
      setAlert: action,
      setPagination: action,

    })
  }



  setState(key, value) {
    this.state[key] = value
  }

  setAlert(open, type, message) {
    this.alert.open = open;

    if (type) {
      this.alert.type = type;
      this.alert.message = message;
    }
  }
}

export default PokemonStore