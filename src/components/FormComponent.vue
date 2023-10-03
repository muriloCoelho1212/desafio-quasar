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
      <div class="row items-center">
        <q-input
          outlined
          type="text"
          label="Número da versão *"
          placeholder="Ex: 1.00"
          v-model="versionValue.numberVersion"
          color="orange-12"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Campo obrigatório', val => val.length < 4 || 'Insira no máximo 3 caracteres']"
          mask="#.##"
          unmasked-value
          reverse-fill-mask
          class="q-pr-md col"
        />

        <q-input class="q-pr-md col" clearable readonly clear-icon="fa-solid fa-xmark" mask="##/##/####" color="orange-12" outlined type="text" placeholder="dd/mm/aaaa" v-model="versionValue.dateVersion" label="Data de disponibilidade *" :rules="[val => val && val.length > 0 || 'Campo obrigatório']">
          <template v-slot:prepend>
            <q-btn-dropdown flat dense dropdown-icon="fa-solid fa-calendar-days" padding="none" no-icon-animation>
              <q-date
                v-model="versionValue.dateVersion"
                color="deep-orange-12"
                mask="DD/MM/YYYY"
                :locale="{
                  days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo' ],
                  daysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                  months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                  monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
                }"
                :navigation-max-year-month="new Date().getFullYear().toString()"
                navigation-min-year-month="2000"
              />
            </q-btn-dropdown>
          </template>
        </q-input>
      </div>

      <div>
        <form-news-component :listNewsValue="listNewsValue" />
      </div>

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
import FormNewsComponent from './FormNewsComponent.vue'

const router = useRouter()

const $q = useQuasar()
const route = useRoute()

const id = route.params.id
const disable = ref(false)

onMounted(async () => {
  if (id) {
    disable.value = true
    const { data } = await api.get(`versions/${id}`)
    versionValue.value = data
  }
})

const listNewsValue = ref<IListNews[]>([])

const versionValue = ref<IVersions>({
  numberVersion: '',
  dateVersion: '',
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
