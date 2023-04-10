<template>
  <a-button @click="downloadFile">一键下载</a-button>
  <a-table :columns="columns" :data-source="submissionList" :scroll="{ x: 1500, y: 300 }">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'operation'">
        <RecordDetail :submissionId="record.submissionId" />
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
  import axios, { AxiosRequestConfig } from 'axios';
  import fs from 'fs';

  const columns: TableColumnsType = [
    { title: '姓名', width: 20, dataIndex: 'name', key: 'name' },
    { title: '提交时间', dataIndex: 'submitTime', key: '1', width: 30 },
    {
      title: '文件详情',
      key: 'operation',
      width: 50,
    },
  ];

  interface DataItem {
    submissionId: number;
    name: string;
    submitTime: string;
  }

  const submissionList = ref([] as DataItem[]);
  const collectionId = useRoute().params.collectionId;
  const getSubmissionList = async () => {
    const response = await getSubmissionListApi(collectionId);
    for (let i = 0; i < response.length; i++) {
      submissionList.value.push({
        submissionId: response[i].submissionId,
        name: response[i].name,
        submitTime: `London Park no. ${i}`,
      });
    }
  };
  getSubmissionList();

  const url = 'https://zip-oss-func-zip-oss-tsqqbqbbug.cn-chengdu.fcapp.run';
  const output = '/test/oss.zip';
  const fileDirData = {
    bucket: 'submission',
    'source-dir': 'submission/files/' + collectionId + '/',
  };

  const config: AxiosRequestConfig<{ bucket: string; 'source-dir': string }> = {
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'blob' as ResponseType,
  };
  // https://submission.oss-cn-chengdu.aliyuncs.com/output/1-63fea3a0-09b743b19366deb918022971.zip
  function downloadFile() {
    axios
      .post(url, fileDirData, config)
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/zip' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'oss.zip';
        document.body.appendChild(link);
        link.click();
        // console.log(response);
        // const fs = require('fs');
        // fs.writeFile('test.zip', response.data);
        // axios({ url: fileUrl, responseType: 'stream' }).then(function (response) {
        //   response.data.pipe(fs.createWriteStream(output));
        // });
      })
      .catch((error) => {
        console.error(error);
      });
  }
</script>

<style scoped></style>
