<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-5"
          role="form"
          aria-label="Formulário para criação de uma nova tarefa">
        <input
            type="text"
            class="input"
            placeholder="Qual tarefa você deseja iniciar?"
            v-model="descricao" />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idDoProjeto">
            <option value="">
              Selecione o projeto
            </option>
            <option v-bind:value="projeto.id"
                v-for="projeto of projetos"
                v-bind:key="projeto.id">
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <TemporizadorVue @aoFinalizarTemporizador="finalizarTarefa"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, Ref, ref } from 'vue';
  import { useStore } from 'vuex';
  import { key } from '../stores';
  import TemporizadorVue from './Temporizador.vue';

  export default defineComponent({
    name: 'FormularioVue',
    emits: ['aoSalvarTarefa'],
    components: {
      TemporizadorVue
    },
    setup(props, { emit }) {
      const store = useStore(key);

      const idDoProjeto: Ref<string> = ref("");
      const descricao: Ref<string> = ref("");

      const projetos = computed(() => store.state.moduloProjeto.projetos);

      const finalizarTarefa = (tempoEmSegundos: number): void => {
        emit('aoSalvarTarefa', {
          duracaoEmSegundos: tempoEmSegundos,
          descricao: descricao.value,
          projeto: projetos.value.find(projeto => projeto.id == idDoProjeto.value)
        });
        descricao.value = '';
      }

      return {
        idDoProjeto,
        descricao,
        projetos,
        finalizarTarefa,
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