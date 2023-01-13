eslint-disable vue/no-mutating-props
<template>
  <a-row :gutter="20" justify="space-between">
    <a-col :span="20">
      <!--    <div style="display: flex; font-size: medium">-->
      <!--      <span>{{ question.order }}.</span>-->

      <a-form-item
        :label="question.questionOrder"
        :rules="[{ required: true, message: 'Please input question name!' }]"
        style="margin-bottom: 0px"
      >
        <a-input v-model:value="question.name" :bordered="false" placeholder="请输入问题" />
      </a-form-item>
      <!--    </div>-->
      <a-form-item style="margin-bottom: 0px">
        <a-input
          v-model:value="question.description"
          :bordered="false"
          placeholder="添加题目描述"
        />
      </a-form-item>

      <!--    <div v-else-if="enableAnswer">-->
      <!--      <div>{{ question.order }}. {{ question.name }}</div>-->
      <!--      <div>{{ question.description }}</div>-->
      <!--    </div>-->
      <div v-if="question.type === Question.FILE_ATTACHMENT">
        <SingleFileAttachment disabled="true" :fileNameRuleList="question.fileNameRuleList" />
      </div>
      <div v-else-if="question.type === Question.SIMPLE_TEXT_INPUT">
        <a-input :disabled="true" placeholder="此处用户填入" />
      </div>
      <div v-else-if="question.type === Question.SINGLE_OPTION">
        <OptionQuestion :optionList="question.optionList" />
      </div>
    </a-col>
    <!--    <a-col :span="2">-->
    <!--      <a-button v-if="!(question.order === 1)"><up-outlined /></a-button>-->
    <!--      <a-button v-if="!(question.order === questionLen)"><down-outlined /></a-button>-->
    <!--    </a-col>-->
  </a-row>
</template>

<script setup lang="ts">
  import SingleFileAttachment from './SingleFileAttachment.vue';
  import { inject, ref } from 'vue';
  import type { SelectProps } from 'ant-design-vue';
  import OptionQuestion from '/@/views/collect-create/question/OptionQuestion.vue';
  import { Question } from '/@/views/collect-create/question/question-type/Question';

  defineProps({
    question: {
      type: Object,
      required: true,
    },
  });
</script>

<style scoped></style>
