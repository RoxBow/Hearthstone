<style lang="scss" src="./ListCard.scss"></style>

<template>
  <ul class="list-card">
    <li v-for="card in filterCards()" :key="card.cardId">
      <button
        v-bind:disabled="!isSelectable"
        v-on:click="addCardToDeck(card.cardId)"
      >
        <img :src="card.img" alt />
        <p>{{ card.name }}</p>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    cards: {
      type: Array
    },
    searchName: {
      type: String,
      default: ''
    },
    selectedClass: {
      type: String,
      default: ''
    },
    selectedType: {
      type: String,
      default: ''
    },
    isSelectable: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    nbrResult: 24
  }),
  methods: {
    filterCards() {
      return this.cards
        .slice(0, this.nbrResult)
        .filter(
          (card) =>
            card.name.toLowerCase().includes(this.searchName.toLowerCase()) &&
            card.playerClass
              .toLowerCase()
              .includes(this.selectedClass.toLowerCase()) &&
            card.type.toLowerCase().includes(this.selectedType.toLowerCase())
        );
    },
    seeMore() {
      this.nbrResult = this.nbrResult + 25;
    },
    onScrollBottom() {
      window.onscroll = () => {
        const scrollToBottom =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (scrollToBottom) this.seeMore();
      };
    },
    addCardToDeck(idCard) {
      this.$store.commit('user/addCard', idCard);
    }
  },
  mounted() {
    this.onScrollBottom();
  }
};
</script>
