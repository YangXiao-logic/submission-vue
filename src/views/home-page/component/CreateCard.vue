<template>
  <router-link :to="{ name: 'CollectCreatePage'}">
    <a-card
      @mouseover="showCreateButton"
      @mouseleave="closeCreateButton"
      hoverable
      class="collect-card"
    >
      <!--    style="display: flex; align-items: center;justify-content: center"-->

      <div style="position: absolute; width: 20%; top: 30%; left: 40%; font-size: medium">{{
        props.title
      }}</div>

      <ScrollYTransition class="show-button">
        <div v-show="buttonShow">创建收集</div>
      </ScrollYTransition>

      <!--              <setting-outlined key="setting" />-->
      <!--              <edit-outlined key="edit" />-->
      <!--              <ellipsis-outlined key="ellipsis" />-->
    </a-card>
  </router-link>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { ScrollYTransition } from '/@/components/Transition';

  const props = defineProps({
    title: String,
  });

  const buttonShow = ref(false);

  const showCreateButton = () => {
    setTimeout(() => {
      buttonShow.value = true;
    }, 100);
  };

  const closeCreateButton = () => {
    setTimeout(() => {
      buttonShow.value = false;
    }, 100);
  };
</script>

<style scoped lang="less">
  .collect-card {
    background-color: @second-1-color;
    height: 130px;
    position: relative;
  }

  .show-button {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: @second-2-color;
    width: 100%;
    font-size: 18px;
  }
</style>
