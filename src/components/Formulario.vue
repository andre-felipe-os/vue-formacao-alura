<template>
  <div class="box">
    <div class="columns">
      <div class="column is-8"
          role="form"
          aria-label="Formulário para criação de uma nova tarefa">
        <input
            type="text"
            class="input"
            placeholder="Qual tarefa você deseja iniciar?"
            v-model="descricao" />
      </div>
      <div class="column">
        <TemporizadorVue @aoFinalizarTemporizador="finalizarTarefa"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import TemporizadorVue from './Temporizador.vue';

  export default defineComponent({
    name: 'FormularioVue',
    emits: ['aoSalvarTarefa'],
    data() {
      return {
        descricao: ''
      }
    },
    components: {
      TemporizadorVue
    },
    methods: {
      finalizarTarefa(tempoEmSegundos: number): void {
        this.$emit('aoSalvarTarefa', {
          duracaoEmSegundos: tempoEmSegundos,
          descricao: this.descricao
        });
        this.descricao = '';
      }
    }
  })
</script>