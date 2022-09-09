<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="">
    </h1>
    <button class="button" @click="alterarTema">
      {{ textoDoBotao }}
    </button>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link
              to="/tarefas"
              class="link">
            <i class="fas fa-tasks"></i>
            Tarefas
          </router-link>
        </li>
        <li>
          <router-link
              to="/projetos"
              class="link">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: 'BarraLateral',
    emits: ['aoAlterarTema'],
    data() {
      return {
        modoEscuroAtivado: false
      }
    },
    computed: {
      textoDoBotao() {
        if (this.modoEscuroAtivado) {
          return 'Desativar modo escuro';
        }
        return 'Ativar modo escuro';
      }
    },
    methods: {
      alterarTema(): void {
        this.modoEscuroAtivado = !this.modoEscuroAtivado;
        this.$emit('aoAlterarTema', this.modoEscuroAtivado);
      }
    }
  })
</script>

<style scoped>
  header {
    background-color: #0d3b66;
    width: 100%;
    height: 100vh;
    padding: 1rem;
    text-align: center;
  }

  @media only screen and (max-width: 768px) {
    header {
        height: auto;
        padding: 2.5rem;
        text-align: center;
    }
  }

  i {
    margin: 0px 5px;
  }

  .panel {
    padding: 2px 20px;
  }

  .panel li {
    margin: 5px 0px;
    text-align: left;
    font-weight: bold;
  }

  .link {
    color: #ffffff;
  }

  .link:hover {
    color: #faf0ca;
  }

  .link.router-link-active {
    color: #faf0ca;
  }
</style>