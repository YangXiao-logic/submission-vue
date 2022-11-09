<template>
  <a-row>
    <a-col class="col" :span="12" :push="6">col-18 col-push-6</a-col>
    <a-col class="col" :span="10" :push="1">col-1 col-push-6</a-col>
    <a-col class="col" :span="6" :pull="18">col-6 col-pull-18</a-col>
  </a-row>
</template>

<style scoped>
.col {
  border: #00bb00;
}
</style>
