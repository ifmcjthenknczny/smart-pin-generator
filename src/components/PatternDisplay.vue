<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  pattern: number[]
  size?: number
  showOrder?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 240,
  showOrder: true,
})

interface Point {
  id: number
  x: number
  y: number
  step: number | null
}

const BASE_NODES = Array.from({ length: 9 }, (_, i) => {
  const id = i + 1
  const col = i % 3
  const row = Math.floor(i / 3)
  return {
    id,
    x: 50 + col * 100,
    y: 50 + row * 100,
  }
})

const stepMap = computed(() => {
  const map = new Map<number, number>()
  props.pattern.forEach((nodeId, idx) => {
    map.set(nodeId, idx + 1)
  })
  return map
})

const nodes = computed<Point[]>(() =>
  BASE_NODES.map((node) => ({
    ...node,
    step: stepMap.value.get(node.id) ?? null,
  })),
)

const activePoints = computed<Point[]>(() =>
  props.pattern
    .map((id) => nodes.value.find((n) => n.id === id))
    .filter((n): n is Point => Boolean(n)),
)

const segments = computed(() => {
  const result: Array<{ x1: number; y1: number; x2: number; y2: number; key: string }> = []
  const points = activePoints.value
  for (let i = 0; i < points.length - 1; i++) {
    if (points[i] === undefined) {
      continue
    }

    result.push({
      x1: points[i]!.x,
      y1: points[i]!.y,
      x2: points[i + 1]!.x,
      y2: points[i + 1]!.y,
      key: `${points[i]!.id}-${points[i + 1]!.id}-${i}`,
    })
  }
  return result
})
</script>

<template>
  <div class="pattern-card" :style="{ width: `${size}px` }">
    <svg
      class="pattern-svg"
      viewBox="0 0 300 300"
      :width="size"
      :height="size"
      role="img"
      :aria-label="`Wzór odblokowania: ${pattern.join(' -> ')}`"
    >
      <defs>
        <marker
          id="pattern-arrow"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="4.5"
          markerHeight="4.5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" class="arrow-head" />
        </marker>
      </defs>

      <g class="lines">
        <line
          v-for="(seg, idx) in segments"
          :key="seg.key"
          :x1="seg.x1"
          :y1="seg.y1"
          :x2="seg.x2"
          :y2="seg.y2"
          class="pattern-line"
          :marker-end="idx === segments.length - 1 ? 'url(#pattern-arrow)' : undefined"
        />
      </g>

      <g v-for="node in nodes" :key="node.id" class="node-group">
        <circle
          v-if="node.step !== null"
          :cx="node.x"
          :cy="node.y"
          r="26"
          class="node-halo"
          :class="{
            'is-start': node.step === 1,
            'is-end': node.step > 1 && node.step === pattern.length,
          }"
        />

        <circle
          :cx="node.x"
          :cy="node.y"
          :r="node.step !== null ? 15 : 8"
          class="node-dot"
          :class="{
            'is-active': node.step !== null,
            'is-start': node.step === 1,
            'is-end': node.step !== null && node.step > 1 && node.step === pattern.length,
          }"
        />

        <text
          v-if="showOrder && node.step !== null"
          :x="node.x"
          :y="node.y"
          class="node-label"
          dominant-baseline="central"
          text-anchor="middle"
        >
          {{ node.step }}
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.pattern-card {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 20px;
  background: #0f172a;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.35);
  user-select: none;
}

.pattern-svg {
  display: block;
  overflow: visible;
}

.pattern-line {
  stroke: #38bdf8;
  stroke-width: 7;
  stroke-linecap: round;
  opacity: 0.85;
  transition: all 0.2s ease;
}

.arrow-head {
  fill: #38bdf8;
}

.node-halo {
  fill: rgba(56, 189, 248, 0.16);
}

.node-halo.is-start {
  fill: rgba(52, 211, 153, 0.22);
}

.node-dot {
  fill: #334155;
  transition:
    r 0.2s ease,
    fill 0.2s ease;
}

.node-dot.is-active {
  fill: #0284c7;
  stroke: #e0f2fe;
  stroke-width: 2.5;
}

.node-dot.is-start {
  fill: #10b981;
  stroke: #d1fae5;
}

.node-halo.is-end {
  fill: rgba(239, 68, 68, 0.22);
}

.node-dot.is-end {
  fill: #ef4444;
  stroke: #fee2e2;
}

.node-label {
  fill: #ffffff;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  font-size: 13px;
  font-weight: 700;
  pointer-events: none;
}
</style>
