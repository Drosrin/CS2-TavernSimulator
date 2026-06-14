<template>
  <div class="panel">
    <div class="panel-header">
      <span class="panel-dot">&#9670;</span>
      <span>选手档案</span>
    </div>

    <div class="panel-body">
      <!-- Identity -->
      <div class="identity-row">
        <div class="player-name">{{ store.data.玩家.姓名 || '未初始化' }}</div>
        <div class="player-meta">
          {{ store.data.玩家.国籍 || '--' }} &middot; {{ store.data.玩家.年龄 || '--' }}岁
        </div>
      </div>
      <div class="player-position">{{ store.data.玩家.位置 || '--' }}</div>

      <div class="divider"></div>

      <!-- Stat Bars -->
      <StatBar label="稳定性" :value="store.data.玩家.稳定性" color="stability" />
      <StatBar label="硬实力" :value="store.data.玩家.硬实力" color="skill" />
      <StatBar label="大赛经验" :value="store.data.玩家.大赛经验" color="experience" />

      <div class="divider"></div>

      <!-- Current Rating -->
      <div class="rating-row">
        <span class="rating-label">当前 RATING</span>
        <span class="rating-value" :class="ratingColor">
          {{ formatRating(store.data.玩家.当前赛事rating) }}
        </span>
      </div>

      <!-- Career -->
      <div class="career-row">
        <span class="career-item" title="Major 冠军">
          <span class="career-icon">&#9733;</span>{{ store.data.玩家.职业生涯.Major冠军数 }}
        </span>
        <span class="career-item" title="大赛冠军">
          <span class="career-icon">&#9734;</span>{{ store.data.玩家.职业生涯.大赛冠军数 }}
        </span>
        <span class="career-item" title="MVP 次数">
          <span class="career-icon">&#9679;</span>{{ store.data.玩家.职业生涯.MVP数 }}
        </span>
        <span class="career-item" title="HLTV Top20 入选">
          <span class="career-icon">&#9650;</span>{{ store.data.玩家.职业生涯.HLTV_Top20入选次数 }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';
import StatBar from './StatBar.vue';

const store = useDataStore();

function formatRating(v: number): string {
  const n = Number(v);
  if (!n) return '--';
  return n.toFixed(2);
}

const ratingColor = computed(() => {
  const v = Number(store.data.玩家.当前赛事rating);
  if (!v) return '';
  if (v >= 1.30) return 'rating-elite';
  if (v >= 1.10) return 'rating-good';
  if (v >= 0.90) return 'rating-avg';
  return 'rating-bad';
});
</script>

<style lang="scss" scoped>
.panel {
  flex: 1;
  min-width: 260px;
  background: var(--c-card);
  border: 1px solid var(--c-border);
  border-radius: 6px;
  overflow: hidden;
}
.panel-header {
  background: linear-gradient(90deg, rgba(184, 112, 15, 0.35), transparent);
  padding: 8px 10px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--c-primary);
  border-bottom: 1px solid var(--c-border);
  display: flex;
  align-items: center;
  gap: 8px;
}
.panel-dot { font-size: 7px; }
.panel-body { padding: 10px; }

.identity-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.player-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--c-primary);
  font-family: var(--font-display);
  letter-spacing: 1px;
}
.player-meta {
  font-size: 10px;
  color: var(--c-text-muted);
}
.player-position {
  font-size: 11px;
  color: var(--c-text-dim);
  margin-top: 2px;
}

.divider {
  border-top: 1px solid #1e1e1e;
  margin: 8px 0;
}

.rating-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rating-label {
  font-size: 10px;
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.rating-value {
  font-size: 18px;
  font-weight: 700;
  font-family: var(--font-display);
}
.rating-elite { color: #ffd700; text-shadow: 0 0 8px rgba(255, 215, 0, 0.3); }
.rating-good { color: #4caf50; }
.rating-avg { color: #e0e0e0; }
.rating-bad { color: var(--c-danger); }

.career-row {
  display: flex;
  gap: 10px;
  margin-top: 6px;
}
.career-item {
  font-size: 11px;
  color: var(--c-text-muted);
  display: flex;
  align-items: center;
  gap: 3px;
}
.career-icon {
  font-size: 8px;
  color: var(--c-primary);
}
</style>
