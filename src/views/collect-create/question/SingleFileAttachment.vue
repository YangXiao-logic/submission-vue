<template>
  <div style="margin-bottom: 20px"
    ><span>文件将被重新命名为格式: </span>
    <div style="display: inline-block">
      <div v-for="rule in fileNameRule" style="display: inline-block">
        <span v-if="rule.type === NameRuleType.QUESTION" style="background-color: #e3e4ec">{{
          rule.label
        }}</span>
        <span v-else-if="rule.type === NameRuleType.TEXT">{{ rule.label }}</span>
        <span>+</span>
      </div>
    </div>
    <a-input
      style="width: 20%"
      v-if="show"
      v-model:value="inputValue"
      @keyup.enter="addRuleText"
    />
    <a-select
      style="width: 20%; float: right"
      v-model:value="optionValue"
      placeholder="你可以输入文本，也可以选择其他问题"
      :options="questionNameList"
      @change="addRuleOption"
    >
      <template #dropdownRender="{ menuNode: menu }">
        <v-nodes :vnodes="menu" />
        <a-divider style="margin: 4px 0" />
        <div
          style="padding: 4px 8px; cursor: pointer"
          @mousedown="(e) => e.preventDefault()"
          @click="showRuleText"
        >
          <plus-outlined />
          Add item
        </div>
      </template>
    </a-select>
  </div>
  <a-upload-dragger
    v-model:fileList="fileList"
    name="file"
    :multiple="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    @change="handleChange"
    @drop="handleDrop"
  >
    <p class="ant-upload-drag-icon">
      <inbox-outlined />
    </p>
    <p class="ant-upload-text">Click or drag file to this area to upload</p>
  </a-upload-dragger>
</template>
<script lang="ts" setup>
  import { InboxOutlined } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
  import { defineComponent, inject, ref } from 'vue';
  import type { UploadChangeParam } from 'ant-design-vue';

  const handleChange = (info: UploadChangeParam) => {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const fileList = ref([]);

  const handleDrop = (e: DragEvent) => {
    console.log(e);
  };
  enum NameRuleType {
    QUESTION = 'question',
    TEXT = 'text',
  }

  const fileNameRule = ref([
    {
      type: NameRuleType.QUESTION,
      label: '姓名',
    },
    {
      type: NameRuleType.QUESTION,
      label: '学号',
    },
    {
      type: NameRuleType.TEXT,
      label: '操作系统作业',
    },
  ]);

  const questionNameList = inject('questionNameList', [
    {
      value: 'rule',
      label: 'rule',
    },
  ]);

  const showRuleText = () => {
    show.value = true;
  };

  const addRuleText = () => {
    fileNameRule.value.push({ type: NameRuleType.TEXT, label: inputValue.value });
    show.value = false;
    console.log(fileNameRule);
  };

  const addRuleOption = () => {
    fileNameRule.value.push({ type: NameRuleType.QUESTION, label: optionValue.value });
  };

  const optionValue = ref('');
  const inputValue = ref('');
  const show = ref(false);
  const VNodes = (_, { attrs }) => {
    return attrs.vnodes;
  };
</script>
