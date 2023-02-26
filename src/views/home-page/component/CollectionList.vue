<template>
  <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 300 }">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'operation'">
        <router-link
          :to="{ name: 'CollectionDetailPage', params: { collectionId: record.collectionId } }"
        >
          <a class="action-button">{{ t('view.home.list.detail') }}</a>
        </router-link>
        <router-link
          :to="{ name: 'CollectEditPage', params: { collectionId: record.collectionId } }"
          ><a class="action-button">{{ t('view.home.list.edit') }}</a></router-link
        >
        <a
          class="action-button"
          @click="
            modalCollectionId = record.collectionId;
            visible = true;
          "
          >分享</a
        >
        <a-popover trigger="hover">
          <template #content>
            <a class="omit-action" @click="stopCollection(record.collectionId)">停止收集</a>
            <a
              class="omit-action"
              @click="
                deleteModalCollectionId = record.collectionId;
                deleteVisible = true;
              "
              >删除收集</a
            >
          </template>
          <SvgIcon name="omit" />
        </a-popover>
      </template>
      <template v-else-if="column.key === 'state'">
        <div v-if="record.state === 1"> 正在收集 </div>
        <div v-else-if="record.state === 0"> 已截止 </div>
      </template>
    </template>
  </a-table>
  <ShareModal :collectionId="modalCollectionId" :visible="visible" />
  <DeleteModal
    :collectionId="deleteModalCollectionId"
    :visible="deleteVisible"
    :reloadCollectionList="getCollectionList"
  />
</template>

<script setup lang="ts">
  import type { TableColumnsType } from 'ant-design-vue';
  import { defineComponent, onMounted, reactive, ref, onBeforeMount } from 'vue';
  import { SvgIcon } from '/@/components/Icon';
  import { getCollectionListApi, stopCollectionApi } from '/@/api/collection/collection';
  import ShareModal from '/@/views/home-page/component/ShareModal.vue';
  import Modal from '/@/components/Modal/src/components/Modal';
  import DeleteModal from '/@/views/home-page/component/DeleteModal.vue';

  const modalCollectionId = ref();
  const visible = ref(false);
  const deleteModalCollectionId = ref();
  const deleteVisible = ref(false);
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();
  const columns: TableColumnsType = [
    { title: '收集标题', width: 100, dataIndex: 'title', key: 'title', fixed: 'left' },
    {
      title: '收集者',
      width: 50,
      dataIndex: 'collectorName',
      key: 'collectorName',
    },
    { title: '收集状态', dataIndex: 'state', key: 'state', width: 50 },
    { title: '提交人数', dataIndex: 'submissionCount', key: 'submissionCount', width: 50 },
    { title: '截止时间', dataIndex: 'closeTime', key: 'closeTime', width: 50 },
    {
      title: '操作',
      key: 'operation',
      width: 150,
    },
  ];

  // interface DataItem {
  //   collectionId: string;
  //   // key: number;
  //   title: string;
  //   collectorName: string;
  //   // address: string;
  // }

  const data = ref();

  async function getCollectionList() {
    data.value = await getCollectionListApi();
    console.log('data');
    console.log(data);
  }
  getCollectionList();

  async function stopCollection(collectionId) {
    await stopCollectionApi(collectionId);
    await getCollectionList();
  }
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
