<style lang="scss" src="./ListCard.scss"></style>

<template>
  <div v-if="!isFetching" class="wrapper-list-cards">
    <ul>
      <li v-for="card in filterCards()" :key="card.cardId">
        <img :src="card.img" alt />
        <p>{{ card.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
const mappingCards = (cards) => cards.filter(({ img }) => img);

export default {
  props: {
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
    }
  },
  data: () => ({
    cards: [],
    nbrResult: 24,
    isFetching: true
  }),
  methods: {
    async fetchTracks() {
      this.$axios.setHeader(
        'x-rapidapi-host',
        'omgvamp-hearthstone-v1.p.rapidapi.com'
      );
      this.$axios.setHeader(
        'x-rapidapi-key',
        'c7c6a2e2bemshdae4429f66a722bp1e27f3jsn2aa7a457e972'
      );

      const cards = await this.$axios.$get(
        `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/Basic?locale=frFR`
      );

      this.cards = mappingCards(cards);
      this.isFetching = false;
      console.log('this', this.cards);
    },
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
    }
  },
  mounted() {
    this.fetchTracks();
    this.onScrollBottom();
  }
};
</script>
