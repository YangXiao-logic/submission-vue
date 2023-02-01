<template>
  <CollectionChange :collectionForm="collectionForm" />
</template>

<script setup lang="ts">
  import { getCollectionApi } from '/@/api/collection/collection';
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import CollectionChange from '/@/views/collection-create/collection-change.vue';

  const route = useRoute();
  let collectionForm = ref();

  watch(
    () => route.params.collectionId,
    async (collectionId) => {
      collectionForm.value = await getCollectionApi(collectionId);
    },
  );
</script>

<style scoped></style>
