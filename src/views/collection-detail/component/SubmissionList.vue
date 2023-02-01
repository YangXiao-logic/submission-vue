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
  import { defineComponent, ref } from 'vue';
  import RecordDetail from '/@/views/collection-detail/component/RecordDetail.vue';
  import { useRoute } from 'vue-router';
  import { getSubmissionListApi } from '/@/api/collection/submission';

  const columns: TableColumnsType = [
    { title: '姓名', width: 20, dataIndex: 'name', key: 'name' },
    { title: '提交时间', dataIndex: 'submitTime', key: '1', width: 30 },
    { title: '文件数量', dataIndex: 'fileNum', key: '2', width: 20 },
    {
      title: '文件详情',
      key: 'operation',
      width: 50,
    },
  ];

  interface DataItem {
    key: number;
    name: string;
    fileNum: number;
    submitTime: string;
  }

  const submissionList = ref([] as DataItem[]);
  for (let i = 0; i < 100; i++) {
    submissionList.value.push({
      key: i,
      name: `Edrward ${i}`,
      fileNum: 2,
      submitTime: `London Park no. ${i}`,
    });
  }
  const collectionId = useRoute().params.collectionId;
  const getSubmissionList = async () => {
    submissionList.value = await getSubmissionListApi(collectionId);
  };
  getSubmissionList();
</script>

<style scoped></style>
