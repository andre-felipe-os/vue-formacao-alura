<template>
  <main class="columns is-gapless is-multiline"
      v-bind:class="{ 'modo-escuro': modoEscuroAtivado }">
    <div class="column is-one-quarter">
      <BarraLateralVue @aoAlterarTema="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <FormularioVue @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <CaixaVue v-if="listaEstaVazia">
          Você não acompanhou nenhuma tarefa hoje.
        </CaixaVue>
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
  import CaixaVue from './components/Caixa.vue';
  import BarraLateralVue from './components/BarraLateral.vue';
  import FormularioVue from './components/Formulario.vue';
  import TarefaVue from './components/Tarefa.vue';

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
      CaixaVue,
      TarefaVue,
      BarraLateralVue,
      FormularioVue
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
