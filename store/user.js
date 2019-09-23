export const state = () => ({
  username: '',
  deck: []
});

export const mutations = {
  setUsername(state, username) {
    state.username = username;
  },
  addCard(state, idCard) {
    state.deck.push(idCard);
  },
  removeCard(state, idCard) {
    state.deck.splice(state.deck.indexOf(idCard), 1);
  }
};
