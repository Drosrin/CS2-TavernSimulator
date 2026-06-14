<template>
  <div class="stat-bar-wrap">
    <div class="stat-header">
      <span class="stat-label">{{ label }}</span>
      <span class="stat-value">{{ value }}</span>
    </div>
    <div class="bar-track">
      <div
        class="bar-fill"
        :class="barClass"
        :style="{ width: clampPercent(value) + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  value: number;
  color: 'stability' | 'skill' | 'experience' | 'chemistry';
}>();

const barClassMap = {
  stability: 'bar-stability',
  skill: 'bar-skill',
  experience: 'bar-experience',
  chemistry: 'bar-chemistry',
};

const barClass = barClassMap[props.color];

function clampPercent(v: number): number {
  return Math.max(0, Math.min(100, Number(v) || 0));
}
</script>

<style lang="scss" scoped>
.stat-bar-wrap {
  margin-bottom: 4px;
}
.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 0;
}
.stat-label {
  font-size: 10px;
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.stat-value {
  font-size: 11px;
  font-weight: 700;
  color: var(--c-text);
  font-family: var(--font-display);
}
.bar-track {
  height: 5px;
  background: #1a1a1a;
  border-radius: 3px;
  overflow: hidden;
}
.bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.bar-stability { background: linear-gradient(90deg, #42a5f5, #64b5f6); }
.bar-skill { background: linear-gradient(90deg, #f0a030, #ffc107); }
.bar-experience { background: linear-gradient(90deg, #4caf50, #81c784); }
.bar-chemistry { background: linear-gradient(90deg, #ff6f00, #ff9800); }
</style>
