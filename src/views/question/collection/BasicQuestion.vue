<template>
  <a-row :gutter="20" justify="center">
    <a-col :span="24">
      <a-tooltip
        v-if="question.type === QuestionType.NAME"
        title="系统将依据“姓名”的题目，为您生成智能名单。"
        placement="topLeft"
        :get-popup-container="getPopupContainer"
      >
        <question-circle-outlined class="question-icon" />
      </a-tooltip>
      <a-form-item
        :label="question.questionOrder"
        :rules="[{ required: true, message: 'Please input question name!' }]"
        style="margin-bottom: 0px"
      >
        <div v-if="question.type === QuestionType.NAME">{{ question.name }}</div>
        <a-input v-else v-model:value="question.name" :bordered="false" placeholder="请输入问题" />
      </a-form-item>
      <!--    </div>-->
      <a-form-item style="margin-bottom: 0px">
        <a-input
          v-model:value="question.description"
          :bordered="false"
          placeholder="添加题目描述"
        />
      </a-form-item>
      <div v-if="question.type === QuestionType.FILE_ATTACHMENT">
        <SingleFileAttachment
          disabled="true"
          :fileRenamePatternList="question.fileRenamePatternList"
        />
      </div>
      <div v-else-if="question.type === QuestionType.SIMPLE_TEXT_INPUT">
        <a-input :disabled="true" placeholder="此处用户填入" />
      </div>
      <div v-else-if="question.type === QuestionType.NAME">
        <a-input :disabled="true" placeholder="此处用户填入" />
      </div>
      <div v-else-if="question.type === QuestionType.SINGLE_CHOICE">
        <OptionQuestion :optionList="question.optionList" />
      </div>
      <div v-else-if="question.type === QuestionType.MULTIPLY_CHOICE">
        <OptionQuestion :optionList="question.optionList" />
      </div>
      <a-row justify="space-between" style="margin-top: 10px">
        <a-col :span="6"><a-checkbox v-model:value="question.required">必选</a-checkbox></a-col>
        <a-col
          ><span style="margin: 10px">
            <copy-outlined style="font-size: 1.3em" />
            <a-button type="text" @click="$emit('copyQuestion')" style="">复制题目</a-button>
          </span>
          <span>
            <delete-outlined style="font-size: 1.3em" />
            <a-button type="text" @click="$emit('deleteQuestion')" style="">删除题目</a-button>
          </span>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
  import SingleFileAttachment from '/@/views/question/collection/question-content/SingleFileAttachment.vue';
  import { inject, ref } from 'vue';
  import type { SelectProps } from 'ant-design-vue';
  import OptionQuestion from '/@/views/question/collection/question-content/OptionQuestion.vue';
  import { QuestionType } from '/@/views/question/question-type/QuestionType';
  import { QuestionCircleOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons-vue';

  defineProps({
    question: {
      type: Object,
      required: true,
    },
    deleteQuestion: Function,
    copyQuestion: Function,
  });

  function getPopupContainer() {
    return document.body;
  }
</script>

<style scoped>
  .tooltip-trigger {
    display: inline-block;
    position: relative;
  }

  .tooltip-trigger p {
    display: inline-block;
    margin-right: 4px;
  }

  .question-icon {
    position: absolute;
    top: -2px;
    right: -2px;
    font-size: 18px;
    color: #1890ff;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }

  .question-icon:hover {
    transform: rotate(360deg);
  }
</style>
