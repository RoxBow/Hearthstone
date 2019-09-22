<template>
  <div class="container">
    <img
      src="~/assets/img/hearthstone_logo.png"
      class="logo-hearthstone"
      alt="logo hearthstone"
    />
    <h1 class="title">Liste carte Hearthstone</h1>
    <div>
      <label for="name">Nom</label>
      <input id="name" v-model="searchName" type="text" name="name" />
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
    <ListCard
      :search-name="searchName"
      :selected-class="selectedClass"
      :selected-type="selectedType"
    />
  </div>
</template>

<script>
import ListCard from '~/components/ListCard/ListCard.vue';

export default {
  components: {
    ListCard
  },
  data: () => ({
    searchName: '',
    selectedClass: '',
    selectedType: ''
  })
};
</script>
