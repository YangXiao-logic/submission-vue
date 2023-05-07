<template>
  <PageWrapper :class="prefixCls" :title="collectionDetail.title">
    <div :class="`${prefixCls}__top`">
      <a-row :gutter="12">
        <a-col :span="10" :class="`${prefixCls}__top-col`">
          <div>{{ t('view.detail.index.receivedSurveyCount') }}</div>
          <p>{{ collectionDetail.submissionCount }}{{ t('view.detail.index.surveyCount') }}</p>
        </a-col>
        <!--        <a-col :span="8" :class="`${prefixCls}__top-col`">-->
        <!--          <div>{{ t('view.detail.index.receivedFileCount') }}</div>-->
        <!--          <p>{{ collectionDetail.fileCount }}{{ t('view.detail.index.fileCount') }}</p>-->
        <!--        </a-col>-->
        <a-col :span="10" :class="`${prefixCls}__top-col`">
          <div>{{ t('view.detail.index.deadlineCountdown') }}</div>
          <p>{{ collectionDetail.countDown }}{{ t('view.detail.index.dayCount') }}</p>
        </a-col>
      </a-row>
    </div>

    <div :class="`${prefixCls}__content`">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" :tab="t('view.detail.index.submissionRecord')" force-render>
          <submit-record :collectionTitle="collectionDetail.title" />
        </a-tab-pane>
        <a-tab-pane key="2" :tab="t('view.detail.index.submissionList')">
          <name-list
            :nameList="collectionDetail.nameList"
            :remainNameList="collectionDetail.remainNameList"
            @add-name-list="addNameList"
            @add-remain-name="addRemainName"
            @delete-name="deleteName"
          />
        </a-tab-pane>
      </a-tabs>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import NameList from '/@/views/collection-detail/component/NameList.vue';
  import SubmitRecord from '/@/views/collection-detail/component/SubmissionList.vue';
  import {
    getCollectionApi,
    getCollectionDetailApi,
    addNameApi,
    addNameListApi,
    deleteNameApi,
  } from '/@/api/collection/collection';
  import { useRoute } from 'vue-router';
  import { QuestionType } from '/@/views/question/question-type/QuestionType';
  import { FileRenamePattern } from '/@/views/question/question-type/FileRenamePattern';
  import dayjs from 'dayjs';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();
  const prefixCls = 'list-basic';
  const activeKey = ref('1');
  const route = useRoute();
  const collectionId = route.params.collectionId;
  const collectionDetail = ref({
    collectionId: '0',
    title: 'title',
    countDown: 3,
    submissionCount: 1,
    fileCount: 2,
    nameList: ['Pearl Cooper', 'Laurie Farmer', 'Oliwia Wiley', 'Clifford Andrews', 'Celia Wang'],
    remainNameList: [
      'Abubakar Callahan',
      'Dillan Le',
      'Jannat Sykes',
      'Hasnain Copeland',
      'Bianca Hood',
    ],
  });

  async function getCollectionDetail() {
    console.log(route.params.collectionId);
    collectionDetail.value = await getCollectionDetailApi(collectionId);
  }

  getCollectionDetail();

  async function addRemainName(index: any) {
    const name = collectionDetail.value.remainNameList.at(index);
    console.log(name);
    collectionDetail.value.nameList.push(name);
    collectionDetail.value.remainNameList.splice(index, 1);
    await addNameApi(collectionId, name);
  }

  const addNameList = async (newNameString) => {
    const newNameList = newNameString.split('\n');
    collectionDetail.value.nameList = collectionDetail.value.nameList.concat(newNameList);
    newNameString.value = '';

    await addNameListApi(collectionId, newNameList);
  };

  const deleteName = async (index) => {
    const name = collectionDetail.value.nameList.at(index);
    collectionDetail.value.nameList.splice(index, 1);

    await deleteNameApi(collectionId, name);
  };
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
