<template>
  <div class="notificacoes">
    <article class="notification">
      <button class="delete"></button>
      Texto da notificação.
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'NotificacoesVue'
});
</script>

<style scoped>
  .notificacoes {
    position: absolute;
    right: 0;
    width:300px;
    padding: 10px;
    z-index: 10;
  }
</style>