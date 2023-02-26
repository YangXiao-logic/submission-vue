<template>
  <PageWrapper>
    <div class="top">
      <div style="text-align: left; font-size: large; margin-bottom: 10px">创建收集</div>
      <a-row :gutter="12">
        <a-col :span="8">
          <CreateCard
            :title="t('view.home.create.file')"
            :description="t('view.home.create.fileDescription')"
          />
        </a-col>
        <a-col :span="8">
          <CreateCard
            :title="t('view.home.create.paper')"
            :description="t('view.home.create.questionnaireDescription')"
          />
        </a-col>
        <a-col :span="8">
          <CreateCard
            :title="t('view.home.create.paper')"
            description="t('view.home.create.paperDescription')"
          />
        </a-col>
      </a-row>
    </div>
    <div class="content">
      <div style="text-align: left; font-size: large; margin-bottom: 10px">收集记录</div>
      <collect-list />
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
  import CollectList from '/@/views/home-page/component/CollectionList.vue';
  import CreateCard from '/@/views/home-page/component/CollectionCreateCard.vue';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();
</script>

<style scoped lang="less">
  .top {
    padding: 24px;
    text-align: center;
    background-color: @component-background;
  }

  .content {
    padding: 24px;
    margin-top: 12px;
    background-color: @component-background;
  }
</style>
