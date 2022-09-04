<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateralVue />
    </div>
    <div class="column is-three-quarter">
      <FormularioVue />
      <div class="lista">
        <TarefaVue
            v-for="(tarefa, indice) of tarefas"
            v-bind:key="indice"
            v-bind:tarefa="tarefa" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import TarefaInterface from './interfaces/TarefaInterface';
  import BarraLateralVue from './components/BarraLateral.vue';
  import FormularioVue from './components/Formulario.vue';
  import TarefaVue from './components/Tarefa.vue';

  export default defineComponent({
    name: 'App',
    data() {
      return {
        tarefas: new Array<TarefaInterface>()
      }
    },
    components: {
      TarefaVue,
      BarraLateralVue,
      FormularioVue
    }
  });
</script>

<style>
</style>
