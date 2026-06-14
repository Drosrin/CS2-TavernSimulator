<template>
  <div class="panel">
    <div class="panel-header">
      <span class="panel-dot">&#9670;</span>
      <span>战队面板</span>
    </div>

    <div class="panel-body">
      <!-- Stage Badge -->
      <div class="stage-badge" :class="stageClass">
        {{ store.data.赛季.赛事阶段 || '休赛期' }}
        <span class="stage-date">{{ store.data.赛季.当前日期 || '--' }}</span>
      </div>

      <!-- Team Info -->
      <div class="team-name">{{ store.data.玩家.当前战队 || '自由选手' }}</div>

      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">世界排名</span>
          <span class="info-value">#{{ store.data.战队.世界排名 || '--' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">当前赛事</span>
          <span class="info-value info-tournament">{{ store.data.赛季.当前赛事 || '--' }}</span>
        </div>
      </div>

      <!-- Chemistry Bar -->
      <StatBar label="化学反应" :value="store.data.战队.化学反应" color="chemistry" />

      <!-- Pre-match Roll -->
      <div class="prematch-row">
        <span class="prematch-label">赛前状态</span>
        <span class="prematch-value" :class="prematchClass">
          {{ store.data.赛季.赛前状态 || '待定' }}
        </span>
      </div>

      <!-- Recent Results -->
      <div class="divider"></div>
      <div class="recent-label">近期战绩</div>
      <div class="recent-text">{{ store.data.战队.近期战绩 || '暂无记录' }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';
import StatBar from './StatBar.vue';

const store = useDataStore();

const stageClass = computed(() => {
  const stage = store.data.赛季.赛事阶段;
  if (stage === '休赛期' || stage === '赛后') return 'stage-neutral';
  if (stage === '训练期') return 'stage-training';
  if (stage === '小组赛') return 'stage-group';
  if (stage === '淘汰赛' || stage === '决赛') return 'stage-playoff';
  return 'stage-neutral';
});

const prematchClass = computed(() => {
  const state = store.data.赛季.赛前状态;
  if (state === 'LifeGame爆发') return 'roll-popoff';
  if (state === '正常发挥') return 'roll-normal';
  if (state === '发挥失常') return 'roll-bad';
  return '';
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

.stage-badge {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
}
.stage-neutral { background: #1a1a1a; color: var(--c-text-muted); }
.stage-training { background: #102027; color: #64b5f6; }
.stage-group { background: #1a1408; color: var(--c-primary); }
.stage-playoff { background: #1a0808; color: #ef5350; animation: pulse-glow 2s ease-in-out infinite; }
.stage-date { font-weight: 400; letter-spacing: 0; color: var(--c-text-dim); }

.team-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--c-primary);
  font-family: var(--font-display);
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.info-grid {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
}
.info-item {
  flex: 1;
  background: #111;
  border-radius: 4px;
  padding: 6px 8px;
  text-align: center;
}
.info-label {
  font-size: 9px;
  color: var(--c-text-dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 2px;
}
.info-value {
  font-size: 13px;
  font-weight: 700;
  font-family: var(--font-display);
  color: var(--c-text);
}
.info-tournament {
  font-size: 10px;
  line-height: 1.2;
}

.prematch-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  padding: 5px 8px;
  background: #111;
  border-radius: 4px;
}
.prematch-label {
  font-size: 10px;
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.prematch-value {
  font-size: 12px;
  font-weight: 700;
}
.roll-popoff { color: #ffd700; text-shadow: 0 0 6px rgba(255,215,0,0.3); }
.roll-normal { color: #e0e0e0; }
.roll-bad { color: var(--c-danger); }

.divider {
  border-top: 1px solid #1e1e1e;
  margin: 8px 0;
}
.recent-label {
  font-size: 9px;
  color: var(--c-text-dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}
.recent-text {
  font-size: 10px;
  color: var(--c-text-muted);
  line-height: 1.5;
}
</style>
