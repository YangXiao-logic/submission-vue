<template>
  <CollectionChange :collectionForm="collectionForm" />
</template>

<script setup lang="ts">
  import { getCollect } from '/@/api/collect/collect';
  import { reactive, watch, ref, onMounted, onBeforeMount } from 'vue';
  import { useRoute } from 'vue-router';
  import CollectionChange from '/@/views/collect-create/collection-change.vue';

  const route = useRoute();
  let collectionForm = ref();

  watch(
    () => route.params.collectionId,
    async (collectionId) => {
      await getCollect(collectionId).then(function (response) {
        console.log('response');
        console.log(response);
        collectionForm.value = response;
      });
    },
  );

  // async function fetchData() {
  //   await getCollect(route.params.collectionId).then(function (response) {
  //     collectionForm = reactive(response);
  //     console.log('response');
  //     console.log(response);
  //   });
  // }
  // fetchData();
  // console.log(collectionForm);
</script>

<style scoped></style>
