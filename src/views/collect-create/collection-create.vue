<template>
  <CollectionEdit :collectionForm="collectForm" />
</template>

<script setup lang="ts">
  import CollectionEdit from '/@/views/collect-create/collection-change.vue';
  import { reactive } from 'vue';
  import { Question } from '/@/views/collect-create/question/question-type/Question';
  import { NameRuleType } from '/@/views/collect-create/question/question-type/NameRuleType';
  import { formatToDateTime } from '/@/utils/dateUtil';
  import dayjs from 'dayjs';

  const collectForm = reactive({
    title: '收集标题',
    collectorName: '负责人',
    releaseTime: dayjs(),
    closeTime: dayjs().add(2, 'day'),
    description: '',
    questionList: [
      {
        questionOrder: 1,
        name: '姓名',
        description: '',
        type: Question.SIMPLE_TEXT_INPUT,
      },
      {
        questionOrder: 2,
        name: '文件',
        description: '',
        type: Question.FILE_ATTACHMENT,
        fileNameRuleList: [
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
        ],
      },
      {
        questionOrder: 3,
        name: '单选',
        description: '',
        type: Question.SINGLE_OPTION,
        optionList: ['option1', 'option2'],
      },
    ],
  });
</script>

<style scoped></style>
