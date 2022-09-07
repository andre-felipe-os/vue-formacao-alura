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
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import TarefaInterface from '../interfaces/TarefaInterface';

  import CaixaVue from '../components/Caixa.vue';
  import FormularioVue from '../components/Formulario.vue';
  import TarefaVue from '../components/Tarefa.vue';

  export default defineComponent({
    name: 'TarefasView',
    data() {
      return {
        tarefas: new Array<TarefaInterface>()
      }
    },
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
    methods: {
      salvarTarefa(tarefa: TarefaInterface): void {
        this.tarefas.push(tarefa);
      }
    }
  });
</script>