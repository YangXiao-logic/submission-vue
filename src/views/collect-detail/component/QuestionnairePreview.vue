<template>
  <div>
    <a type="primary" @click="showModal">预览</a>
    <a-modal centered v-model:visible="visible" @ok="handleOk">
      <div style="padding: 20px">
        <div style="padding: 5px" v-for="answer in answerList">
          <div style="margin-bottom: 3px; font-size: medium">{{ answer.question }}</div>
          <div v-for="answerInfo in answer.answerList">
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

  const props = defineProps({
    submitId: String,
  });
  const visible = ref<boolean>(false);

  const showModal = () => {
    visible.value = true;
  };

  const handleOk = (e: MouseEvent) => {
    console.log(e);
    visible.value = false;
  };

  const answerList = [
    {
      question: '姓名',
      answerList: ['测3'],
    },
    {
      question: '问题1',
      answerList: ['文件1', '文件2'],
    },
  ];
</script>

<style scoped></style>
