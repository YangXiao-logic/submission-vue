<template>
  <PageWrapper :class="prefixCls" :title="collectionDetail.title">
    <div :class="`${prefixCls}__top`">
      <a-row :gutter="12">
        <a-col :span="8" :class="`${prefixCls}__top-col`">
          <div>已收问卷数</div>
          <p>{{ collectionDetail.submissionCount }}个问卷</p>
        </a-col>
        <a-col :span="8" :class="`${prefixCls}__top-col`">
          <div>已收文件数</div>
          <p>{{ collectionDetail.fileCount }}个文件</p>
        </a-col>
        <a-col :span="8" :class="`${prefixCls}__top-col`">
          <div>截止倒计时</div>
          <p>{{ collectionDetail.countDown }}天</p>
        </a-col>
      </a-row>
    </div>

    <div :class="`${prefixCls}__content`">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="应交名单">
          <name-list
            :nameList="collectionDetail.nameList"
            :remainNameList="collectionDetail.remainNameList"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="提交记录" force-render>
          <submit-record />
        </a-tab-pane>
      </a-tabs>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import NameList from '/@/views/collection-detail/component/NameList.vue';
  import SubmitRecord from '/@/views/collection-detail/component/SubmissionList.vue';
  import {
    getCollectionApi,
    getCollectionDetailApi,
    getNameListApi,
  } from '/@/api/collection/collection';
  import { useRoute } from 'vue-router';
  import { QuestionType } from '/@/views/question/question-type/QuestionType';
  import { FileRenamePattern } from '/@/views/question/question-type/FileRenamePattern';
  import dayjs from 'dayjs';

  const prefixCls = 'list-basic';
  const activeKey = ref('1');
  const route = useRoute();
  const collectionId = route.params.collectionId;
  const collectionDetail = ref({
    collectionId: '0',
    title: '收集标题',
    countDown: 3,
    submissionCount: 1,
    fileCount: 2,
    nameList: [],
    remainNameList: [],
  });
  async function getCollectionDetail() {
    console.log(route.params.collectionId);
    collectionDetail.value = await getCollectionDetailApi(collectionId);
  }

  getCollectionDetail();

  // console.log(route.params.collectionId);
  // const collectionId = route.params.collectionId;
  // const data = await getCollection(1);
  // collectionDetail.value = data;
</script>
<style lang="less" scoped>
  .list-basic {
    &__top {
      padding: 24px;
      text-align: center;
      background-color: @component-background;

      &-col {
        &:not(:last-child) {
          border-right: 1px dashed @border-color-base;
        }

        div {
          margin-bottom: 12px;
          font-size: 14px;
          line-height: 22px;
          color: @text-color;
        }

        p {
          margin: 0;
          font-size: 24px;
          line-height: 32px;
          color: @text-color;
        }
      }
    }

    &__content {
      padding: 24px;
      margin-top: 12px;
      background-color: @component-background;

      .list {
        position: relative;
      }

      .icon {
        font-size: 40px !important;
      }

      .extra {
        position: absolute;
        top: 20px;
        right: 15px;
        font-weight: normal;
        color: @primary-color;
        cursor: pointer;
      }

      .description {
        display: inline-block;
        width: 40%;
      }

      .info {
        display: inline-block;
        width: 30%;
        text-align: center;

        div {
          display: inline-block;
          padding: 0 20px;

          span {
            display: block;
          }
        }
      }

      .progress {
        display: inline-block;
        width: 15%;
        vertical-align: top;
      }
    }
  }
</style>
