<template>
  <div class="page">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
</style>