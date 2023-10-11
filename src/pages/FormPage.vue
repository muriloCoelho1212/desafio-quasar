<template>
  <q-page padding>
    <FormComponent :modeView="modeView" />
  </q-page>
</template>

<script setup lang="ts">
import FormComponent from 'src/components/FormComponent.vue'
import { POST_STATE } from 'src/store/mutations/mutations'
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const modeView: string = store.state.modeView

onMounted(() => {
  store.commit(POST_STATE)
})

</script>

<style scoped>

</style>
