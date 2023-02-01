<template>
  <a-button style="margin-bottom: 20px" @click="visible = true">添加姓名</a-button>
  <a-row :gutter="[16, 16]">
    <a-col v-for="item in nameList" :xs="8" :sm="6" :md="4" :lg="3" :xl="2"
      ><div class="name_col">{{ item }}</div></a-col
    >
  </a-row>
  <a-divider />
  <div>根据过往的收集记录，可能你会关注以下人员是否提交（点击添加到本次应交名单）</div>
  <a-row :gutter="[16, 16]">
    <a-col v-for="(item, index) in remainNameList" :xs="8" :sm="6" :md="6" :lg="4" :xl="4">
      <div class="add_name_col" @click="addName(index)"><plus-outlined />{{ item }}</div>
    </a-col>
  </a-row>
  <a-modal v-model:visible="visible" title="添加姓名" @ok="addNameList">
    <div style="padding: 15px">
      <a-textarea :rows="10" v-model:value="newName" allow-clear />
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { defineProps, ref, watch } from 'vue';
  import {
    getNameListApi,
    getRemainNameListApi,
    putNameListApi,
  } from '/@/api/collection/collection';
  const visible = ref(false);
  const newName = ref('名称1 名称2 名称3');
  const props = defineProps({
    collectionId: String,
  });
  const nameList = ref([] as any[]);
  const remainNameList = ref([] as any[]);
  async function getNameList() {
    nameList.value = await getNameListApi(props.collectionId);
  }
  getNameList();
  async function getRemainNameList() {
    remainNameList.value = await getRemainNameListApi(props.collectionId);
  }
  getRemainNameList();

  function addName(index: any) {
    nameList.value.push(remainNameList.value.at(index));
    remainNameList.value.splice(index, 1);
  }

  const addNameList = (e: MouseEvent) => {
    const newNameList = newName.value.split(' ');
    nameList.value = nameList.value.concat(newNameList);
    newName.value = '';
    visible.value = false;
  };

  watch(
    () => nameList.value,
    async (nameListValue) => {
      await putNameListApi(props.collectionId, nameListValue);
    },
  );
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
