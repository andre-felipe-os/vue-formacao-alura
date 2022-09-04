<template>
  <CaixaVue>
    <div class="columns">
      <div class="column is-7">
        {{ tarefa.descricao || "Tarefa sem descrição" }}
      </div>
      <div class="column">
        <CronometroVue :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
      </div>
    </div>
  </CaixaVue>
</template>

<script lang="ts">
  import { defineComponent, PropType } from "vue";
  import TarefaInterface from "../interfaces/TarefaInterface";
  import CaixaVue from "./Caixa.vue";
  import CronometroVue from "./Cronometro.vue";

  export default defineComponent({
      name: 'TarefaVue',
      components: {
          CaixaVue,
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