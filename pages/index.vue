<style lang="scss" src="../assets/css/pages/index.scss"></style>

<template>
  <div class="container-index">
    <h1>Bienvenue dans la taverne jeune aventurier</h1>
    <form @submit.prevent="onSubmit">
      <label for="username">Indique nous ton nom pour préparer ton deck</label>
      <input
        id="username"
        v-model="username"
        type="text"
        name="username"
        @input="updateUsername"
      />
      <button type="submit" :disabled="username === ''">Entrer</button>
    </form>
  </div>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.state.user.username;
    }
  },
  methods: {
    updateUsername(e) {
      this.$store.commit('user/setUsername', e.target.value);
    },
    onSubmit() {
      this.$router.push('/cards');
    }
  }
};
</script>
