<style lang="scss" src="./Deck.scss"></style>

<template>
  <ul class="deck">
    <li v-for="card in deck" :key="card.cardId">
      <div class="wrapper-data-card">
        <img :src="card.img" alt />
        <div>
          <p>{{ card.name }}</p>
          <p>Type: {{ card.type }}</p>
          <p v-if="card.cost">Type: {{ card.cost }}</p>
        </div>
      </div>
      <button v-on:click="removeCardDeck(card.cardId)">
        <img src="~assets/img/icons/trash.svg" alt />
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    cards() {
      return this.$store.state.card.list;
    },
    deck() {
      return this.cards.filter(({ cardId }) =>
        this.$store.state.user.deck.includes(cardId)
      );
    }
  },
  methods: {
    removeCardDeck(idCard) {
      this.$store.commit('user/removeCard', idCard);
    }
  }
};
</script>
