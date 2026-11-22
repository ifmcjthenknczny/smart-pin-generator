<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <div class="page-wrapper">
      <nav class="top-nav" aria-label="Nawigacja">
        <RouterLink to="/pin" class="nav-btn" active-class="active">PIN</RouterLink>
        <RouterLink to="/pattern" class="nav-btn" active-class="active">Wzór</RouterLink>
      </nav>
      <RouterView />
    </div>
  </div>
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

.top-nav {
  display: inline-flex;
  gap: 6px;
  padding: 6px;
  margin-bottom: 24px;
  border-radius: 14px;
  background-color: #e2e8f0;
}

.nav-btn {
  padding: 10px 22px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: #475569;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 480px;
  padding: 16px;
  box-sizing: border-box;
}

.nav-btn:hover {
  color: #0f172a;
}

.nav-btn.active {
  background-color: #ffffff;
  color: #0284c7;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.1);
}

@media (min-width: 768px) {
  .app {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    min-height: 100dvh;
    padding-top: 24px;
    box-sizing: border-box;
    background-color: #ffffff;
  }
}
</style>
