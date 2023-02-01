<template>
  <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 300 }">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'operation'">
        <router-link
          :to="{ name: 'CollectionDetailPage', params: { collectionId: record.collectionId } }"
        >
          <a class="action-button">统计详情</a>
        </router-link>
        <router-link
          :to="{ name: 'CollectEditPage', params: { collectionId: record.collectionId } }"
          ><a class="action-button">编辑</a></router-link
        >
        <a class="action-button">分享</a>
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
  import { defineComponent, onMounted, reactive, ref, onBeforeMount } from 'vue';
  import { SvgIcon } from '/@/components/Icon';
  import { getCollectionListApi } from '/@/api/collection/collection';

  const test = (info) => {
    console.log(info);
  };

  const columns: TableColumnsType = [
    { title: '收集标题', width: 100, dataIndex: 'title', key: 'title', fixed: 'left' },
    {
      title: '收集者',
      width: 50,
      dataIndex: 'collectorName',
      key: 'collectorName',
    },
    // { title: '收集状态', dataIndex: 'address', key: '1', width: 150 },
    // { title: '提交人数', dataIndex: 'address', key: '2', width: 150 },
    // { title: '截止时间', dataIndex: 'address', key: '3', width: 150 },
    {
      title: '文件详情',
      key: 'operation',
      width: 150,
    },
  ];

  interface DataItem {
    collectionId: string;
    key: number;
    title: string;
    collectorName: string;
    // address: string;
  }

  let data: DataItem[] = reactive([]);

  async function getCollectionList() {
    await getCollectionListApi().then(function (response) {
      console.log(response);
      console.log(response.length);
      for (let i = 0; i < response.length; i++) {
        data.push({
          key: i,
          collectionId: response[i].collectionId,
          title: response[i].title,
          // response[i].collectorName
          collectorName: response[i].collectorName,
        });
      }
    });
    console.log('data');
    console.log(data);
  }
  getCollectionList();
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
