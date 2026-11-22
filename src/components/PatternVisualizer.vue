<template>
  <div class="container">
    <header class="header">
      <button @click="handleGeneratePattern" class="generate-btn">Generuj</button>
    </header>

    <main class="main">
      <PatternDisplay :pattern="currentPattern" />
    </main>

    <footer class="footer">
      <div class="info-row">
        <span>Liczba pól:</span>
        <span class="count-badge">{{ isRandomLength ? 'losowa' : patternLength }}</span>
      </div>

      <div class="range-row">
        <span>{{ PATTERN_LENGTH.min }}</span>
        <input
          type="range"
          v-model.number="patternLength"
          :min="PATTERN_LENGTH.min"
          :max="PATTERN_LENGTH.max"
          :disabled="isRandomLength"
          class="range-input"
        />
        <span>{{ PATTERN_LENGTH.max }}</span>
      </div>

      <label class="toggle-row">
        <span class="toggle-label">Losowa liczba pól</span>
        <input
          type="checkbox"
          v-model="isRandomLength"
          class="toggle-checkbox"
          role="switch"
          :aria-checked="isRandomLength"
        />
        <span class="toggle-track" aria-hidden="true">
          <span class="toggle-thumb" />
        </span>
      </label>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { generatePattern } from '@/helpers/randomPattern'
import PatternDisplay from './PatternDisplay.vue'

const PATTERN_LENGTH = {
  default: 5,
  min: 2,
  max: 9,
}

const patternLength = ref(PATTERN_LENGTH.default)
const isRandomLength = ref(true)
const currentPattern = ref<number[]>([])

function handleGeneratePattern() {
  currentPattern.value = generatePattern(3, isRandomLength.value ? undefined : patternLength.value)
}

watch([patternLength, isRandomLength], () => {
  handleGeneratePattern()
})

onMounted(() => {
  handleGeneratePattern()
})
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  height: 100dvh;
  background-color: #ffffff;
  color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  user-select: none;
  font-family: monospace;
  box-sizing: border-box;
  overflow: hidden;
}

.header {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 0.25rem;
}

.generate-btn {
  padding: 0.6rem 1.75rem;
  background-color: #000000;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    transform 0.15s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.generate-btn:hover {
  background-color: #262626;
}

.generate-btn:active {
  transform: scale(0.95);
}

.main {
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
  overflow: hidden;
  min-height: 0;
}

.footer {
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  padding-bottom: 0.5rem;
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.025em;
}

.count-badge {
  font-size: 1rem;
  padding: 0.125rem 0.5rem;
  border: 1px solid #000000;
  border-radius: 0.25rem;
}

.range-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  font-size: 0.75rem;
}

.range-input {
  width: 100%;
  height: 4px;
  background: #e5e5e5;
  border-radius: 2px;
  outline: none;
  accent-color: #000000;
  cursor: pointer;
}

.range-input:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 10px;
  background-color: rgba(15, 23, 42, 0.05);
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
}

.toggle-label {
  font-size: 0.95rem;
  font-weight: 500;
  color: #0f172a;
}

.toggle-checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-track {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 44px;
  height: 24px;
  border-radius: 999px;
  background-color: #cbd5e1;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
}

.toggle-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  transform: translateX(3px);
  transition: transform 0.2s ease;
}

.toggle-checkbox:checked + .toggle-track {
  background-color: #0284c7;
}

.toggle-checkbox:checked + .toggle-track .toggle-thumb {
  transform: translateX(23px);
}

.toggle-checkbox:focus-visible + .toggle-track {
  outline: 2px solid #0284c7;
  outline-offset: 2px;
}

@media (min-width: 768px) {
  .container {
    width: 440px;
    height: min(720px, calc(100dvh - 120px));
    padding: 1.75rem;
  }

  .generate-btn {
    padding: 0.75rem 2rem;
    font-size: 1.125rem;
  }

  .footer {
    max-width: 100%;
    gap: 0.75rem;
    padding-bottom: 0;
  }
}

@media print {
  .header,
  .footer {
    display: none !important;
  }

  .container {
    width: 100%;
    height: 100vh;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    justify-content: center;
  }

  .main {
    margin: 0;
    flex: none;
    width: 100%;
    height: 100%;
  }
}
</style>
