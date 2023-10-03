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
          v-model="newsValue.title"
          label="Título"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Campo obrigatório',
          ]"
          class="q-pr-md q-mb-sm col-xs-12"
        />

        <q-input
          v-model="newsValue.descript"
          outlined
          autogrow
          type="textarea"
          color="orange-12"
          label="Descrição"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Campo obrigatório', val => val.length < 2000 || 'O limite de caracteres foi atingido'
          ]"
          class="q-pr-md col"
        />

        <q-file v-model="img" outlined label="Adicionar imagem" />

        <div class="col-xs-1">
          <q-btn class="q-pa-md q-mx-md" outline dense icon="fa-solid fa-check-to-slot" color="deep-orange-12" @click="saveNews" >
            <q-tooltip class="text-caption">Adicionar novidade</q-tooltip>
          </q-btn>
        </div>
      </q-form>
    </q-card-section>

    <q-separator />

    <q-card-section class="no-padding">
      <div class="q-ma-md">
        <span class="text-h6 text-weight-bold text-grey-7">Novidades cadastradas</span>
      </div>
      <q-separator />
      <q-list separator>
        <q-item v-for="novidade in listNews" :key="novidade.title">
          <q-item-section>Título: {{ novidade.title }}</q-item-section>
          <q-item-section>Descrição: {{ novidade.descript }}</q-item-section>
          <q-item-section v-if="novidade.img">
            <q-img :placeholder-src="novidade.img.toString()" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { IListNews } from 'src/interfaces'
import { computed, ref } from 'vue'

const props = defineProps<{ listNewsValue: IListNews[] }>()

const listNews = computed(() => {
  return props.listNewsValue
})

const reader = new FileReader()

const img = ref()

const newsValue = ref<IListNews>({
  title: '',
  descript: '',
  img: ''
})

const saveNews = () => {
  if (img.value) {
    reader.readAsDataURL(img.value)
    reader.onload = () => {
      newsValue.value.img = reader.result
      listNews.value.push(newsValue.value)
      reset()
    }
    reader.onerror = (err) => {
      console.log(err)
    }
  }
}

const reset = () => {
  newsValue.value = {
    title: '',
    descript: '',
    img: null
  }
  img.value = null
}

</script>

<style scoped>

</style>
