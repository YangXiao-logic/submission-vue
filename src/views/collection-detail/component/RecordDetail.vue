<template>
  <div>
    <a type="primary" @click="showModal">查看</a>
    <a-modal centered v-model:visible="visible" title="提交记录" @ok="handleOk">
      <div style="padding: 10px; font-size: 15px">2022年10月24日 09:05 提交了 1 个文件</div>
      <div>
        <div class="record">
          <SvgIcon name="questionnaire" />
          <div>问卷</div>
          <QuestionnairePreview style="position: absolute; right: 5px" />
        </div>
        <div class="record">
          <SvgIcon name="file" />
          <div>文件</div>
          <a><caret-down-outlined /></a>
        </div>
      </div>

      <!--      <div style="position: relative;height: 30px">-->
      <!--        <div style="position: absolute;left: 0">问卷</div>-->
      <!--        <a style="position: absolute;right: 0">预览</a>-->
      <!--      </div>-->
      <!--      <div style="position: relative;height: 30px">-->
      <!--        <div style="position: absolute;left: 0">问卷</div>-->
      <!--        <a style="position: absolute;right: 0">预览</a>-->
      <!--      </div>-->
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { SvgIcon } from '/@/components/Icon';
  import { CaretDownOutlined } from '@ant-design/icons-vue';
  import QuestionnairePreview from '/@/views/collection-detail/component/QuestionnairePreview.vue';

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
</script>

<style scoped lang="less">
  .record {
    background-color: @second-1-color;
    position: relative;
    margin: 8px;
    padding: 8px;
    SvgIcon {
      display: inline;
    }
    div {
      display: inline;
    }
    a,
    QuestionnairePreview {
      position: absolute;
      right: 5px;
    }
  }
</style>
