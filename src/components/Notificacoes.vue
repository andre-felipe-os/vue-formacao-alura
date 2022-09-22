<template>
  <div class="notificacoes">
    <article class="notification"
        v-bind:class="recuperaClasseCssPeloTipo(notificacao.tipo)"
        v-for="notificacao of notificacoes"
        v-bind:key="notificacao.id">
      <button class="delete"></button>
      {{ notificacao.texto }}
    </article>
  </div>
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interfaces/NotificacaoInterface';
import { useStore } from '@/stores';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'NotificacoesVue',
  methods: {
    recuperaClasseCssPeloTipo(tipo: TipoNotificacao): string {
        switch (tipo) {
            case TipoNotificacao.SUCESSO:
                return 'is-success';
            case TipoNotificacao.ATENCAO:
                return 'is-warning';
            case TipoNotificacao.FALHA:
                return 'is-danger';
            default:
                return '';
        }
    }
  },
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