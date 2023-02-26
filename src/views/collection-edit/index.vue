<template>
  <CollectionChange v-if="isShow" :collectionForm="collectionForm">
    <a-divider />
    <a-row :gutter="20" justify="end">
      <a-col :span="4">
        <a-form-item>
          <a-button @click="editCollection" style="width: 100%" type="primary">编辑</a-button>
        </a-form-item>
      </a-col>
      <a-col :span="4">
        <a-button style="width: 100%" type="primary">预览</a-button>
      </a-col>
    </a-row>
  </CollectionChange>
</template>

<script setup lang="ts">
  import { getCollectionApi, updateCollectionApi } from '/@/api/collection/collection';
  import { reactive, ref, watch, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  import CollectionChange from '/@/views/collection-create/component/CollectionChange.vue';
  import dayjs from 'dayjs';
  const route = useRoute();
  const collectionId = route.params.collectionId;
  const collectionForm = ref();
  const isShow = ref(false);
  async function getCollection() {
    collectionForm.value = await getCollectionApi(collectionId);
    collectionForm.value.releaseTime = dayjs(collectionForm.value.releaseTime);
    collectionForm.value.closeTime = dayjs(collectionForm.value.closeTime);
    isShow.value = true;
  }
  getCollection();
  async function editCollection() {
    await updateCollectionApi(collectionForm.value, collectionId);
  }
</script>

<style scoped></style>
