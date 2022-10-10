<template>
    <div class="modal"
        v-bind:class="{ 'is-active': mostrar }"
        v-if="mostrar">
      <div class="modal-background">
      </div>
      <div class="modal-card">
        <slot></slot>
      </div>
    </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: 'ModalVue',
    props: {
        mostrar: {
            type: Boolean,
            required: true,
        }
    }
  })
</script>