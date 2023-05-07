<template>
  <div class="bg-color" style="display: flex; justify-content: center">
    <div
      direction="vertical"
      style="width: 60%; position: relative; margin-top: 30px"
      class="content"
    >
      <div style="font-size: 40px; text-align: center">{{ collection.title }}</div>
      <div style="padding: 3%">{{ collection.description }}</div>
      <a-row :gutter="20" style="margin: 10px">
        <a-col>
          <div class="border-class"
            >{{ t('view.submit.collector') }} {{ collection.collectorName }}</div
          >
        </a-col>
        <a-col>
          <div class="border-class"
            >{{ t('view.submit.closeTime') }} {{ collection.closeTime }}</div
          >
        </a-col>
      </a-row>

      <a-form :model="collection.questionList" layout="vertical">
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
            <a-button style="width: 100%" type="primary" @click="submit">{{
              t('view.submit.submit')
            }}</a-button>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineAsyncComponent, provide, ref } from 'vue';
  import { createSubmissionApi } from '/@/api/collection/submit';
  import { useRoute } from 'vue-router';
  import { getCollectionApi } from '/@/api/collection/collection';
  import { Collection } from '/#/collection';
  import { Answer } from '/#/submission';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();

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

  const route = useRoute();
  const collectionId = route.params.collectionId;

  const submissionForm = ref<Answer[]>([]);

  const getCollection = async () => {
    // await getCollectionApi(collectionId).then(function (response) {
    //   collection.value = response;
    // });
    collection.value = await getCollectionApi(collectionId);
    submissionForm.value = collection.value.questionList.map((question) => {
      const answer: Answer = { questionId: question.questionId, answerContent: [''] };
      return answer;
    });
    haveData.value = true;
  };
  getCollection();
  const shouldWait = ref(true);
  provide('submissionForm', submissionForm);
  provide('shouldWait', shouldWait);
  async function submit() {
    shouldWait.value = false;
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
    background-color: #c2cedc;
    font-size: large;
    //border: 1px solid #1a1a1a;
    border-radius: 5px;
    padding: 10px;
  }
</style>
