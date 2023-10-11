<template>
  <q-drawer v-model="myDrawer" show-if-above :width="270" :breakpoint="400" elevated class="bg-grey-10 text-white" style="height: calc(100% - 150px); margin-top: 150px;">
    <q-list bordered padding class="rounded-borders">
      <q-item
        clickable
        v-ripple
        :to="{ name: 'viewVersions' }"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="fa-solid fa-house" />
        </q-item-section>

        <q-item-section class="text-weight-bold q-py-md">Home</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :to="{ name: 'formVersions' }"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="fa-solid fa-clipboard-list" />
        </q-item-section>

        <q-item-section class="text-weight-bold q-py-md">Formulário</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        href="https://github.com/murilocoelho1212"
        target="_blank"
        active-class="my-menu-link"
        class="absolute-bottom"
      >
        <q-item-section avatar>
          <q-icon name="fa-brands fa-github" />
        </q-item-section>

        <q-item-section class="text-weight-bold q-py-md">GitHub</q-item-section>
      </q-item>
    </q-list>

    <div class="absolute-top row bg-grey-10 items-center justify-center" style="height: 157px;">
      <div class="text-weight-bold text-h6">Murilo Coelho</div>
    </div>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ drawer: boolean }>()

const myDrawer = computed(() => {
  return props.drawer
})
</script>

<style scoped>

</style>
