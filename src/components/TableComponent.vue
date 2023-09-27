<template>
  <q-table
    :rows="versions"
    :columns="columns"
    row-key="id"
  />
</template>

<script setup lang="ts">
import { QTableProps } from 'quasar'
import { api } from 'src/boot/axios'
import { onMounted, ref } from 'vue'

const columns: QTableProps['columns'] = [
  {
    name: 'id',
    required: true,
    label: 'Id',
    align: 'left',
    field: 'id'
  },
  {
    name: 'numberVersion',
    required: true,
    label: 'Número da versão',
    align: 'left',
    field: 'numberVersion'
  },
  {
    name: 'dataVersion',
    required: true,
    label: 'Data da versão',
    align: 'left',
    field: 'dataVersion'
  }
  // {
  //   name: 'listNews',
  //   required: true,
  //   label: 'Novidades',
  //   align: 'left',
  //   field: 'listNews'
  // }
]

const versions = ref([])

onMounted(async () => {
  await getData()
})

const getData = async () => {
  try {
    const { data } = await api.get('versions')
    versions.value = data
  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped>

</style>
