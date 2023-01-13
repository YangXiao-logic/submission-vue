<template>
  <!--  <div >-->
  <div class="bg-color" style="display: flex; justify-content: center">
    <div direction="vertical" style="width: 60%; position: relative" class="content">
      <div style="font-size: 40px; text-align: center">{{ collectData.title }}</div>
      <div style="padding: 3%">{{ collectData.description }}</div>
      <a-row :gutter="20" justify="space-around">
        <a-col :span="4">
          <div class="border-class">收集者：{{ collectData.collector }}</div>
        </a-col>
        <a-col :span="8">
          <div class="border-class">截止时间：{{ collectData.closeTime }}</div>
        </a-col>
      </a-row>
      <a-form :model="answerForm">
        <a-row>
          <a-col v-for="question in answerForm" :order="question.questionOrder" :span="24">
            <BasicSubmit class="question_form" :question="question" />
          </a-col>
        </a-row>
      </a-form>
      <div style="position: absolute; bottom: 5%; left: 5%; width: 90%">
        <a-divider style="height: 1px; background-color: gray" />
        <a-row :gutter="20" justify="center">
          <a-col :span="5">
            <a-button style="width: 100%" type="primary">提交</a-button>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
  <!--  </div>-->
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Tinymce } from '/@/components/Tinymce';
  import BasicQuestion from '/@/views/collect-create/question/BasicQuestion.vue';
  import AButton from '/@/components/Button/src/BasicButton.vue';

  import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import dayjs, { Dayjs } from 'dayjs';
  import BasicSubmit from '/@/views/submit/component/BasicSubmit.vue';

  const props = defineProps(['pattern']);

  const collectData = {
    title: '收集标题',
    collector: '负责人',
    releaseTime: dayjs(),
    closeTime: '2022-10-7 10:00:00',
    description:
      '近期疫情防控形势复杂，为保障居民群众生命安全和身体健康，有效预防、快速应对和准时把握相关情况，请您配合提交：',
    questionList: [
      {
        order: 1,
        name: '文件',
        description: '',
        type: 'FileAttachment',
        questionData: {},
      },
      {
        order: 2,
        name: '姓名',
        description: '',
        type: 'TextInput',
        questionData: {},
      },
    ],
  };

  interface Answer {
    questionOrder: number;
    name: string;
    description: string;
    type: string;
    questionData: object;
    answer: string;
  }

  const answerForm = ref<Answer[]>(collectData.questionList as any);

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
