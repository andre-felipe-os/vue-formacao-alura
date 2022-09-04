<template>
  <div class="box has-text-weight-bold">
    <div class="columns">
      <div class="column is-7">
        {{ tarefa.descricao || "Tarefa sem descrição" }}
      </div>
      <div class="column">
        <CronometroVue :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from "vue";
  import TarefaInterface from "../interfaces/TarefaInterface";
  import CronometroVue from "./Cronometro.vue";

  export default defineComponent({
      name: 'TarefaVue',
      components: {
          CronometroVue
      },
      props: {
        tarefa: {
          type: Object as PropType<TarefaInterface>,
          required: true
        }
      }
  })
</script>

<style scoped>
  .box {
    background-color: #FAF0CA;
  }
</style>