<template>
  <q-card flat bordered class="bg-grey-1">
    <div v-if="id">

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
              val => val !== null && val !== '' || 'Campo obrigatório', val => val.length < 800 || 'O limite de caracteres foi atingido'
            ]"
            class="q-pr-md col"
          />

          <q-file v-model="img" @update:model-value="convertImage()" outlined label="Imagem" color="orange-12" clearable class="col-xs-2" clear-icon="fa-solid fa-xmark"/>

          <div>
            <q-btn class="q-pa-md q-mx-md" outline dense icon="fa-solid fa-check-to-slot" color="deep-orange-12" @click="saveNews" >
              <q-tooltip class="text-caption">Adicionar novidade</q-tooltip>
            </q-btn>
          </div>
        </q-form>
      </q-card-section>
    </div>

    <q-separator />

    <q-card-section class="no-padding">
      <div class="q-ma-md">
        <span class="text-h6 text-weight-bold text-grey-7">Novidades cadastradas</span>
      </div>
      <q-separator />
      <div class="q-ma-md">
        <q-table :columns="columns" :rows="listNews" row-key="title" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { QTableProps } from 'quasar'
import { IListNews, IVersions } from 'src/interfaces'
import { computed, ref } from 'vue'

const columns: QTableProps['columns'] = [
  {
    name: 'title',
    required: true,
    align: 'center',
    label: 'Título',
    field: 'title'
  },
  {
    name: 'descript',
    required: true,
    align: 'left',
    label: 'Descrição',
    field: 'descript'
  },
  {
    name: 'img',
    required: true,
    align: 'center',
    label: 'Imagem',
    field: 'img'
  },
  {
    name: 'actions',
    required: true,
    align: 'right',
    label: '',
    field: 'actions'
  }
]

const props = defineProps<{ versionValue: IVersions, id: string | string[] }>()

const reader = new FileReader()

const img = ref()

const disable = ref(true)

const newsValue = ref<IListNews>({
  id: new Date().toISOString(),
  title: '',
  descript: '',
  img: ''
})

const convertImage = () => {
  reader.readAsDataURL(img.value)
  reader.onload = () => {
    const imgConvert = reader.result?.toString()
    newsValue.value.img = imgConvert
  }
  reader.onerror = (err) => {
    console.log(err)
  }
}

const saveNews = () => {
  if (img.value) {
    convertImage()
  }
  reset()
}

const reset = () => {
  newsValue.value = {
    id: '',
    title: '',
    descript: '',
    img: ''
  }
  img.value = null
}

</script>

<style scoped>
.size-columns{
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
