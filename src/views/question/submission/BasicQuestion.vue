<template>
  <a-row :gutter="20" justify="space-between">
    <a-col :span="24">
      <div>
        <span>*</span>
        <span style="margin-right: 15px">{{ questionData.questionOrder }}:</span>
        <span>{{ questionData.name }}</span>
      </div>
      <!--      <a-form-item-->
      <!--        :label="questionData.questionOrder"-->
      <!--        :rules="[{ required: true, message: 'Please input question name!' }]"-->
      <!--        style="margin-bottom: 0px"-->
      <!--      >-->
      <!--        <a-input v-model:value="questionData.name" :bordered="false" :disabled="true" />-->
      <!--      </a-form-item>-->
      <!--    </div>-->
      <div>
        <span>{{ questionData.description }}</span>
      </div>
      <!--      <a-form-item style="margin-bottom: 0px">-->
      <!--        <a-input-->
      <!--          v-model:value="questionData.description"-->
      <!--          :bordered="false"-->
      <!--          placeholder="添加题目描述"-->
      <!--        />-->
      <!--      </a-form-item>-->
      <div v-if="questionData.type === QuestionType.FILE_ATTACHMENT">
        <FileAttachment
          :fileRenamePatternList="questionData.fileRenamePatternList"
          :questionId="questionData.questionId"
        />
      </div>
      <div
        v-else-if="
          questionData.type === QuestionType.SIMPLE_TEXT_INPUT ||
          questionData.type === QuestionType.NAME
        "
      >
        <a-input placeholder="请输入回答" v-model:value="answer.answerContent[0]" />
      </div>
      <div v-else-if="questionData.type === QuestionType.SINGLE_CHOICE">
        <SingleChoice :optionList="questionData.optionList" :answerContent="answer.answerContent" />
      </div>
      <div v-else-if="questionData.type === QuestionType.MULTIPLY_CHOICE">
        <MutiChoice :optionList="questionData.optionList" :answerContent="answer.answerContent" />
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
  import { QuestionType } from '/@/views/question/question-type/QuestionType';
  import FileAttachment from '/@/views/question/submission/question-content/FileAttachment.vue';
  import SingleChoice from '/@/views/question/submission/question-content/SingleChoice.vue';
  import MutiChoice from '/@/views/question/submission/question-content/MutiChoice.vue';
  defineProps({
    questionData: {
      type: Object,
      required: true,
    },
    answer: Object,
  });
</script>

<style scoped></style>
