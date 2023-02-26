<template>
  <div style="margin-bottom: 20px"
    ><span style="margin: 10px">文件将被重新命名为格式:</span>
    <!--    <div style="display: inline-block; border: 1px solid #000000; width: 500px">-->
    <!--      <div v-for="rule in patternList" style="display: inline-block; margin-right: 10px">-->
    <!--        <span v-if="rule.type === FileRenamePattern.QUESTION" style="color: #5c0c43">{{-->
    <!--          rule.label-->
    <!--        }}</span>-->
    <!--        <span v-else-if="rule.type === FileRenamePattern.TEXT">{{ rule.label }}</span>-->
    <!--      </div>-->
    <!--    </div>-->
    <a-select
      style="width: 20%; float: right"
      v-model:value="patternList"
      mode="multiple"
      placeholder="未设置"
      @change="addQuestionPattern"
    >
      <a-select-option v-for="questionName in questionNameList" :value="questionName.name">
        {{ questionName.name }}
      </a-select-option>
    </a-select>
  </div>
  <a-upload-dragger name="file" disabled="true" @change="handleChange" @drop="handleDrop">
    <p class="ant-upload-drag-icon">
      <inbox-outlined />
    </p>
    <p class="ant-upload-text">Click or drag file to this area to upload</p>
  </a-upload-dragger>
</template>
<script lang="ts" setup>
  import { InboxOutlined } from '@ant-design/icons-vue';
  import type { UploadChangeParam } from 'ant-design-vue';
  import { message } from 'ant-design-vue';
  import { computed, inject, ref } from 'vue';
  import { FileRenamePattern } from '/@/views/question/question-type/FileRenamePattern';

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
  const props = defineProps({
    fileRenamePatternList: {
      type: Array,
      required: true,
    },
  });

  const handleDrop = (e: DragEvent) => {
    console.log(e);
  };

  // const fileNameRuleList = ref([
  //   {
  //     type: FileRenamePattern.QUESTION,
  //     label: '姓名',
  //   },
  //   {
  //     type: FileRenamePattern.QUESTION,
  //     label: '学号',
  //   },
  //   {
  //     type: FileRenamePattern.TEXT,
  //     label: '操作系统作业',
  //   },
  // ]);

  const questionNameList = inject<Array>('questionNameList');

  const patternList = computed(() => {
    return props.fileRenamePatternList.map((item) => {
      const questionName = questionNameList.find(
        (question) => question.tempQuestionId == item.tempQuestionId,
      );
      item = questionName.name;
      return item;
    });
  });

  const options = computed(() => {
    return questionNameList.map((item) => {
      return item.name;
    });
  });

  const showRuleText = () => {
    show.value = true;
  };

  const addTextPattern = () => {
    props.fileRenamePatternList.push({
      type: FileRenamePattern.TEXT,
      label: inputValue.value,
      order: props.fileRenamePatternList.length,
    });
    show.value = false;
  };

  const addQuestionPattern = (tempQuestionId) => {
    props.fileRenamePatternList.push({
      type: FileRenamePattern.QUESTION,
      tempQuestionId: tempQuestionId,
      order: props.fileRenamePatternList.length,
    });
  };

  const optionValue = ref('');
  const inputValue = ref('');
  const show = ref(false);
  const VNodes = (_, { attrs }) => {
    return attrs.vnodes;
  };
</script>
