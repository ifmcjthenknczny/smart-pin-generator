<script setup lang="ts">
import PinDisplay from './components/PinDisplay.vue'
</script>

<template>
  <PinDisplay />
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: #ffffff;
  height: 100%;
  width: 100%;
}

@media (min-width: 768px) {
  .app {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    background-color: #ffffff;
  }
}
</style>
