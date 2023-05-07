<template>
  <div>
    <a type="primary" @click="showModal">{{ t('view.detail.preview.previewButton') }}</a>
    <a-modal centered v-model:visible="visible" @ok="handleOk">
      <div style="padding: 20px">
        <div style="padding: 5px" v-for="answer in answerList">
          <div style="margin-bottom: 3px; font-size: medium">{{ answer.questionName }}</div>
          <div v-for="answerInfo in answer.answerContent">
            <div> >{{ answerInfo }}</div>
          </div>
          <a-divider />
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { SvgIcon } from '/@/components/Icon';
  import { CaretDownOutlined } from '@ant-design/icons-vue';
  import { getSubmissionAnswerApi } from '/@/api/collection/submission';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();

  const props = defineProps({
    submissionId: String,
  });
  const visible = ref<boolean>(false);

  const showModal = () => {
    visible.value = true;
  };

  const handleOk = (e: MouseEvent) => {
    console.log(e);
    visible.value = false;
  };
  const answerList = ref([]);
  async function getAnswer() {
    answerList.value = await getSubmissionAnswerApi(props.submissionId);
  }
  getAnswer();
</script>

<style scoped></style>
