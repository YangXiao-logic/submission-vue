<template>
  <div style="margin-bottom: 20px"
    ><span style="margin: 10px">{{ t('view.create.fileQuestion.renameWord') }}</span>
    <!--    <div style="display: inline-block; border: 1px solid #000000; width: 500px">-->
    <!--      <div v-for="rule in patternList" style="display: inline-block; margin-right: 10px">-->
    <!--        <span v-if="rule.type === FileRenamePattern.QUESTION" style="color: #5c0c43">{{-->
    <!--          rule.label-->
    <!--        }}</span>-->
    <!--        <span v-else-if="rule.type === FileRenamePattern.TEXT">{{ rule.label }}</span>-->
    <!--      </div>-->
    <!--    </div>-->
    <a-select
      style="width: 80%"
      v-model:value="value"
      :options="options"
      mode="multiple"
      @change="$emit('changeRenamePattern', patternList)"
    >
      <!--      <a-select-option v-for="questionName in questionNameList" :value="questionName.name">-->
      <!--        {{ questionName.name }}-->
      <!--      </a-select-option>-->
    </a-select>
  </div>
  <a-upload-dragger name="file" disabled="true">
    <p class="ant-upload-drag-icon">
      <inbox-outlined />
    </p>
    <p class="ant-upload-text">{{ t('view.create.fileQuestion.uploadWay') }}</p>
  </a-upload-dragger>
</template>
<script lang="ts" setup>
  import { InboxOutlined } from '@ant-design/icons-vue';
  import type { UploadChangeParam } from 'ant-design-vue';
  import { message } from 'ant-design-vue';
  import { computed, inject, ref } from 'vue';
  import { FileRenamePattern } from '/@/views/question/question-type/FileRenamePattern';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();

  const props = defineProps({
    fileRenamePatternList: {
      type: Array,
      required: true,
    },
  });

  const questionNameList = inject('questionNameList');

  const patternList = computed(() => {
    return props.fileRenamePatternList.map((item) => {
      const questionName = questionNameList.value.find(
        (question) => question.tempQuestionId == item.tempQuestionId,
      );
      console.log(questionName.tempQuestionId);
      return { value: questionName.tempQuestionId, label: questionName.name };
    });
  });

  const value = ref(patternList.value);

  const options = computed(() => {
    return questionNameList.value.map((item) => {
      return { value: item.tempQuestionId, label: item.name };
    });
  });

  const changeRenamePattern = (patternList) => {
    props.fileRenamePatternList = patternList.map((item, index) => {
      return { tempQuestionId: item.tempQuestionId, patternOrder: index + 1 };
    });
  };
</script>
