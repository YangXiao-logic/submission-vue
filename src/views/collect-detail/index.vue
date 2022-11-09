<template>
  <PageWrapper :class="prefixCls" title="标准列表">
    <div :class="`${prefixCls}__top`">
      <a-row :gutter="12">
        <a-col :span="8" :class="`${prefixCls}__top-col`">
          <div>已收问卷数</div>
          <p>8个问卷</p>
        </a-col>
        <a-col :span="8" :class="`${prefixCls}__top-col`">
          <div>已收文件数</div>
          <p>4个文件</p>
        </a-col>
        <a-col :span="8" :class="`${prefixCls}__top-col`">
          <div>截止倒计时</div>
          <p>3天</p>
        </a-col>
      </a-row>
    </div>

    <div :class="`${prefixCls}__content`">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="应交名单">
          <name-list></name-list>
        </a-tab-pane>
        <a-tab-pane key="2" tab="提交记录" force-render>
          <submit-record></submit-record>
        </a-tab-pane>
      </a-tabs>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Progress, Row, Col } from 'ant-design-vue';
  import { defineComponent, ref } from 'vue';
  import Icon from '/@/components/Icon/index';
  import { PageWrapper } from '/@/components/Page';
  import { List } from 'ant-design-vue';
  import NameList from '/@/views/collect-detail/component/NameList.vue';
  import SubmitRecord from '/@/views/collect-detail/component/SubmitRecordList.vue';
  const prefixCls = 'list-basic';
  const activeKey = ref('1');
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
