<template>
  <div style="display: flex" v-for="(option, idx) in optionList">
    <minus-circle-outlined
      style="font-size: 16px; align-self: center"
      @click="optionList.splice(idx)"
    />
    <a-input
      style="display: inline-block; width: 95%; float: right; margin: 10px"
      placeholder="填入选项内容"
      v-model:value="optionList[idx]"
    />
  </div>
  <a-button @click="optionList.push('')"
    ><template #icon><plus-circle-outlined /></template>New Option</a-button
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
    optionList: Array,
  });
</script>

<style scoped></style>
