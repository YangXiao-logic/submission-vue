<template>
  <a-row :gutter="20" justify="space-between">
    <a-col :span="24">
      <a-form-item
        :label="questionData.questionOrder + '. ' + questionData.name"
        :required="questionData.required"
      >
        <div>
          <span>{{ questionData.description }}</span>
        </div>
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
          <a-input
            :placeholder="t('view.submit.pleaseInput')"
            v-model:value="answer.answerContent[0]"
          />
        </div>
        <div v-else-if="questionData.type === QuestionType.SINGLE_CHOICE">
          <SingleChoice
            :optionList="questionData.optionList"
            :answerContent="answer.answerContent"
          />
        </div>
        <div v-else-if="questionData.type === QuestionType.MULTIPLY_CHOICE">
          <MutiChoice :optionList="questionData.optionList" :answerContent="answer.answerContent" />
        </div>
      </a-form-item>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
  import { QuestionType } from '/@/views/question/question-type/QuestionType';
  import FileAttachment from '/@/views/question/submission/question-content/FileAttachment.vue';
  import SingleChoice from '/@/views/question/submission/question-content/SingleChoice.vue';
  import MutiChoice from '/@/views/question/submission/question-content/MutiChoice.vue';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();
  const props = defineProps({
    questionData: {
      type: Object,
      required: true,
    },
    answer: Object,
  });
</script>

<style scoped></style>
