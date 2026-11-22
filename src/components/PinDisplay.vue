<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{ pin: string }>()

const pinDigitsCount = computed(() => props.pin.length)

const dynamicFontSize = computed(() => {
  if (pinDigitsCount.value <= 5) return '90'
  if (pinDigitsCount.value <= 7) return '80'
  return '70'
})

const viewBoxWidth = computed(() => pinDigitsCount.value * 65)
</script>

<template>
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
        {{ pin }}
      </text>
    </svg>
  </main>
</template>

<style lang="css" scoped>
.svg-display {
  width: 100%;
  height: 100%;
  max-height: 50vh;
}

@media (min-width: 768px) {
  .svg-display {
    max-height: 400px;
  }
}

@media print {
  .svg-display {
    max-height: 100vh;
    width: 100%;
    height: 100%;
  }
}
</style>
