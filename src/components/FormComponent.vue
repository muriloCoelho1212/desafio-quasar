<template>
  <q-form
    @submit.prevent="onSubmit"
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
          :rules="[ val => val && val.length > 0 || 'Campo obrigatório', val => val.length <= 4 || 'Insira no máximo 4 caracteres']"
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
        <form-news-component :version-value="versionValue" :id="id" />
      </div>

      <div class="q-mt-md">
        <q-btn label="Salvar" type="submit" color="deep-orange-5" />
      </div>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { IListNews, IVersions } from 'src/interfaces'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FormNewsComponent from './FormNewsComponent.vue'
import { useStore } from 'vuex'

const store = useStore()

const router = useRouter()

const $q = useQuasar()
const route = useRoute()

const id = route.params.id
const disable = ref(false)

const listNewsValue = ref<IListNews[]>([])

const versionValue = ref<IVersions>({
  id: 0,
  numberVersion: '',
  dateVersion: '',
  listNews: listNewsValue.value
})

const version = computed(() => store.state.versions)

onMounted(async () => {
  if (id) {
    disable.value = true
    await store.dispatch('getVersion', id)
    versionValue.value = version.value
    await store.dispatch('getVersions')
  }
})

const editVersion = async () => {
  try {
    await store.dispatch('putVersion', versionValue.value)
    await store.dispatch('getVersions')
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
  try {
    if (id) {
      editVersion()
      return
    }
    await store.dispatch('postVersion', versionValue.value)
    $q.notify({
      message: 'Versão cadastrada com sucesso',
      icon: 'fa-solid fa-thumbs-up',
      color: 'teal-13'
    })
    router.push({ name: 'viewVersions' })
  } catch {
    $q.notify({
      message: 'Não foi possível cadastrar a versão',
      icon: 'fa-solid fa-thumbs-down',
      color: 'red-9'
    })
  }
}
</script>

<style scoped>
</style>
