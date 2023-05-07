<template>
  <a-button type="dashed" block @click="showModal">
    <PlusOutlined />
    {{ t('view.create.typeModal.newQuestion') }}
  </a-button>
  <a-modal
    centered
    v-model:visible="visible"
    :title="t('view.create.typeModal.newQuestion')"
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
  import { QuestionType } from '/@/views/question/question-type/QuestionType';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();
  const emits = defineEmits(['addQuestion']);
  const visible = ref<boolean>(false);
  const showModal = () => {
    visible.value = true;
  };
  const questionTypeList = [
    {
      name: t('view.create.typeModal.name'),
      type: QuestionType.NAME,
    },
    {
      name: t('view.create.typeModal.simple'),
      type: QuestionType.SIMPLE_TEXT_INPUT,
    },
    {
      name: t('view.create.typeModal.file'),
      type: QuestionType.FILE_ATTACHMENT,
    },
    {
      name: t('view.create.typeModal.single'),
      type: QuestionType.SINGLE_CHOICE,
    },
    {
      name: t('view.create.typeModal.multi'),
      type: QuestionType.MULTIPLY_CHOICE,
    },
  ];
</script>

<style scoped></style>
