<template>
  <a-modal
    v-model:visible="visible"
    centered
    :footer="null"
    :title="null"
    width="500px"
    :body-style="{ height: '300px', padding: '25px' }"
  >
    <!--    <p>{{ link }}</p>-->
    <a-input :value="link" style="margin: 10px; border-radius: 3px" />
    <a-button @click="copyLink" style="margin: 10px"> 复制链接</a-button>
  </a-modal>
</template>

<script setup>
  import { watchEffect, ref } from 'vue';
  import { message, Modal } from 'ant-design-vue';

  const props = defineProps({
    collectionId: String,
    visible: Boolean,
  });
  const link = ref();
  watchEffect(async () => {
    link.value = 'https://localhost:3100/#/submit/' + props.collectionId;
  });
  function copyLink() {
    navigator.clipboard.writeText(link.value);
    message.success('链接已复制');
  }
</script>

<style scoped>
  .a-input-group-addon {
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  .a-input-group-addon:hover {
    color: #1890ff;
  }
</style>
