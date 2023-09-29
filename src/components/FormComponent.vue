<template>
  <q-form
    @submit="onSubmit"
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

        <q-input class="q-pr-md col" color="orange-12" outlined type="text" placeholder="dd/mm/aaaa" v-model="date" label="Data de disponibilidade" lazy-rules :rules="[   val => val && val.length > 0 || 'Campo obrigatório']">
          <template v-slot:prepend>
            <q-btn-dropdown flat dense dropdown-icon="fa-solid fa-calendar-days" padding=".25rem" no-icon-animation>
              <q-date
                v-model="date"
                color="deep-orange-12"
                mask="DD/MM/YYYY"
                :locale="{
                  days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo' ],
                  daysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                  months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                  monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
                }"
              />
            </q-btn-dropdown>
          </template>
        </q-input>
      </div>

      <form-news />

      <div class="q-mt-md">
        <q-btn label="Enviar" type="submit" color="deep-orange-5" v-show="!disable"/>
        <q-btn label="Editar" color="deep-orange-5" @click="editVersion()" v-show="disable"/>
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
import FormNews from './FormNews.vue'

const router = useRouter()

const $q = useQuasar()
const route = useRoute()

const id = route.params.id
const date = ref(new Date().toLocaleDateString())
const disable = ref(false)

onMounted(async () => {
  if (id) {
    disable.value = true
    const { data } = await api.get(`versions/${id}`)
    versionValue.value = data
  }
})

const listNewsValue = ref<IListNews[]>([
  {
    title: 'teste',
    descript: 'teste',
    img: 'teste'
  }
])

const versionValue = ref<IVersions>({
  numberVersion: null,
  dateVersion: date.value.toString(),
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
}
</script>

<style scoped>
.formNews {
  width: 50%;
}
</style>
