<template>
  <q-header>
    <q-toolbar class="bg-grey-9">
      <q-btn flat round dense icon="menu" class="text-h4" @click="drawer = !drawer" />
      <q-toolbar-title class="text-h2 text-center text-weight-regular q-pa-md q-ml-md">
        Quasar Project
      </q-toolbar-title>
    </q-toolbar>
  </q-header>

  <drawer-component :drawer="drawer" />

</template>

<script setup lang="ts">
import { ref } from 'vue'
import DrawerComponent from './DrawerComponent.vue'

const drawer = ref<boolean>(true)
</script>

<style scoped>

</style>
