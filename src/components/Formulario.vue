<template>
  <div class="box formulario">
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
  import { computed, defineComponent } from 'vue';
  import { useStore } from 'vuex';
  import { key } from '../stores';
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
    },
    setup() {
      const store = useStore(key);
      return {
        projetos: computed(() => store.state.projetos)
      }
    }
  })
</script>

<style>
  .formulario {
    background-color: var(--fundo-primario);
    color: var(--texto-primario);
  }
</style>