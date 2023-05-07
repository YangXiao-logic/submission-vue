<template>
  <PageWrapper>
    <a-form :model="collectionForm" style="display: flex; justify-content: center">
      <a-space direction="vertical" style="width: 70%" class="content">
        <!--        :rules="[{ required: true, message: 'Please input collection title!' }]"-->
        <a-form-item name="collectionTitle">
          <!--                     :rules="[{ required: true, message: 'Please input your username!' }]"-->
          <a-input
            class="question_form__name"
            v-model:value="collectionForm.title"
            :bordered="false"
            :placeholder="t('view.create.collectionTitle')"
            style="font-size: 40px; text-align: center"
          />
        </a-form-item>
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item
              :label="t('view.create.collector')"
              :rules="[{ required: true, message: 'Please input collector name!' }]"
              name="collectorName"
            >
              <a-input
                v-model:value="collectionForm.collectorName"
                :placeholder="t('view.create.collector')"
                :bordered="false"
              />
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item :label="t('view.create.releaseTime')" required>
              <a-date-picker v-model:value="collectionForm.releaseTime" show-time />
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item :label="t('view.create.closeTime')" required>
              <a-date-picker v-model:value="collectionForm.closeTime" show-time />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item style="padding: 15px">
          <a-typography-title :level="4">{{ t('view.create.description') }}</a-typography-title>
          <a-textarea
            v-model:value="collectionForm.description"
            :placeholder="t('view.create.collectionDescription')"
            :rows="5"
            allow-clear
          />
          <!--          <Tinymce class="question_form" v-model="collectForm.description" />-->
        </a-form-item>

        <draggable
          v-model="collectionForm.questionList"
          @start="drag = true"
          @end="drag = false"
          item-key="order"
          @change="sortQuestion"
        >
          <template #item="{ element }">
            <BasicQuestion
              class="question_form"
              :question="element"
              @delete-question="deleteQuestion(element.questionOrder)"
              @copy-question="copyQuestion(element.questionOrder)"
            />
          </template>
        </draggable>
        <question-type-modal @add-question="addQuestion" />
        <slot></slot>
      </a-space>
    </a-form>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { provide, reactive, ref, defineProps, unref, isRef, watch, computed } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import BasicQuestion from '/@/views/question/collection/BasicQuestion.vue';
  import AButton from '/@/components/Button/src/BasicButton.vue';
  import { createCollectionApi, getCollectionApi } from '/@/api/collection/collection';
  import QuestionTypeModal from '/@/views/collection-create/component/QuestionTypeModal.vue';
  import { QuestionType } from '/@/views/question/question-type/QuestionType';
  import Draggable from 'vuedraggable';
  import { FileRenamePattern } from '/@/views/question/question-type/FileRenamePattern';
  import { useRoute } from 'vue-router';
  import dayjs from 'dayjs';
  import { buildShortUUID } from '/@/utils/uuid';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();

  const props = defineProps({
    collectionForm: {
      type: Object,
      required: true,
    },
  });
  const drag = ref(false);

  const deleteQuestion = (questionOrder) => {
    props.collectionForm.questionList.splice(questionOrder - 1, 1);
    sortQuestion();
  };

  const copyQuestion = (questionOrder) => {
    const newQuestion = { ...props.collectionForm.questionList[questionOrder - 1] };
    const ref1 = isRef(newQuestion);
    newQuestion.questionOrder = questionOrder + 1;
    props.collectionForm.questionList.splice(questionOrder, 0, newQuestion);
    sortQuestion();
  };

  const sortQuestion = () => {
    props.collectionForm.questionList = props.collectionForm.questionList.map((item, index) => {
      item.questionOrder = index + 1;
      return item;
    });
  };
  const addQuestion = (questionType) => {
    const newQuestion = {
      questionOrder: props.collectionForm.questionList.length + 1,
      name: '',
      description: '',
      type: questionType,
      optionList: [],
      tempQuestionId: buildShortUUID(),
    };
    console.log(newQuestion);
    if (questionType.type === QuestionType.NAME) {
      newQuestion.name = '姓名';
    }
    props.collectionForm.questionList.push(newQuestion);
  };

  const questionNameList = computed(() => {
    return props.collectionForm.questionList
      .filter((item) => {
        return (
          item.type == QuestionType.NAME ||
          item.type == QuestionType.SINGLE_CHOICE ||
          item.type == QuestionType.SIMPLE_TEXT_INPUT ||
          item.type == QuestionType.MULTIPLY_CHOICE
        );
      })
      .map((item) => {
        return { tempQuestionId: item.tempQuestionId, name: item.name };
      });
  });
  provide('questionNameList', questionNameList);

  // watch(props.collectionForm.questionList[])
</script>

<style scoped lang="less">
  .content {
    padding: 24px;
    background: @component-background;
  }

  .question_form {
    padding: 10px;
    margin: 5px;
    border: solid 1px #1a1a1a;
    border-radius: 10px;
    &__name {
      margin-bottom: 10px;
      height: 50px;
    }

    &__description {
    }
  }
</style>
