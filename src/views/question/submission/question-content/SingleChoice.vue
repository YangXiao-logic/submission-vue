<template>
  <a-radio-group v-model:value="answerContent[0]">
    <a-radio v-for="option in optionList" :style="radioStyle" :value="option">{{ option }}</a-radio>
  </a-radio-group>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';

  defineProps({
    optionList: Array,
    answerContent: Array,
  });

  const radioStyle = reactive({
    display: 'flex',
    height: '30px',
    lineHeight: '30px',
  });
</script>

<style scoped></style>
