<template>
  <a-button style="margin-bottom: 20px" @click="visible = true">{{
    t('view.detail.nameList.addName')
  }}</a-button>
  <a-row :gutter="[16, 16]">
    <a-col v-for="(item, index) in nameList" :md="4" :lg="3" :xl="2">
      <!--      <div class="name_col">{{ item }}</div>-->
      <!--      <a-button type="primary" shape="circle" icon="close" />-->
      <a-button @click="$emit('deleteName', index)">
        <span class="icon-wrapper">
          <close-outlined />
        </span>
        {{ item }}
      </a-button>
    </a-col>
  </a-row>
  <a-divider />
  <div>{{ t('view.detail.nameList.followUpMessage') }}</div>
  <a-row :gutter="[16, 16]">
    <a-col v-for="(item, index) in remainNameList" :xs="8" :sm="6" :md="6" :lg="4" :xl="4">
      <a-button class="add_name_col" @click="$emit('addRemainName', index)"
        ><plus-outlined />{{ item }}</a-button
      >
    </a-col>
  </a-row>

  <a-modal
    v-model:visible="visible"
    :title="t('view.detail.nameList.addNameButton')"
    @ok="
      $emit('addNameList', newNameString);
      visible = false;
    "
  >
    <div style="padding: 15px">
      <a-textarea :rows="10" v-model:value="newNameString" allow-clear />
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
  import { PlusOutlined, CloseOutlined } from '@ant-design/icons-vue';
  import { defineProps, ref, watch } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();
  const visible = ref(false);
  const newNameString = ref(t('view.detail.nameList.nameList'));
  const props = defineProps({
    nameList: Array,
    remainNameList: Array,
  });

  // const nameList = props.nameList;
  // const remainNameList = props.remainNameList;
</script>

<style scoped lang="less">
  .name_col {
    text-align: center;
    padding: 3px;
    background-color: @secondary-gray-color;
    width: 100%;
  }
  .add_name_col {
    text-align: center;
    padding: 3px;
    background-color: #b8cbe0;
    width: 100%;
  }
  .icon-wrapper {
    position: absolute;
    top: 0px;
    right: 0px;
  }
</style>
