<template>
  <CollectionChange :collectionForm="collectionForm">
    <a-divider />
    <a-row :gutter="20" justify="end">
      <a-col :span="4">
        <a-form-item>
          <a-button @click="addCollection" style="width: 100%" type="primary">{{
            t('view.create.create')
          }}</a-button>
        </a-form-item>
      </a-col>
      <a-col :span="4">
        <a-button style="width: 100%" type="primary">{{ t('view.create.preview') }}</a-button>
      </a-col>
    </a-row>
  </CollectionChange>
</template>

<script setup lang="ts">
  import CollectionChange from '/@/views/collection-create/component/CollectionChange.vue';
  import { reactive, ref, watch } from 'vue';
  import { QuestionType } from '/@/views/question/question-type/QuestionType';
  import { FileRenamePattern } from '/@/views/question/question-type/FileRenamePattern';
  import { formatToDateTime } from '/@/utils/dateUtil';
  import dayjs from 'dayjs';
  import { createCollectionApi } from '/@/api/collection/collection';
  import { buildShortUUID } from '/@/utils/uuid';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();

  const nameQuestionId = buildShortUUID();

  const collectionForm = ref({
    title: t('view.create.default.collectionTitle'),
    collectorName: t('view.create.default.collectorName'),
    releaseTime: dayjs(),
    closeTime: dayjs().add(2, 'day'),
    description: '',
    questionList: [
      {
        tempQuestionId: nameQuestionId,
        questionOrder: 1,
        name: t('view.create.default.nameQuestion'),
        description: '',
        type: QuestionType.NAME,
        required: true,
      },
      {
        tempQuestionId: '1',
        questionOrder: 2,
        name: t('view.create.default.fileQuestion'),
        description: '',
        type: QuestionType.FILE_ATTACHMENT,
        required: false,
        fileRenamePatternList: [
          {
            tempQuestionId: nameQuestionId,
            patternOrder: 1,
          },
        ],
      },
    ],
  });

  console.log(collectionForm.value.questionList);

  async function addCollection() {
    try {
      await createCollectionApi(collectionForm.value);
    } catch (error) {
      console.log(error);
    }
  }
</script>

<style scoped></style>
