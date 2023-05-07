<template>
  <a-row :gutter="20" justify="center">
    <a-col :span="24">
      <a-tooltip
        v-if="question.type === QuestionType.NAME"
        :title="t('view.create.question.nameQuestionTooltip')"
        placement="topLeft"
        :get-popup-container="getPopupContainer"
      >
        <question-circle-outlined class="question-icon" />
      </a-tooltip>
      <!--      :rules="rules"-->
      <!--      :name="['questionList', 'name']"-->
      <a-form-item
        :label="question.questionOrder"
        :rules="[{ required: true, message: 'Please input question name!' }]"
        style="margin-bottom: 0px"
      >
        <div v-if="question.type === QuestionType.NAME"> {{ question.name }}</div>
        <a-input
          v-else
          v-model:value="question.name"
          :bordered="false"
          :placeholder="t('view.create.question.questionNamePlaceholder')"
        />
      </a-form-item>
      <!--    </div>-->
      <a-form-item style="margin-bottom: 0px">
        <a-input
          v-model:value="question.description"
          :bordered="false"
          :placeholder="t('view.create.question.questionDescriptionPlaceholder')"
        />
      </a-form-item>
      <div v-if="question.type === QuestionType.FILE_ATTACHMENT">
        <SingleFileAttachment
          disabled="true"
          :fileRenamePatternList="question.fileRenamePatternList"
          @change-rename-pattern="changeRenamePattern"
        />
      </div>
      <div v-else-if="question.type === QuestionType.SIMPLE_TEXT_INPUT">
        <a-input :disabled="true" :placeholder="t('view.create.question.userInput')" />
      </div>
      <div v-else-if="question.type === QuestionType.NAME">
        <a-input :disabled="true" :placeholder="t('view.create.question.userInput')" />
      </div>
      <div v-else-if="question.type === QuestionType.SINGLE_CHOICE">
        <OptionQuestion :optionList="question.optionList" />
      </div>
      <div v-else-if="question.type === QuestionType.MULTIPLY_CHOICE">
        <OptionQuestion :optionList="question.optionList" />
      </div>
      <a-row justify="space-between" style="margin-top: 10px">
        <a-col :span="6"
          ><a-checkbox v-model:checked="question.required">{{
            t('view.create.question.required')
          }}</a-checkbox></a-col
        >
        <a-col
          ><span style="margin: 10px">
            <copy-outlined style="font-size: 1.3em" />
            <a-button type="text" @click="$emit('copyQuestion')" style="">{{
              t('view.create.question.copyQuestion')
            }}</a-button>
          </span>
          <span>
            <delete-outlined style="font-size: 1.3em" />
            <a-button type="text" @click="$emit('deleteQuestion')" style="">{{
              t('view.create.question.deleteQuestion')
            }}</a-button>
          </span>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
  import SingleFileAttachment from '/@/views/question/collection/question-content/SingleFileAttachment.vue';
  import { computed, inject, ref } from 'vue';
  import type { SelectProps } from 'ant-design-vue';
  import OptionQuestion from '/@/views/question/collection/question-content/OptionQuestion.vue';
  import { QuestionType } from '/@/views/question/question-type/QuestionType';
  import { QuestionCircleOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import Schema from 'async-validator';
  import { Rule } from 'ant-design-vue/es/form';

  const { t } = useI18n();
  const props = defineProps({
    question: {
      type: Object,
      required: true,
    },
    deleteQuestion: Function,
    copyQuestion: Function,
  });

  const descriptor = {};

  function getPopupContainer() {
    return document.body;
  }
  const questionNameList = inject('questionNameList');

  const nameDict = computed(() => {
    const countMap: Record<string, number> = {};
    questionNameList.value.forEach((item) => {
      countMap[item.name] = countMap[item.name] ? countMap[item.name] + 1 : 1;
    });
    return countMap;
  });

  const changeRenamePattern = (patternList) => {
    console.log(patternList);
    props.question.fileRenamePatternList = patternList.map((item, index) => {
      return { tempQuestionId: item.tempQuestionId, patternOrder: index + 1 };
    });
  };

  // Validate Rule: Question Name can not be equal.
  // let validateRepeat = async (_rule: Rule, value: string) => {
  //   if (nameDict[value] && nameDict[value] >= 2) {
  //     return Promise.reject('Each question must have a distinct title.');
  //   } else {
  //     return Promise.resolve();
  //   }
  // };
  // const rules: Rule[] = [
  //   { required: true, message: 'Please input question name!' },
  //   { required: true, validator: validateRepeat, trigger: 'change' },
  // ];
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
