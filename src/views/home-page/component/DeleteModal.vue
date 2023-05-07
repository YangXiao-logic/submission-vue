<template>
  <a-modal
    :title="t('view.home.modal.deleteCollection')"
    @ok="
      deleteCollection(collectionId);
      visible = false;
    "
    v-model:visible="visible"
  >
    <p>{{ t('view.home.modal.sureDelete') }}</p>
  </a-modal>
</template>

<script setup>
  import { deleteCollectionApi } from '/@/api/collection/collection';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();

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
