<template>
  <div style="display: flex" v-for="(option, idx) in options">
    <minus-circle-outlined
      style="font-size: 16px; align-self: center"
      @click="options.splice(idx)"
    />
    <a-input
      style="display: inline-block; width: 95%; float: right; margin: 10px"
      placeholder="填入选项内容"
      v-model:value="options[idx]"
    />
  </div>
  <a-button @click="options.push('')"
    ><template #icon><plus-circle-outlined /></template>添加选项</a-button
  >
</template>

<script setup lang="ts">
  import {
    UpOutlined,
    DownOutlined,
    MinusCircleOutlined,
    PlusCircleOutlined,
  } from '@ant-design/icons-vue';

  defineProps({
    options: Array,
  });
</script>

<style scoped></style>
