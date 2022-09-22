<template>
  <div class="notificacoes">
    <article class="notification"
        v-for="notificacao of notificacoes"
        v-bind:key="notificacao.id">
      <button class="delete"></button>
      {{ notificacao.texto }}
    </article>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/stores';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'NotificacoesVue',
  setup() {
    const store = useStore();
    return {
        notificacoes: computed(() => store.state.notificacoes)
    }
  }
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