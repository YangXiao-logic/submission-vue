<template>
  <a-layout>
    <a-layout-header>
      <Header />
    </a-layout-header>
    <a-layout-content>
      <Content />
    </a-layout-content>
  </a-layout>
  <!--  <div >-->

  <!--  </div>-->
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';

  import AButton from '/@/components/Button/src/BasicButton.vue';

  import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import dayjs, { Dayjs } from 'dayjs';
  import Content from '/@/views/submit/component/Content.vue';
  import Header from '/@/views/submit/component/Header.vue';
</script>

<style scoped lang="less">
  .bg-color {
    background-color: @content-bg;
    padding: 20px;
    height: 100%;
  }

  .content {
    padding: 24px;
    background: @component-background;
  }

  .question_form {
    padding: 10px;

    &__name {
      margin-bottom: 10px;
      height: 50px;
    }

    &__description {
    }
  }

  .border-class {
    border: 1px solid #1a1a1a;
    border-radius: 5px;
  }
</style>
