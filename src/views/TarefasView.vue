<template>
  <FormularioVue @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <CaixaVue v-if="listaEstaVazia">
      Você não acompanhou nenhuma tarefa hoje.
    </CaixaVue>
    <TarefaVue
        v-for="(tarefa, indice) of tarefas"
        v-bind:key="indice"
        v-bind:tarefa="tarefa">
    </TarefaVue>
    <div class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando tarefa</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Conteúdo ... -->
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Salvar mudanças</button>
          <button class="button">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import TarefaInterface from '../interfaces/TarefaInterface';

  import CaixaVue from '../components/Caixa.vue';
  import FormularioVue from '../components/Formulario.vue';
  import TarefaVue from '../components/Tarefa.vue';
  import { useStore } from '@/stores';
  import { CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/stores/tipos-de-acoes';

  export default defineComponent({
    name: 'TarefasView',
    computed: {
      listaEstaVazia(): boolean {
        return this.tarefas.length === 0;
      }
    },
    components: {
      CaixaVue,
      TarefaVue,
      FormularioVue
    },
    setup() {
      const store = useStore();
      store.dispatch(OBTER_TAREFAS);
      store.dispatch(OBTER_PROJETOS);
      return {
        tarefas: computed(() => store.state.tarefas),
        store,
      }
    },
    methods: {
      salvarTarefa(tarefa: TarefaInterface): void {
        this.store.dispatch(CADASTRAR_TAREFA, tarefa);
      }
    }
  });
</script>