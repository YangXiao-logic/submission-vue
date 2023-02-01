<template>
  <div>{{ question.questionOrder }}. {{ question.name }}</div>
  <div>{{ question.description }}</div>
  <div v-if="question.type === Question.FILE_ATTACHMENT">
    <FileAttachment disabled="true" />
  </div>
  <div v-else-if="question.type === 'TextInput'">
    <a-input v-model:value="value" placeholder="此处用户填入" />
  </div>
</template>

<script setup lang="ts">
  import FileAttachment from '/@/views/collection-create/question/SingleFileAttachment.vue';
  import { Question } from '/@/views/collection-create/question/type/Question';

  const props = defineProps({
    question: Object,
  });
</script>

<style scoped></style>
