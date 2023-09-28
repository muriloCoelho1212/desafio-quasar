<template>
  <q-layout view="lHh Lpr lFf">
    <header-component />

    <q-page-container class="bg-blue-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import HeaderComponent from 'src/components/HeaderComponent.vue'

</script>
