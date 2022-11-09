<template>
  <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 300 }">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <a class="action-button">分享</a>
        <a class="action-button">编辑</a>
        <a class="action-button">统计详情</a>
        <a-popover trigger="hover">
          <template #content>
            <a class="omit-action">复制收集</a>
            <a class="omit-action">停止收集</a>
            <a class="omit-action">删除收集</a>
          </template>
          <SvgIcon name="omit" />
        </a-popover>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
  import type { TableColumnsType } from 'ant-design-vue';
  import {defineComponent, onMounted, reactive, ref, onBeforeMount} from 'vue';
  import { SvgIcon } from '/@/components/Icon';
  import { listCollect } from '/@/api/collect/collect';

  const columns: TableColumnsType = [
    { title: '收集标题', width: 100, dataIndex: 'title', key: 'title', fixed: 'left' },
    {
      title: '收集者',
      width: 100,
      dataIndex: 'collectorName',
      key: 'collectorName',
      fixed: 'left',
    },
    // { title: '收集状态', dataIndex: 'address', key: '1', width: 150 },
    // { title: '提交人数', dataIndex: 'address', key: '2', width: 150 },
    // { title: '截止时间', dataIndex: 'address', key: '3', width: 150 },
    {
      title: '文件详情',
      key: 'operation',
      fixed: 'right',
      width: 150,
    },
  ];

  interface DataItem {
    key: number;
    title: string;
    collectorName: string;
    // address: string;
  }

  let data: DataItem[] = reactive([]);
  // for (let i = 0; i < 100; i++) {
  //   data.push({
  //     key: i,
  //     title: `Edrward ${i}`,
  //     collectorName: 32,
  //     // address: `London Park no. ${i}`,
  //   });
  // }
  console.log(data);
  async function getCollectList() {
    await listCollect().then(function (response) {
      for (let i = 0; i < response.length; i++) {
        data.push({
          key: i,
          title: response[i].title,
          // response[i].collectorName
          collectorName: '负责人',
        });
      }
    });
    // console.log(resdata);
    // var d;
    // for (let i = 0; i < 5; i++) {
    //   data.push({
    //     key: i,
    //     title: resdata[d].title,
    //     collectorName: 'resdata[d].collectorName',
    //   });
    // }
    console.log('data');
    console.log(data);
  }
  getCollectList();

</script>

<style scoped>
  .action-button {
    margin-right: 15px;
  }
  .omit-action {
    color: black;
    display: block;
    margin-bottom: 3px;
  }
</style>
