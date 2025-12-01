import { makeAutoObservable } from "mobx";

class SpotlightStore {
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSpotlight(user) {
    this.user = user;
  }
}

export const spotlightStore = new SpotlightStore();
