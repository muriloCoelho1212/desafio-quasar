<template>
  <q-form
    @submit="onSubmit"
    @reset="onReset"
    class="bg-grey-1 rounded-borders"
  >
    <div class="q-pt-md q-pb-sm">
      <span class="text-h6 text-weight-bold text-grey-7 q-px-md">Cadastre sua versão</span>
    </div>
    <q-separator spaced />
    <div class="q-pa-lg q-gutter-sm">
      <q-input
        outlined
        type="number"
        label="Número da versão"
        placeholder="Ex: 1.0"
        v-model="versionValue.numberVersion"
        color="orange-12"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório', val => val.length < 100]"
        class="q-pr-md"
      />

      <q-input class="q-pr-md" outlined type="date" stack-label v-model="dateValue" label="Data de disponibilidade" lazy-rules :rules="[   val => val && val.length > 0 || 'Campo obrigatório']">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-input>

      <q-btn icon="fa-solid fa-plus" color="orange-7" label="Adicionar novidade" class="q-pa-sm q-mb-lg" @click="disable = !disable" />

      <q-card flat bordered class="bg-grey-1" :hidden="disable">
        <q-card-section>
          <span class="text-h6 text-weight-bold text-grey-7">Cadastre sua novidade</span>
        </q-card-section>

        <q-separator />

        <q-card-section class="row q-pa-lg q-gutter-sm">
          <q-input
            outlined
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
            label="Descrição"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Campo obrigatório', val => val.length < 1000 || 'O limite de caracteres foi atingido'
            ]"
            class="q-pr-md col"
          />

          <q-input
            v-model="listNewsValue.img"
            filled
            type="file"
            hint="Native file"
          />
        </q-card-section>
      </q-card>

      <div class="q-mt-md">
        <q-btn label="Enviar" type="submit" color="orange-7"/>
        <q-btn label="Resetar" type="reset" color="orange-7" flat class="q-ml-sm" />
      </div>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import { IListNews, IVersions } from 'src/interfaces'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const $q = useQuasar()

const dateValue = ref('12/12/1212')
const date = new Date(dateValue.value)
const disable = ref(true)

const listNewsValue = ref<IListNews>({
  title: null,
  descript: null,
  img: null
})

const versionValue = ref<IVersions>({
  numberVersion: null,
  dateVersion: date.toLocaleDateString(),
  listNews: listNewsValue.value
})

const onSubmit = async () => {
  await api.post('versions', versionValue.value)
  router.push({ name: 'viewVersions' })
  onReset()
}

const onReset = () => {
  listNewsValue.value.title = ''
  listNewsValue.value.descript = ''
  listNewsValue.value.img = ''
  dateValue.value = ''
  versionValue.value.dateVersion = new Date().toLocaleDateString()
  versionValue.value.numberVersion = 0
  versionValue.value.listNews = listNewsValue.value
}
</script>

<style scoped>
.formNews {
  width: 50%;
}
</style>
