<template>
  <a-checkbox-group v-model:value="answerContent" :options="optionList">
    <a-checkbox v-for="option in optionList" :value="option">{{ option }}</a-checkbox>
  </a-checkbox-group>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  defineProps({
    optionList: Array,
    answerContent: Array,
  });
</script>

<style scoped></style>
