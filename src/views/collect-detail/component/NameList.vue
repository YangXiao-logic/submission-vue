<template>
  <a-button style="margin-bottom: 20px" @click="visible = true">添加姓名</a-button>
  <a-row :gutter="[16, 16]">
    <a-col v-for="item in 30" :xs="8" :sm="6" :md="4" :lg="3" :xl="2"
      ><div class="name_col">姓名{{ item }}</div></a-col
    >
  </a-row>
  <a-divider />
  <div>根据过往的收集记录，可能你会关注以下人员是否提交（点击添加到本次应交名单）</div>
  <a-row :gutter="[16, 16]">
    <a-col v-for="item in 10" :xs="8" :sm="6" :md="4" :lg="3" :xl="2">
      <div class="add_name_col"><plus-outlined />姓名{{ item }}</div>
    </a-col>
  </a-row>
  <a-modal v-model:visible="visible" title="添加姓名">
    <a-textarea v-model:value="nameTotal" />
  </a-modal>
</template>

<script lang="ts" setup>
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';
  const visible = ref(false);
  const nameTotal = ref('');
</script>

<style scoped lang="less">
  .name_col {
    text-align: center;
    padding: 3px;
    background-color: @second-1-color;
    width: 100%;
  }
  .add_name_col {
    text-align: center;
    padding: 3px;
    background-color: @second-1-color;
    width: 100%;
  }
</style>
