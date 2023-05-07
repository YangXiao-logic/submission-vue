<template>
  <a-checkbox-group v-model:value="answerContent" :options="optionList" />
</template>

<script setup lang="ts">
  const props = defineProps({
    optionList: Array,
    answerContent: Array,
  });

  // const changeAnswerContent = (answerContent) => {
  //   for (let i = 0; i < answerContent.length; i++) {
  //     if (props.answerContent.length < i) {
  //       props.answerContent[i] = answerContent[i];
  //     } else {
  //       props.answerContent.push(answerContent[i]);
  //     }
  //   }
  // };
</script>

<style scoped></style>
