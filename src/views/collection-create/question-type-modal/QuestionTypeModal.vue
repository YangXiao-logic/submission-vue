<template>
  <a-button type="dashed" block @click="showModal">
    <PlusOutlined />
    Add Question
  </a-button>
  <a-modal
    centered
    v-model:visible="visible"
    title="添加题目"
    style="text-align: center"
    ok-text=""
    cancel-text=""
  >
    <a-row>
      <a-col v-for="questionType in questionTypeList" :span="8">
        <a-button
          style="border-radius: 5px; width: 80%; margin: 10px"
          @click="
            $emit('addQuestion', questionType.type);
            visible = false;
          "
          >{{ questionType.name }}</a-button
        >
      </a-col>
      <!--      <a-col :span="8">  </a-col>-->
      <!--      <a-col :span="8"> 单选题 </a-col>-->
      <!--      <a-col :span="8"> 多选题 </a-col>-->
    </a-row>
  </a-modal>
</template>

<script setup lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Question } from '/@/views/collection-create/question/question-type/Question';
  const emits = defineEmits(['addQuestion']);
  const visible = ref<boolean>(false);
  const showModal = () => {
    visible.value = true;
  };
  const questionTypeList = [
    {
      name: '标识类问题',
      type: Question.IDENTIFY,
    },
    {
      name: '简单问答题',
      type: Question.SIMPLE_TEXT_INPUT,
    },
    {
      name: '富文本类问答题',
      type: Question.RICH_TEXT_INPUT,
    },
    {
      name: '文件附件',
      type: Question.FILE_ATTACHMENT,
    },
    {
      name: '单选题',
      type: Question.SINGLE_OPTION,
    },
    {
      name: '多选题',
      type: Question.MULTIPLY_OPTION,
    },
  ];
</script>

<style scoped></style>
