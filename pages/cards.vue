<style lang="scss" src="../assets/css/pages/cards.scss"></style>

<template>
  <div class="container-cards">
    <h1>Bonjour {{ username }},</h1>
    <h2>Voici la liste des cartes</h2>
    <div class="wrapper-choice">
      <form @submit.prevent="false">
        <div>
          <label for="name">Recherche</label>
          <input
            id="name"
            v-model="searchName"
            type="text"
            name="name"
            placeholder="grenouille"
          />
        </div>
        <div>
          <label for="class">Classe</label>
          <select id="class" v-model="selectedClass">
            <option value>Aucun</option>
            <option value="Neutral">Neutre</option>
            <option value="Priest">Prêtre</option>
            <option value="Hunter">Chasseur</option>
            <option value="Paladin">Paladin</option>
            <option value="Druid">Druide</option>
            <option value="Mage">Mage</option>
            <option value="Rogue">Voleur</option>
            <option value="Shaman">Chaman</option>
            <option value="Warlock">Démoniste</option>
            <option value="Warrior">Guerrier</option>
          </select>
        </div>
        <div>
          <label for="type">Type</label>
          <select id="type" v-model="selectedType">
            <option value>Aucun</option>
            <option value="Hero">Hero</option>
            <option value="Spell">Sort</option>
            <option value="Minion">Serviteur</option>
            <option value="Weapon">Arme</option>
          </select>
        </div>
      </form>

      <button
        class="btn-deck"
        :disabled="!deck.length"
        v-on:click="toggleDeck()"
      >
        <img src="~assets/img/deck.png" class="icon-deck" alt="deck" />
        <span v-if="deck.length > 0">{{ deck.length }}</span>
      </button>
    </div>

    <ListCard
      :search-name="searchName"
      :selected-class="selectedClass"
      :selected-type="selectedType"
      :cards="cards"
      is-selectable
    />

    <div v-show="isDeckOpen" class="decklist">
      <div class="header">
        <h2>Mon deck</h2>
        <button v-on:click="toggleDeck()">Fermer</button>
      </div>
      <Deck />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ListCard from '~/components/ListCard/ListCard.vue';
import Deck from '~/components/Deck/Deck.vue';

const mappingCards = (cards = []) => cards.filter(({ img }) => img);

export default {
  components: {
    ListCard,
    Deck
  },
  data: () => ({
    searchName: '',
    selectedClass: '',
    selectedType: '',
    isDeckOpen: false
  }),
  computed: {
    username() {
      return this.$store.state.user.username;
    },
    cards() {
      return this.$store.state.card.list;
    },
    deck() {
      return this.$store.state.user.deck;
    }
  },
  async fetch({ store, params }) {
    const { data } = await axios.get(
      `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/Basic?locale=frFR`,
      {
        headers: {
          'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
          'x-rapidapi-key': 'c7c6a2e2bemshdae4429f66a722bp1e27f3jsn2aa7a457e972'
        }
      }
    );
    store.commit('card/setCards', mappingCards(data));
  },
  methods: {
    toggleDeck() {
      this.isDeckOpen = !this.isDeckOpen;
    }
  }
};
</script>
