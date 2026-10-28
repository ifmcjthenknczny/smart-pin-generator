<template>
  <div class="container">
    <header class="header">
      <button @click="generateNonTrivialPin" class="generate-btn">Generuj</button>
    </header>

    <main class="main">
      <svg
        class="svg-display"
        :viewBox="`0 0 ${viewBoxWidth} 100`"
        preserveAspectRatio="xMidYMid meet"
      >
        <text
          x="50%"
          y="50%"
          dominant-baseline="central"
          text-anchor="middle"
          fill="black"
          font-weight="900"
          font-family="monospace"
          :font-size="dynamicFontSize"
        >
          {{ currentPin }}
        </text>
      </svg>
    </main>

    <footer class="footer">
      <div class="info-row">
        <span>Liczba cyfr:</span>
        <span class="count-badge">{{ digitsCount }}</span>
      </div>

      <div class="range-row">
        <span>4</span>
        <input type="range" v-model.number="digitsCount" min="4" max="10" class="range-input" />
        <span>10</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { isPinNonTrivial } from '@/helpers/isPinNonTrivial'
import { ref, computed, watch, onMounted } from 'vue'

const DIGITS_COUNT = {
  default: 4,
  min: 4,
  max: 10,
}

const digitsCount = ref(DIGITS_COUNT.default)
const currentPin = ref('')

const viewBoxWidth = computed(() => digitsCount.value * 65)

const dynamicFontSize = computed(() => {
  if (digitsCount.value <= 5) return '90'
  if (digitsCount.value <= 7) return '80'
  return '70'
})

function randomizePin(digitsCount: number = DIGITS_COUNT.default) {
  return `${Math.floor(Math.random() * Math.pow(10, digitsCount))}`.padStart(digitsCount)
}

function generateNonTrivialPin() {
  if (digitsCount.value < DIGITS_COUNT.min || digitsCount.value > DIGITS_COUNT.max) {
    throw new Error(
      `Digits count in pin must be between ${DIGITS_COUNT.min} and ${DIGITS_COUNT.max}`,
    )
  }

  let isTrivial = true
  let pin = randomizePin(digitsCount.value)

  while (isTrivial) {
    pin = randomizePin(digitsCount.value)
    isTrivial = !isPinNonTrivial(pin)
  }

  currentPin.value = pin.toString().padStart(digitsCount.value)
  return pin
}

watch(digitsCount, () => {
  generateNonTrivialPin()
})

onMounted(() => {
  generateNonTrivialPin()
})
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #ffffff;
  color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  user-select: none;
  font-family: monospace;
  box-sizing: border-box;
}

.header {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 0.5rem;
}

.generate-btn {
  padding: 0.75rem 2rem;
  background-color: #000000;
  color: #ffffff;
  font-size: 1.125rem;
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
  margin: 1rem 0;
  overflow: hidden;
}

.svg-display {
  width: 100%;
  height: 100%;
  max-height: 70vh;
}

.footer {
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1rem;
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
</style>
