<template>
  <a-upload-dragger
    v-model:fileList="fileList"
    name="file"
    :multiple="true"
    :beforeUpload="beforeUpload"
    :data="uploadData"
    :action="uploadUrl"
    @change="handleChange"
    @drop="handleDrop"
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
  import { defineComponent, ref } from 'vue';
  import type { UploadChangeParam } from 'ant-design-vue';
  import { getPolicyApi } from '/@/api/collection/upload';

  const handleChange = (info: UploadChangeParam) => {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const uploadUrl = 'https://submission.oss-cn-chengdu.aliyuncs.com';

  const uploadData = ref({
    policy: '',
    signature: '',
    key: '',
    ossAccessKeyId: '',
    dir: '',
    host: '',
    // callback: '',
  });
  const fileList = ref([]);

  const beforeUpload = async () => {
    const response = await getPolicyApi();
    uploadData.value.key = response.dir + '/${filename}';
    uploadData.value.policy = response.policy;
    uploadData.value.signature = response.signature;
    uploadData.value.ossAccessKeyId = response.ossAccessKeyId;
    uploadData.value.host = response.host;
    console.log(uploadData);
  };
</script>
