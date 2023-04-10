<template>
  <a-upload-dragger
    v-model:fileList="fileList"
    name="file"
    :multiple="true"
    :beforeUpload="beforeUpload"
    :data="uploadData"
    :action="uploadUrl"
    :max-count="1"
    @change="handleChange"
  >
    <p class="ant-upload-drag-icon">
      <inbox-outlined />
    </p>
    <p class="ant-upload-text">Click or drag file to this area to upload</p>
  </a-upload-dragger>
</template>
<script lang="ts" setup>
  import { InboxOutlined } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
  import { computed, defineComponent, inject, ref, unref, watch } from 'vue';
  import type { UploadChangeParam, UploadFile } from 'ant-design-vue';
  import { getPolicyApi, myUploadApi, uploadApi } from '/@/api/collection/upload';
  import { Answer } from '/#/submission';
  import { useRoute } from 'vue-router';

  const handleChange = (info: UploadChangeParam) => {
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const props = defineProps({
    fileRenamePatternList: {
      type: Array,
      required: true,
    },
    questionId: {
      type: String,
      required: true,
    },
  });

  const uploadUrl = 'https://submission.oss-cn-chengdu.aliyuncs.com';

  interface UploadData {
    policy: string;
    signature: string;
    key: string;
    ossAccessKeyId: string;
    host: string;
    file: any;
    // callback: '',
  }

  const uploadData = ref<UploadData>({
    policy: '',
    signature: '',
    key: '',
    ossAccessKeyId: '',
    host: '',
    file: '',
    // callback: '',
  });
  const fileList = ref([]);

  const submissionForm = inject('submissionForm');

  const newName = computed(() => {
    const newNameList = props.fileRenamePatternList.map((item) => {
      const answer = submissionForm.value.find((answer) => (answer.questionId = item.questionId));
      return answer.answerContent[0];
    });
    return newNameList.join(' ');
  });

  const collectionId = useRoute().params.collectionId;

  const shouldWait = inject('shouldWait');

  const beforeUpload = async (file) => {
    const response = await getPolicyApi();
    const parts = file.name.split('.');
    const extension = parts.pop(); // 获取文件类型
    const newFullName = `${newName.value}.${extension}`; // 拼接新的文件名和文件类型

    uploadData.value.key = response.dir + collectionId + '/' + props.questionId + '/' + newFullName;
    uploadData.value.policy = response.policy;
    uploadData.value.signature = response.signature;
    uploadData.value.ossAccessKeyId = response.ossAccessKeyId;
    uploadData.value.host = response.host;
    uploadData.value.file = file;
    console.log(uploadData.value.key);
    // if (shouldWait.value) {
    //   await new Promise((resolve) => {
    //     // 在外部条件满足时，将 shouldWait 设置为 false，并解析 Promise 对象
    //     const intervalId = setInterval(() => {
    //       if (!shouldWait.value) {
    //         clearInterval(intervalId);
    //         resolve();
    //       }
    //     }, 100);
    //   });
    // }
    return false;
  };

  watch(shouldWait, async () => {
    console.log(shouldWait.value);
    console.log(fileList.value[0]);
    console.log(uploadData.value);
    if (shouldWait.value == false) {
      // const reader = new FileReader();
      // reader.readAsArrayBuffer(fileList.value[0]);

      // uploadData.value.file = fileList.value[0];
      await myUploadApi(uploadData.value);
    }
    shouldWait.value = true;
  });
</script>
