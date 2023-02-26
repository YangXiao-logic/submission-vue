<template>
  <router-link :to="{ name: 'CollectCreatePage' }">
    <a-card
      @mouseover="showCreateButton"
      @mouseleave="closeCreateButton"
      hoverable
      class="collect-card"
    >
      <!--    style="display: flex; align-items: center;justify-content: center"-->

      <div style="position: absolute; width: 80%; top: 30%; left: 10%; font-size: large"
        ><div>{{ props.title }}</div>
      </div>
      <div
        style="position: absolute; width: 80%; bottom: 0; left: 10%; height: 38%; font-size: small"
      >
        <p>{{ props.description }}</p>
      </div>
      <ScrollYTransition class="show-button">
        <div
          v-show="buttonShow"
          style="
            font-size: medium;
            height: 38%;
            align-items: center;
            justify-content: center;
            display: flex;
          "
        >
          <div>{{ t('routes.collection.create') }}</div>
        </div>
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
  import { t } from '/@/hooks/web/useI18n';

  const props = defineProps({
    title: String,
    description: String,
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
    background-color: @secondary-gray-color;
    height: 130px;
    position: relative;
  }

  .show-button {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: @secondary-white-color;
    width: 100%;
    font-size: 18px;
  }
</style>
