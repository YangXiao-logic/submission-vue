<template>
  <a-row :gutter="20" justify="space-between">
    <a-col :span="20">
      <!--    <div style="display: flex; font-size: medium">-->
      <!--      <span>{{ question.order }}.</span>-->

      <a-form-item
        :label="question.order"
        :rules="[{ required: true, message: 'Please input question name!' }]"
        style="margin-bottom: 0px"
      >
        <a-input v-model:value="question.name" :bordered="false" placeholder="请输入问题" />
      </a-form-item>
      <!--    </div>-->
      <a-form-item style="margin-bottom: 0px">
        <a-input
          v-model:value="question.description"
          :bordered="false"
          placeholder="添加题目描述"
        />
      </a-form-item>

      <!--    <div v-else-if="enableAnswer">-->
      <!--      <div>{{ question.order }}. {{ question.name }}</div>-->
      <!--      <div>{{ question.description }}</div>-->
      <!--    </div>-->
      <div v-if="question.type === Question.SINGLE_FILE_ATTACHMENT">
        <div
          ><span>文件将被重新命名为格式</span>
          <a-select
            ref="select"
            v-model:value="value1"
            style="width: 120px"
            mode="multiple"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option v-for="option in options1" :value="option"
              >{{ option }}
            </a-select-option>
          </a-select>
        </div>
        <SingleFileAttachment disabled="true" />
      </div>
      <div
        v-else-if="
          question.type === Question.SIMPLE_TEXT_INPUT || question.type === Question.IDENTIFY
        "
      >
        <a-input disabled="true" placeholder="此处用户填入" />
      </div>
    </a-col>
    <a-col :span="2">
      <a-button v-if="!(question.order === 1)"><up-outlined /></a-button>
      <a-button v-if="!(question.order === questionLen)"><down-outlined /></a-button>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
  import SingleFileAttachment from './SingleFileAttachment.vue';
  import { Question } from '/@/views/collect-create/question/question-type/Question';
  import { inject, ref } from 'vue';
  import type { SelectProps } from 'ant-design-vue';
  import { UpOutlined, DownOutlined } from '@ant-design/icons-vue';

  const props = defineProps({
    question: Object,
  });

  const identifyList = inject('identifyList', [
    {
      value: 'jack',
      label: 'Jack',
    },
    {
      value: 'lucy',
      label: 'Lucy',
    },
    {
      value: 'disabled',
      label: 'Disabled',
      disabled: true,
    },
    {
      value: 'yiminghe',
      label: 'Yiminghe',
    },
  ]);
  const questionLen = inject('questionLen');
  const options1 = ref<SelectProps['options']>(identifyList);
</script>

<style scoped></style>
