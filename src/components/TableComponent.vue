<template>
  <q-table
    :rows="versions"
    :columns="columns"
    row-key="id"
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn-dropdown flat color="grey-6" dropdown-icon="fa-solid fa-ellipsis-vertical" no-icon-animation padding=".50rem">
          <q-list>
            <q-item clickable v-ripple @click="editRow(props.row.id)" class="q-py-md">
              <q-item-section>
                <q-icon name="fa-solid fa-pen-to-square" color="light-green-6" size="sm" />
              </q-item-section>
              <q-item-section class="q-pr-md">
                Editar
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="viewRow(props.row.id)" class="q-py-md">
              <q-item-section>
                <q-icon name="fa-solid fa-eye" color="light-blue-6" size="sm" />
              </q-item-section>
              <q-item-section class="q-pr-md">
                Visualizar
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="deleteRow(props.row.id)" class="q-py-md">
              <q-item-section>
                <q-icon name="fa-solid fa-trash" color="red-6" size="sm" />
              </q-item-section>
              <q-item-section class="q-pr-md">
                Excluir
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-td>
    </template>
    <template v-slot:bottom="props">
      <div class="row items-center justify-between full-width">
        <div class="row items-center q-gutter-sm q-pa-md">
          <span class="text-subtitle1 text-grey-7">
            Exibindo
            <strong>
              {{ props.pagination.page }}
            </strong> de
            <strong>
              {{ props.pagesNumber }}
            </strong> páginas
          </span>
        </div>
        <div class="row items-center q-gutter-sm">
          <div class="row items-center">
            <span class="text-subtitle1 text-grey-7">Registros por página</span>
            <q-select dense borderless v-model="rowsPage" :options="options" class="text-subtitle1 q-px-md"
              color="orange-14" />
          </div>
          <q-btn flat dense color="orange-14" icon="fa-solid fa-backward-step" class="spacing" @click="props.firstPage"
            :disable="props.isFirstPage" />
          <q-btn flat dense color="orange-14" icon="fa-solid fa-chevron-left" class="spacing" @click="props.prevPage"
            :disable="props.isFirstPage" />
          <span>{{ props.pagination.page }} / {{ props.pagesNumber }}</span>
          <q-btn flat dense color="orange-14" icon="fa-solid fa-chevron-right" class="spacing" @click="props.nextPage" :disable="props.isLastPage" />
          <q-btn flat dense color="orange-14" icon="fa-solid fa-forward-step" class="spacing" @click="props.lastPage" :disable="props.isLastPage" />
        </div>
      </div>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { QTableProps, useQuasar } from 'quasar'
import { IVersions } from 'src/interfaces'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()

const options = [5, 10, 15]
const rowsPage = ref(5)

const versions = computed<IVersions[]>(() => store.state.versions)

const columns: QTableProps['columns'] = [
  {
    name: 'numberVersion',
    required: true,
    label: 'Número da versão',
    align: 'left',
    field: 'numberVersion'
  },
  {
    name: 'dateVersion',
    required: true,
    label: 'Data da versão',
    align: 'left',
    field: 'dateVersion'
  },
  {
    name: 'listNews',
    required: true,
    label: 'Data da versão',
    align: 'left',
    field: 'listNews',
    format: val => val.length > 1 ? `${val.length} novidades cadastradas` : `${val.length} novidade cadastrada`
  },
  {
    name: 'actions',
    required: true,
    label: '',
    align: 'right',
    field: 'actions'
  }
]

const $q = useQuasar()
const router = useRouter()

onMounted(async () => {
  await getData()
})

const getData = async () => {
  try {
    await store.dispatch('getVersions')
  } catch {
    $q.notify({
      message: 'Erro ao carregar a tabela',
      icon: 'fa-solid fa-thumbs-down',
      color: 'red-9'
    })
  }
}

const deleteRow = async (id: number) => {
  try {
    $q.dialog({
      title: 'Excluir versão?',
      message: 'Tem certeza que deseja fazer isso? (Essa ação não pode ser desfeita)',
      cancel: true,
      persistent: true,
      color: 'orange-12',
      focus: 'none'
    }).onOk(async () => {
      await store.dispatch('delVersion', id)
      $q.notify({
        message: 'Excluído com sucesso',
        icon: 'fa-solid fa-thumbs-up',
        color: 'teal-13'
      })
      await getData()
    })
  } catch {
    $q.notify({
      message: 'Erro ao excluir a versão',
      icon: 'fa-solid fa-thumbs-down',
      color: 'red-9'
    })
  }
}

const editRow = async (id: string) => {
  router.push({ name: 'formVersions', params: { id } })
}

const viewRow = async (id: string) => {
  router.push({ name: 'formVersions', params: { id } })
}
</script>

<style scoped>
</style>
