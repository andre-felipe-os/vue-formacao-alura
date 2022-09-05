<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="">
    </h1>
    <button class="button">
      Ativar modo escuro
    </button>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: 'BarraLateral'
  })
</script>

<style scoped>
  header {
    background-color: #0d3b66;
    width: 100%;
    height: 100vh;
    padding: 1rem;
    text-align: center;
  }

  @media only screen and (max-width: 768px) {
    header {
        height: auto;
        padding: 2.5rem;
        text-align: center;
    }
  }
</style>