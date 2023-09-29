<template>
  <q-card flat bordered class="bg-grey-1">
        <q-card-section>
          <span class="text-h6 text-weight-bold text-grey-7">Cadastre sua novidade</span>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pa-lg q-gutter-sm">
          <q-form class="row">
            <q-input
              outlined
              color="orange-12"
              type="text"
              v-model="listNewsValue.title"
              label="Título"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || 'Campo obrigatório',
              ]"
              class="q-pr-md col-xs-12"
            />

            <q-input
              v-model="listNewsValue.descript"
              outlined
              max-height="5rem"
              autogrow
              type="textarea"
              color="orange-12"
              label="Descrição"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || 'Campo obrigatório', val => val.length < 1000 || 'O limite de caracteres foi atingido'
              ]"
              class="q-pr-md col"
            />

            <q-input
              v-model="listNewsValue.img"
              outlined
              type="file"
              class="col"
              color="deep-orange-12"
            />

            <q-btn class="q-pa-md q-mx-md q-mb-lg" outline dense icon="fa-solid fa-check-to-slot" color="deep-orange-12" @click="saveNews" />
          </q-form>
        </q-card-section>

        <q-separator />

        <q-card-section>

        </q-card-section>
      </q-card>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import { IListNews } from 'src/interfaces'
import { ref } from 'vue'

const listNewsValue = ref<IListNews>({
  title: null,
  descript: null,
  img: null
})

const $q = useQuasar()

// onMounted(() => {
//   getNews()
// })

const getNews = async () => {
  try {
    const { data } = await api.get('versions')
    news.value = data
  } catch {
    $q.notify({
      message: 'Erro ao carregar a tabela',
      icon: 'fa-solid fa-thumbs-down',
      color: 'red-9'
    })
  }
}

const saveNews = async () => {
  await api.post('versions')
}

const news = ref([])

</script>

<style scoped>

</style>
