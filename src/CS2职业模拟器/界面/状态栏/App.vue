<template>
  <div class="app-container">
    <!-- Creation form shown when player not yet created -->
    <CharacterCreation v-if="!store.data.玩家.姓名" />

    <!-- Status panels shown after creation -->
    <div v-else class="panels">
      <PlayerPanel />
      <TeamPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from './store';
import PlayerPanel from './components/PlayerPanel.vue';
import TeamPanel from './components/TeamPanel.vue';
import CharacterCreation from './components/CharacterCreation.vue';

const store = useDataStore();
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  padding: 8px;
  margin: 0 auto;
}

.panels {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  max-width: 640px;
  margin: 0 auto;
}
</style>
