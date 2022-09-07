<template>
  <main class="columns is-gapless is-multiline"
      v-bind:class="{ 'modo-escuro': modoEscuroAtivado }">
    <div class="column is-one-quarter">
      <BarraLateralVue @aoAlterarTema="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <RouterView></RouterView>
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import TarefaInterface from './interfaces/TarefaInterface';
  import BarraLateralVue from './components/BarraLateral.vue';

  export default defineComponent({
    name: 'App',
    data() {
      return {
        modoEscuroAtivado: false,
        tarefas: new Array<TarefaInterface>()
      }
    },
    computed: {
      listaEstaVazia(): boolean {
        return this.tarefas.length === 0;
      }
    },
    components: {
      BarraLateralVue
    },
    methods: {
      trocarTema(modoEscuroAtivado: boolean): void {
        this.modoEscuroAtivado = modoEscuroAtivado;
      },
      salvarTarefa(tarefa: TarefaInterface): void {
        this.tarefas.push(tarefa);
      }
    }
  });
</script>

<style>
  .lista {
    padding: 1.25rem;
  }

  main {
    --fundo-primario: #ffffff;
    --texto-primario: #000000;
  }

  main.modo-escuro {
    --fundo-primario: #2b2d42;
    --texto-primario: #dddddd;
  }

  .conteudo {
    background-color: var(--fundo-primario);
  }
</style>
