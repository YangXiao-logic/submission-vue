<template>
  <a-modal
    title="Basic Modal"
    @ok="
      deleteCollection(collectionId);
      visible = false;
    "
    v-model:visible="visible"
  >
    <p>你确定要删除吗？删除后所有的提交也会被删除，并且无法恢复。</p>
  </a-modal>
</template>

<script setup>
  import { deleteCollectionApi } from '/@/api/collection/collection';

  const props = defineProps({
    collectionId: String,
    visible: Boolean,
    reloadCollectionList: Function,
  });
  async function deleteCollection(collectionId) {
    await deleteCollectionApi(collectionId);
    props.reloadCollectionList();
  }
</script>

<style scoped></style>
