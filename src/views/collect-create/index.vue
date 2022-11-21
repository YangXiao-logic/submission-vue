<template>
  <PageWrapper>
    <a-button @click="logForm">测试</a-button>
    <a-form :model="collectForm" style="display: flex; justify-content: center">
      <a-space direction="vertical" style="width: 70%" class="content">
        <a-form-item>
          <!--                     :rules="[{ required: true, message: 'Please input your username!' }]"-->
          <a-input
            required="true"
            class="question_form__name"
            v-model:value="collectForm.title"
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
                v-model:value="collectForm.collectorName"
                placeholder="负责人"
                :bordered="false"
              />
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item label="发布时间" required>
              <a-date-picker
                v-model:value="collectForm.releaseTime"
                show-time
                placeholder="发布时间"
              />
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item label="截止时间" required>
              <a-date-picker
                v-model:value="collectForm.closeTime"
                show-time
                placeholder="截止时间"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item style="padding: 15px">
          <a-typography-title :level="4">描述</a-typography-title>
          <a-textarea
            v-model:value="collectForm.description"
            placeholder="描述收集"
            :rows="5"
            allow-clear
          />
          <!--          <Tinymce class="question_form" v-model="collectForm.description" />-->
        </a-form-item>

        <!--        <a-row>-->
        <!--          <a-col v-for="question in collectForm.questionList" :order="question.order" :span="24">-->
        <!--            <BasicQuestion-->
        <!--              class="question_form"-->
        <!--              :question="question"-->
        <!--              @switch_order="switchOrder"-->
        <!--              :questionLen="collectForm.questionList.length"-->
        <!--            />-->
        <!--          </a-col>-->
        <!--        </a-row>-->
        <!--        <draggable-->
        <!--          v-model="collectForm.questionList"-->
        <!--          tag="ul"-->
        <!--          v-bind="{-->
        <!--            animation: 200,-->
        <!--            group: 'description',-->
        <!--            disabled: false,-->
        <!--            ghostClass: 'ghost',-->
        <!--          }"-->
        <!--        >-->
        <!--          &lt;!&ndash;          <template #item="{ element }">&ndash;&gt;-->
        <!--                              <BasicQuestion-->
        <!--                                class="question_form"-->
        <!--                                :question="element"-->
        <!--                                :questionLen="collectForm.questionList.length"-->
        <!--                              />-->
        <!--          <li v-for="element in collectForm.questionList" :key="element.order">{{-->
        <!--            element.name-->
        <!--          }}</li>-->
        <!--          &lt;!&ndash;          </template>&ndash;&gt;-->
        <!--        </draggable>-->
        <draggable
          v-model="collectForm.questionList"
          @start="drag = true"
          @end="drag = false"
          item-key="order"
          @change="sortQuestion"
        >
          <template #item="{ element }">
            <BasicQuestion class="question_form" :question="element" />
          </template>
        </draggable>
        <question-type-modal @add-question="addQuestion" />

        <a-divider />
        <a-row :gutter="20" justify="end">
          <a-col :span="4">
            <a-form-item>
              <a-button @click="addCollect" style="width: 100%" type="primary">创建</a-button>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-button style="width: 100%" type="primary">预览</a-button>
          </a-col>
        </a-row>
      </a-space>
    </a-form>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { provide, reactive, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import BasicQuestion from './question/BasicQuestion.vue';
  import AButton from '/@/components/Button/src/BasicButton.vue';
  import { createCollect } from '/@/api/collect/collect';
  import QuestionTypeModal from '/@/views/collect-create/question-type-modal/QuestionTypeModal.vue';
  import { Question } from '/@/views/collect-create/question/question-type/Question';
  import Draggable from 'vuedraggable';

  const collectForm = reactive({
    title: '收集标题',
    collectorName: '负责人',
    releaseTime: '',
    closeTime: '',
    description: '',
    questionList: [
      {
        order: 1,
        name: '姓名',
        description: '',
        type: Question.SIMPLE_TEXT_INPUT,
        questionData: {},
      },
      {
        order: 2,
        name: '文件',
        description: '',
        type: Question.FILE_ATTACHMENT,
        questionData: {},
      },
      {
        order: 3,
        name: '多选',
        description: '',
        type: Question.SINGLE_OPTION,
        questionData: {
          options: ['option1', 'option2'],
        },
      },
    ],
  });

  const drag = ref(false);

  const logForm = () => {
    console.log(collectForm.questionList);
  };

  // const questionNum = collectForm.value.questionList.length;
  const switchOrder = (order) => {};

  const sortQuestion = () => {
    // collectForm.questionList.sort((a, b) => a.order - b.order);
    collectForm.questionList = collectForm.questionList.map((item, index) => {
      item.order = index + 1;
      return item;
    });
  };
  const addQuestion = (questionType) => {
    collectForm.questionList.push({
      order: collectForm.questionList.length + 1,
      name: '',
      description: '',
      type: questionType,
      questionData: {},
    });
    console.log(collectForm.questionList.length);
  };
  const questionNameList = reactive(
    collectForm.questionList
      .filter((item) => {
        return (
          item.type == Question.SINGLE_OPTION ||
          item.type == Question.SIMPLE_TEXT_INPUT ||
          item.type == Question.MULTIPLY_OPTION
        );
      })
      .map((item) => {
        return { value: item.name, label: item.name };
      }),
  );
  provide('questionNameList', questionNameList);

  async function addCollect() {
    try {
      await createCollect(collectForm);
    } catch (error) {
      console.log(error);
    }
  }
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
    border-radius: 20px;
    &__name {
      margin-bottom: 10px;
      height: 50px;
    }

    &__description {
    }
  }
</style>
