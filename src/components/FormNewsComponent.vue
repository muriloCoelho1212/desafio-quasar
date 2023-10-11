<template>
  <q-card flat bordered class="bg-grey-1">
    <q-card-section>
      <span class="text-h6 text-weight-bold text-grey-7">Cadastre sua novidade</span>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-gutter-sm">
      <q-form
        class="row"
        v-show="modeView !== 'view'"
      >
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

        <q-file
          v-model="img"
          @update:model-value="convertImage()"
          outlined
          label="Imagem"
          color="orange-12"
          clearable
          class="col-xs-2"
          clear-icon="fa-solid fa-xmark"
        >
          <template v-slot:prepend>
            <q-icon name="fa-solid fa-upload" />
          </template>
        </q-file>

        <div>
          <q-btn
            class="q-pa-md q-mx-md"
            outline
            dense
            icon="fa-solid fa-check-to-slot"
            color="deep-orange-12"
            @click="saveNews()"
          >
            <q-tooltip class="text-caption">Adicionar novidade</q-tooltip>
          </q-btn>
        </div>
      </q-form>
    </q-card-section>

    <q-card-section>
      <q-table
        :columns="columns"
        :rows="version.listNews"
        row-key="title"
        :pagination="{rowsPerPage: 0}"
        hide-pagination
      >
        <template v-slot:body-cell-title="props">
          <q-td>
            <span v-show="modeView !== 'edit'" >{{ props.row.title }}</span>
            <q-input
              v-model="props.row.title"
              type="text"
              outlined
              color="orange-12"
              label="Título"
              v-show="modeView === 'edit'"
              :disable="modeView === 'view'"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-descript="props">
          <q-td>
            <span v-show="modeView !== 'edit'" >{{ props.row.descript }}</span>
            <q-input
              v-model="props.row.descript"
              type="text"
              outlined
              color="orange-12"
              label="Descrição"
              v-show="modeView === 'edit'"
              :disable="modeView === 'view'"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-img="props">
          <q-td>
            <q-img :placeholder-src="props.row.img" />
            <q-file
              v-model="img"
              @update:model-value="convertImage(props.row.id)"
              outlined
              color="orange-12" clearable class="col-xs-2" clear-icon="fa-solid fa-xmark" v-show="modeView === 'edit'"
              :label="modeView === 'edit' ? 'Mudar imagem' : 'Imagem'"
              :disable="modeView === 'view'">
              <template v-slot:prepend>
                <q-icon name="fa-solid fa-upload" />
              </template>
            </q-file>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td class="col">
            <q-btn
              flat
              icon="fa-solid fa-trash"
              color="red-6"
              padding=".50rem"
              v-show="modeView !== 'view'"
              @click="delRow(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { QTableProps } from 'quasar'
import { IListNews, IVersions } from 'src/interfaces'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const columns: QTableProps['columns'] = [
  {
    name: 'title',
    required: true,
    align: 'left',
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
    align: 'left',
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

const props = defineProps<{ versionValue: IVersions, id: string | undefined, modeView: string }>()
const id = computed(() => { return props.id })

const version = computed(() => { return props.versionValue })

const reader = new FileReader()

const img = ref()

const newsValue = ref<IListNews>({
  id: new Date().toISOString(),
  title: '',
  descript: '',
  img: ''
})

const saveNews = async () => {
  version.value.listNews.push(newsValue.value)
  reset()
}

const delRow = async (idRow: string) => {
  const infoDel = {
    idRow,
    version: version.value
  }
  await store.dispatch('delRow', infoDel)
  window.location.href = `./${id.value}`
}

const convertImage = async (idRow?: string) => {
  if (img.value) {
    reader.readAsDataURL(img.value)
    reader.onload = () => {
      if (version.value.listNews.find(lNew => lNew.id === idRow)) {
        const news = version.value.listNews.find(lNew => lNew.id === idRow)
        if (news) {
          news.img = reader.result?.toString()
        }
      } else {
        newsValue.value.img = reader.result?.toString()
      }
    }
  }
}

const reset = () => {
  newsValue.value = {
    id: '',
    title: '',
    descript: '',
    img: ''
  }
}

</script>
<style scoped>
</style>
