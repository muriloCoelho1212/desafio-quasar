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
      <div class="row">
        <q-input
          outlined
          type="number"
          label="Número da versão"
          placeholder="Ex: 1.0"
          v-model="versionValue.numberVersion"
          color="orange-12"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Campo obrigatório', val => val.length < 100]"
          class="q-pr-md col"
        />

        <q-input class="q-pr-md col" color="orange-12" outlined type="text" placeholder="dd/mm/aaaa" v-model="dateValue" label="Data de disponibilidade" lazy-rules :rules="[   val => val && val.length > 0 || 'Campo obrigatório']">
          <template v-slot:prepend>
            <q-btn-dropdown flat dense dropdown-icon="fa-solid fa-calendar-days" padding=".25rem" no-icon-animation>
              <q-date
                v-model="date"
                color="orange"
              />
            </q-btn-dropdown>
          </template>
        </q-input>
      </div>

      <q-btn icon="fa-solid fa-plus" color="deep-orange-5" label="Adicionar novidade" class="q-pa-sm q-mb-lg" @click="showCard = !showCard" />

      <q-card flat bordered class="bg-grey-1" v-show="showCard">
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
              hint="Native file"
              class="col"
              color="orange-12"
            />

            <q-btn class="col-xs-1" flat  />
          </q-form>
        </q-card-section>
      </q-card>

      <div class="q-mt-md">
        <q-btn label="Enviar" type="submit" color="deep-orange-5" v-show="!disable"/>
        <q-btn label="Resetar" type="reset" color="deep-orange-5" flat class="q-ml-sm" v-show="!disable"/>
        <q-btn label="Editar" color="deep-orange-5" @click="editVersion()" />
      </div>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import { IListNews, IVersions } from 'src/interfaces'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

const $q = useQuasar()
const route = useRoute()

const id = route.params.id
const dateValue = ref('')
const date = new Date(dateValue.value)
const showCard = ref(true)
const disable = ref(false)

onMounted(async () => {
  if (id) {
    disable.value = true
    const { data } = await api.get(`versions/${id}`)
    listNewsValue.value = data.listNews
    versionValue.value = data
  }
})

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

const editVersion = async () => {
  try {
    await api.put(`versions/${id}`, versionValue.value)
    $q.notify({
      message: 'Editado com sucesso',
      icon: 'fa-solid fa-thumbs-up',
      color: 'teal-13'
    })
    router.push({ name: 'viewVersions' })
  } catch {
    $q.notify({
      message: 'Erro ao editar o registro',
      icon: 'fa-solid fa-thumbs-down',
      color: 'red-9'
    })
  }
}

const onSubmit = async () => {
  await api.post('versions', versionValue.value)
  $q.notify({
    message: 'Versão cadastrada com sucesso',
    icon: 'fa-solid fa-thumbs-up',
    color: 'teal-13'
  })
  router.push({ name: 'viewVersions' })
  onReset()
}

const onReset = () => {
  listNewsValue.value = {
    title: null,
    descript: null,
    img: null
  }
  versionValue.value = {
    numberVersion: null,
    dateVersion: null,
    listNews: listNewsValue.value
  }
}
</script>

<style scoped>
.formNews {
  width: 50%;
}
</style>
