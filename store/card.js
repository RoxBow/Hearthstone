export const state = () => ({
  list: []
});

export const mutations = {
  setCards(state, cards) {
    state.list = cards;
  }
};
