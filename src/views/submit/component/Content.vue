<template>
  <div class="bg-color" style="display: flex; justify-content: center">
    <div direction="vertical" style="width: 60%; position: relative" class="content">
      <div style="font-size: 40px; text-align: center">{{ collection.title }}</div>
      <div style="padding: 3%">{{ collection.description }}</div>
      <a-row :gutter="20" justify="space-around">
        <a-col :span="4">
          <div class="border-class">收集者：{{ collection.collectorName }}</div>
        </a-col>
        <a-col :span="8">
          <div class="border-class">截止时间：{{ collection.closeTime }}</div>
        </a-col>
      </a-row>

      <a-form :model="collection.questionList">
        <a-row>
          <!--          using a-col to order question-->
          <a-col
            v-for="(question, index) in collection.questionList"
            :order="question.questionOrder"
            :span="24"
            :submissionForm="submissionForm"
          >
            <BasicQuestion
              class="question_form"
              :questionData="question"
              :answer="submissionForm[index]"
            />
          </a-col>
        </a-row>
      </a-form>
      <div style="position: absolute; bottom: 5%; left: 5%; width: 90%"></div>
      <div>
        <a-divider style="height: 1px; background-color: gray" />
        <a-row :gutter="20" justify="center">
          <a-col :span="5">
            <a-button style="width: 100%" type="primary" @click="submit">提交</a-button>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import { defineAsyncComponent, onBeforeMount, provide, reactive, ref } from 'vue';

  import { QuestionType } from '/@/views/question/question-type/QuestionType';
  import { FileRenamePattern } from '/@/views/question/question-type/FileRenamePattern';
  import { createSubmissionApi } from '/@/api/collection/submit';
  import { useRoute } from 'vue-router';
  import { getCollectionApi } from '/@/api/collection/collection';
  import { Collection, Question } from '/#/collection';

  const BasicQuestion = defineAsyncComponent(
    () => import('/@/views/question/submission/BasicQuestion.vue'),
  );

  let collection = ref<Collection>({
    title: '',
    collectorName: '',
    releaseTime: '',
    closeTime: '',
    description: '',
    questionList: [],
    // questionList: [
    //   { questionId: '', name: '', questionOrder: 1, description: '', type: '', optionList: '' },
    // ],
  });
  const haveData = ref(false);
  // const collection = ref();

  interface Answer {
    questionId: string | undefined;
    answerContent: string[];
  }
  const route = useRoute();
  const collectionId = route.params.collectionId;

  const submissionForm = ref<Answer[]>([]);

  const getCollection = async () => {
    // await getCollectionApi(collectionId).then(function (response) {
    //   collection.value = response;
    // });
    collection.value = await getCollectionApi(collectionId);
    console.log(collection.value);
    const answerList = collection.value.questionList.map((question) => {
      const answer: Answer = { questionId: question.questionId, answerContent: [''] };
      return answer;
    });
    submissionForm.value = answerList;
    haveData.value = true;
  };
  getCollection();
  console.log(submissionForm);
  async function submit() {
    await createSubmissionApi(collectionId, submissionForm.value);
  }
</script>

<style scoped lang="less">
  .bg-color {
    background-color: @content-bg;
    padding: 20px;
    height: 100%;
  }

  .content {
    padding: 24px;
    background: @component-background;
  }

  .question_form {
    padding: 10px;

    &__name {
      margin-bottom: 10px;
      height: 50px;
    }

    &__description {
    }
  }

  .border-class {
    border: 1px solid #1a1a1a;
    border-radius: 5px;
  }
</style>
