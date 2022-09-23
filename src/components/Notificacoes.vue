<template>
  <div class="notificacoes">
    <article class="notification"
        v-bind:class="contexto[notificacao.tipo]"
        v-for="notificacao of notificacoes"
        v-bind:key="notificacao.id">
      <button class="delete" @click="removerNotificacao(notificacao.id)"></button>
      {{ notificacao.mensagem }}
    </article>
  </div>
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interfaces/NotificacaoInterface';
import { useStore } from '@/stores';
import { computed, defineComponent } from 'vue';
import useRemovedorDeNotificacoes from '@/hooks/remove-notificacao';

export default defineComponent({
  name: 'NotificacoesVue',
  data() {
    return {
        contexto: {
            [TipoNotificacao.SUCESSO]: 'is-success',
            [TipoNotificacao.ATENCAO]: 'is-warning',
            [TipoNotificacao.FALHA]: 'is-danger'
        }
    }
  },
  setup() {
    const store = useStore();
    const { removerNotificacao } = useRemovedorDeNotificacoes();
    return {
        removerNotificacao,
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