<template>
  <PageWrapper>
    <a-form :model="collectionForm" style="display: flex; justify-content: center">
      <a-space direction="vertical" style="width: 70%" class="content">
        <a-form-item>
          <!--                     :rules="[{ required: true, message: 'Please input your username!' }]"-->
          <a-input
            required="true"
            class="question_form__name"
            v-model:value="collectionForm.title"
            :bordered="false"
            placeholder="收集题目"
            style="font-size: 40px; text-align: center"
          />
        </a-form-item>
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item
              label="收集者"
              :rules="[{ required: true, message: 'Please input collector name!' }]"
            >
              <a-input
                v-model:value="collectionForm.collectorName"
                placeholder="负责人"
                :bordered="false"
              />
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item label="发布时间" required>
              <a-date-picker
                v-model:value="collectionForm.releaseTime"
                show-time
                placeholder="发布时间"
              />
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item label="截止时间" required>
              <a-date-picker
                v-model:value="collectionForm.closeTime"
                show-time
                placeholder="截止时间"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item style="padding: 15px">
          <a-typography-title :level="4">描述</a-typography-title>
          <a-textarea
            v-model:value="collectionForm.description"
            placeholder="描述收集"
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
    if (questionType.type === QuestionType.NAME) {
      newQuestion.name = '姓名';
    }
    props.collectionForm.questionList.push(newQuestion);
    console.log(props.collectionForm.questionList.length);
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
