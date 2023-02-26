<template>
  <CollectionEdit :collectionForm="collectionForm">
    <a-divider />
    <a-row :gutter="20" justify="end">
      <a-col :span="4">
        <a-form-item>
          <a-button @click="addCollection" style="width: 100%" type="primary">创建</a-button>
        </a-form-item>
      </a-col>
      <a-col :span="4">
        <a-button style="width: 100%" type="primary">预览</a-button>
      </a-col>
    </a-row>
  </CollectionEdit>
</template>

<script setup lang="ts">
  import CollectionEdit from '/@/views/collection-create/component/CollectionChange.vue';
  import { reactive, ref, watch } from 'vue';
  import { QuestionType } from '/@/views/question/question-type/QuestionType';
  import { FileRenamePattern } from '/@/views/question/question-type/FileRenamePattern';
  import { formatToDateTime } from '/@/utils/dateUtil';
  import dayjs from 'dayjs';
  import { createCollectionApi } from '/@/api/collection/collection';
  import { buildShortUUID } from '/@/utils/uuid';

  const nameQuestionId = buildShortUUID();

  const collectionForm = ref({
    title: '收集标题',
    collectorName: '负责人',
    releaseTime: dayjs(),
    closeTime: dayjs().add(2, 'day'),
    description: '',
    questionList: [
      {
        tempQuestionId: nameQuestionId,
        questionOrder: 1,
        name: '姓名',
        description: '',
        type: QuestionType.NAME,
        required: true,
      },
      {
        questionOrder: 2,
        name: '文件',
        description: '',
        type: QuestionType.FILE_ATTACHMENT,
        required: false,
        fileRenamePatternList: [
          {
            tempQuestionId: nameQuestionId,
            order: 1,
          },
        ],
      },
    ],
  });

  async function addCollection() {
    try {
      await createCollectionApi(collectionForm.value);
    } catch (error) {
      console.log(error);
    }
  }
</script>

<style scoped></style>
