<template>
  <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 300 }">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <RecordDetail :submitId="data.key" />
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
  import type { TableColumnsType } from 'ant-design-vue';
  import { defineComponent } from 'vue';
  import RecordDetail from '/@/views/collect-detail/component/RecordDetail.vue';

  const columns: TableColumnsType = [
    { title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: '提交时间', dataIndex: 'submitTime', key: '1', width: 150 },
    { title: '文件数量', dataIndex: 'fileNum', key: '2', width: 200 },
    {
      title: '文件详情',
      key: 'operation',
      width: 100,
    },
  ];

  interface DataItem {
    key: number;
    name: string;
    age: number;
    address: string;
  }

  const data: DataItem[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      fileNum: 2,
      submitTime: `London Park no. ${i}`,
    });
  }
</script>

<style scoped></style>
