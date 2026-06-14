<template>
  <div class="wrapper">
    <canvas ref="canvasRef" class="particle-canvas"></canvas>

    <!-- Hero -->
    <div class="hero">
      <h1 class="hero-title">COUNTER-STRIKE 2</h1>
      <div class="hero-sub">PRO CAREER SIMULATOR</div>
      <p class="hero-text">
        2023年9月27日。Valve按下开关。CS:GO成为历史，Counter-Strike 2正式上线。<br>
        旧的秩序正在松动。FaZe刚捧起CS2时代第一个冠军，donk还在青训营里打着一局又一局的死斗——<br>
        他还没人认识，但四个月后，全世界的镜头都会对准他。
        <span class="hero-question">这是CS2的第一页。你在哪里？你是谁？</span>
      </p>
    </div>

    <!-- Form Card -->
    <div class="card">
      <h2 class="card-title">选手档案登录</h2>

      <div class="form-body">
        <div class="form-grid">
          <div class="field full">
            <label class="fl">起点时间线</label>
            <small class="fd">选择你进入CS2职业赛场的时间点</small>
            <select v-model="form.timeline" class="fi">
              <option value="2023年10月">A · CS2 元年（2023年10月）—— 乱世崛起，版图未定</option>
              <option value="2024年1月">B · 2024 赛季揭幕（2024年1月）—— 首个CS2 Major前夜</option>
              <option value="2025年1月">C · Vitality 王朝前夜（2025年1月）—— 搭上王朝列车或另辟蹊径</option>
            </select>
          </div>

          <div class="field"><label class="fl">选手 ID / 姓名</label><small class="fd">你在职业赛场上的名字</small><input v-model="form.name" class="fi" placeholder="如：Niko, ZywOo, 或自定义ID"></div>
          <div class="field"><label class="fl">性别</label><small class="fd">男 / 女 / 自定义</small><input v-model="form.gender" class="fi" placeholder="男 / 女 / 自定义"></div>
          <div class="field"><label class="fl">年龄</label><small class="fd">新秀17-20 · 巅峰21-27 · 老将28+</small><input v-model="form.age" type="number" class="fi" min="16" max="35" placeholder="19"></div>
          <div class="field"><label class="fl">国籍</label><small class="fd">代表哪个赛区出战</small><input v-model="form.nationality" class="fi" placeholder="如：中国、法国、俄罗斯、巴西…"></div>
          <div class="field"><label class="fl">外貌</label><small class="fd">发型、体型、标志性特征……</small><input v-model="form.appearance" class="fi" placeholder="如：黑色短发，左耳银色耳钉，手腕有纹身"></div>

          <div class="field">
            <label class="fl">场上位置</label>
            <small class="fd">决定你的战术角色和训练侧重</small>
            <select v-model="form.position" class="fi">
              <option value="狙击手">狙击手 (AWPer) —— 长枪在手，一枪定胜负</option>
              <option value="步枪手">步枪手 (Rifler) —— 突破/补枪/防守多面手</option>
              <option value="指挥">指挥 (IGL) —— 阅读比赛、调度全队</option>
              <option value="自由人">自由人 (Lurker) —— 独立游走，创造空间</option>
            </select>
          </div>

          <div class="field">
            <label class="fl">性格原型</label>
            <small class="fd">决定你在赛场上和更衣室中的行为方式</small>
            <select v-model="form.personality" class="fi">
              <option value="冷静指挥官">冷静指挥官 —— 赛中沉稳调度，赛后复盘精确</option>
              <option value="天才少年">天才少年 —— 枪法至上，关键时刻敢赌，训练到凌晨</option>
              <option value="沉默杀手">沉默杀手 —— 话少枪狠，赢比赛点头示意，输比赛默默加练</option>
              <option value="更衣室领袖">更衣室领袖 —— 输比赛后第一个打气，也第一个拍桌子</option>
              <option value="话题人物">话题人物 —— 采访金句频出，社媒活跃</option>
              <option value="__custom__">⚡ 自定义 —— 在下方输入框描述你的性格</option>
            </select>
          </div>

          <div class="field" v-if="form.personality === '__custom__'">
            <label class="fl">自定义性格描述</label>
            <small class="fd">描述你的性格特征和行为方式</small>
            <input v-model="form.customPersonality" class="fi" placeholder="如：外冷内热的老将，场上冷血场下温柔…">
          </div>

          <div class="field full">
            <label class="fl">属性分配 <span class="fl-badge">剩余 {{ pointsLeft }} 点</span></label>
            <small class="fd">总点数 220，根据你的年龄和背景自由分配。老将多分大赛经验，新人多分硬实力。</small>
            <div class="stats-panel">
              <div class="stat-line">
                <div class="stat-info">
                  <span class="stat-color" style="background:#42a5f5"></span>
                  <span class="stat-name">稳定性</span>
                  <span class="stat-desc">减少发挥失常概率</span>
                </div>
                <div class="stat-input-row">
                  <input type="range" v-model.number="form.stability" min="20" max="100" class="stat-slider" />
                  <span class="stat-num">{{ form.stability }}</span>
                </div>
              </div>
              <div class="stat-line">
                <div class="stat-info">
                  <span class="stat-color" style="background:#f0a030"></span>
                  <span class="stat-name">硬实力</span>
                  <span class="stat-desc">rating 映射 + 对枪胜率</span>
                </div>
                <div class="stat-input-row">
                  <input type="range" v-model.number="form.skill" min="20" max="100" class="stat-slider" />
                  <span class="stat-num">{{ form.skill }}</span>
                </div>
              </div>
              <div class="stat-line">
                <div class="stat-info">
                  <span class="stat-color" style="background:#4caf50"></span>
                  <span class="stat-name">大赛经验</span>
                  <span class="stat-desc">关键局抗压 + 失常减伤</span>
                </div>
                <div class="stat-input-row">
                  <input type="range" v-model.number="form.experience" min="20" max="100" class="stat-slider" />
                  <span class="stat-num">{{ form.experience }}</span>
                </div>
              </div>
              <div class="stat-total-bar">
                <div class="total-fill" :style="{ width: pointsUsedPercent + '%' }" :class="pointsLeft < 0 ? 'over' : ''"></div>
              </div>
            </div>
          </div>

          <div class="field full">
            <label class="fl">补充说明</label>
            <small class="fd">可填写背景故事、个人习惯、口头禅、与某位选手的关系等</small>
            <textarea v-model="form.description" class="fi ft" placeholder="如：出道于FACEIT天梯，以一把沙鹰在FPL成名。偶像是device……"></textarea>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2 class="card-title">数据预览</h2>
        <div class="preview-body">
          <textarea :value="generatedText" readonly class="preview-area"></textarea>
          <div class="btn-group">
            <button class="btn btn-generate" @click="generate">生成档案文本</button>
            <button class="btn btn-copy" @click="copy">复制档案数据</button>
          </div>
          <p class="hint">将生成的文本粘贴到输入框发送给 AI，即可开始你的职业生涯。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';

const TOTAL_POINTS = 220;

const form = reactive({
  timeline: '2025年1月',
  name: '',
  gender: '',
  age: '',
  nationality: '',
  appearance: '',
  position: '步枪手',
  personality: '__custom__',
  customPersonality: '',
  description: '',
  stability: 70,
  skill: 80,
  experience: 70,
});

const generatedText = ref('');

const personalityText = computed(() => {
  if (form.personality === '__custom__') return form.customPersonality || '未填写';
  return form.personality;
});

const pointsUsed = computed(() => form.stability + form.skill + form.experience);
const pointsLeft = computed(() => TOTAL_POINTS - pointsUsed.value);
const pointsUsedPercent = computed(() => (pointsUsed.value / TOTAL_POINTS) * 100);

function generate() {
  const lines = [
    '起点时间线: ' + form.timeline,
    '选手档案:',
    '  姓名: ' + (form.name || '未填写'),
    '  性别: ' + (form.gender || '未填写'),
    '  年龄: ' + (form.age || '未填写'),
    '  国籍: ' + (form.nationality || '未填写'),
    '  外貌: ' + (form.appearance || '未填写'),
    '  位置: ' + form.position,
    '  性格: ' + personalityText.value,
  ];
  if (form.description.trim()) {
    lines.push('  补充说明:');
    form.description.trim().split('\n').filter(l => l.trim()).forEach(l => {
      lines.push('    - ' + l.trim());
    });
  }
  lines.push('  属性分配 (220点):');
  lines.push('    稳定性: ' + form.stability);
  lines.push('    硬实力: ' + form.skill);
  lines.push('    大赛经验: ' + form.experience);
  lines.push('');
  lines.push('# 将以上文本发送给 AI，AI 将据此设置初始属性并安排你的第一支战队。');
  generatedText.value = lines.join('\n');
}

async function copy() {
  if (!generatedText.value) generate();
  try {
    await navigator.clipboard.writeText(generatedText.value);
  } catch { /* fallback */ }
}

// Particle canvas
const canvasRef = ref<HTMLCanvasElement>();
let animId = 0;
interface Particle { x: number; y: number; s: number; a: number; vx: number; vy: number; l: number }
const particles: Particle[] = [];

function initCanvas() {
  const c = canvasRef.value;
  if (!c) return;
  const parent = c.parentElement;
  if (!parent) return;
  c.width = parent.offsetWidth;
  c.height = parent.offsetHeight;
  particles.length = 0;
  for (let i = 0; i < 25; i++) {
    particles.push({
      x: Math.random() * c.width, y: Math.random() * c.height,
      s: 0.5 + Math.random() * 1.2, a: 0.06 + Math.random() * 0.12,
      vx: 0.1 + Math.random() * 0.3, vy: -0.05 + Math.random() * 0.1,
      l: Math.random() * 1000,
    });
  }
}

function loop() {
  const c = canvasRef.value;
  if (!c) return;
  const ctx = c.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, c.width, c.height);
  for (const p of particles) {
    p.l++; p.x += p.vx; p.y += p.vy + Math.sin(p.l * 0.008) * 0.15;
    if (p.x > c.width + 10) p.x = -5;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(240, 160, 48, ${p.a})`; ctx.fill();
  }
  animId = requestAnimationFrame(loop);
}

onMounted(() => { initCanvas(); loop(); window.addEventListener('resize', initCanvas); });
onUnmounted(() => { cancelAnimationFrame(animId); window.removeEventListener('resize', initCanvas); });
</script>

<style lang="scss" scoped>
.wrapper { position: relative; padding: 20px 12px; }
.particle-canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }

.hero { position: relative; z-index: 1; text-align: center; margin-bottom: 32px; }
.hero-title {
  font-family: var(--font-display);
  font-size: 40px; font-weight: 700; color: #fff;
  letter-spacing: 5px; margin-bottom: 4px;
  animation: title-glow 5s ease-in-out infinite;
}
.hero-sub { font-size: 11px; letter-spacing: 3px; color: var(--c-text-dim); margin-bottom: 18px; }
.hero-text { font-size: 13px; line-height: 1.8; color: #c0c0c0; max-width: 640px; margin: 0 auto; }
.hero-question {
  display: block; margin-top: 16px;
  font-weight: 700; color: var(--c-primary); font-size: 15px;
  text-shadow: 0 0 8px rgba(240, 160, 48, 0.35);
}

.card {
  position: relative; z-index: 1;
  background: rgba(10,10,10,0.7);
  backdrop-filter: blur(16px);
  border-radius: 8px;
  border: 1px solid rgba(240,160,48,0.3);
  overflow: hidden;
}
.card-title {
  background: linear-gradient(90deg, rgba(184,112,15,0.5), transparent);
  font-size: 13px; font-weight: 700; letter-spacing: 2px; margin: 0;
  padding: 14px 20px; color: #f5d78c;
  border-bottom: 1px solid rgba(240,160,48,0.2);
  display: flex; align-items: center;
  &::before { content: '◆'; color: var(--c-primary); margin-right: 10px; font-size: 8px; }
}

.form-body { padding: 22px; }
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 18px 14px;
}
.field { display: flex; flex-direction: column; gap: 5px; }
.field.full { grid-column: 1 / -1; }
.fl {
  font-size: 10px; font-weight: 600; color: var(--c-label);
  text-transform: uppercase; letter-spacing: 1px;
}
.fd { font-size: 9px; color: var(--c-text-muted); }
.fi {
  padding: 9px 11px;
  background: rgba(0,0,0,0.4);
  border: 1px solid rgba(200,200,200,0.12);
  border-radius: 4px;
  color: #f8fafc; font-size: 12px; font-family: inherit;
  outline: none; width: 100%;
  transition: border 0.2s;
  &:focus { border-color: rgba(240,160,48,0.5); }
  &::placeholder { color: var(--c-text-dim); font-style: italic; }
}
.ft { resize: vertical; min-height: 70px; line-height: 1.5; }

select.fi {
  cursor: pointer; appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='%23f0a030' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat; background-position: right 8px center;
  background-size: 14px; padding-right: 30px;
  option { background: #0f0f0f; color: #e0e0e0; }
}

.preview-section { border-top: 1px solid rgba(240,160,48,0.12); background: rgba(0,0,0,0.15); }
.preview-body { padding: 22px; padding-top: 16px; }
.preview-area {
  width: 100%; min-height: 130px;
  padding: 12px; background: rgba(0,0,0,0.5);
  border: 1px dashed rgba(240,160,48,0.3); border-radius: 4px;
  color: #f5c842; font-family: Consolas, Monaco, monospace;
  font-size: 12px; resize: vertical; outline: none;
  white-space: pre-wrap; margin-bottom: 16px;
}

.btn-group { display: flex; gap: 12px; flex-wrap: wrap; }
.btn {
  padding: 10px 20px; border-radius: 4px;
  font-size: 12px; font-weight: 700; letter-spacing: 1px;
  cursor: pointer; transition: all 0.3s; flex: 1;
  text-transform: uppercase; font-family: inherit;
}
.btn-generate {
  background: rgba(15,15,15,0.9); color: #e0e0e0;
  border: 1px solid var(--c-primary);
  &:hover { background: var(--c-primary); color: #000; }
}
.btn-copy {
  background: rgba(0,0,0,0.5); color: #999;
  border: 1px solid #555;
  &:hover { color: #fff; border-color: #888; }
}

.hint {
  font-size: 10px; color: var(--c-text-dim); text-align: center; margin-top: 12px;
}

// Stats
.fl-badge {
  font-size: 11px; font-weight: 700;
  padding: 2px 8px; border-radius: 3px;
  background: rgba(240,160,48,0.12); color: var(--c-primary);
  margin-left: 8px; letter-spacing: 0;
  &:has(+ .over) { color: var(--c-danger); background: rgba(229,57,53,0.12); }
}
.stats-panel {
  background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 5px; padding: 12px 14px;
}
.stat-line {
  margin-bottom: 10px;
  &:last-of-type { margin-bottom: 8px; }
}
.stat-info {
  display: flex; align-items: center; gap: 8px; margin-bottom: 4px;
}
.stat-color {
  width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0;
}
.stat-name {
  font-size: 11px; font-weight: 600; color: #ddd;
}
.stat-desc {
  font-size: 9px; color: var(--c-text-dim);
}
.stat-input-row {
  display: flex; align-items: center; gap: 10px;
}
.stat-slider {
  flex: 1;
  -webkit-appearance: none; appearance: none;
  height: 5px; background: #222; border-radius: 3px;
  outline: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none; width: 14px; height: 14px;
    border-radius: 50%; background: var(--c-primary);
    cursor: pointer; border: none;
  }
}
.stat-num {
  font-size: 14px; font-weight: 700; font-family: var(--font-display);
  color: var(--c-primary); min-width: 30px; text-align: right;
}
.stat-total-bar {
  height: 3px; background: #1a1a1a; border-radius: 2px;
}
.total-fill {
  height: 100%; border-radius: 2px;
  background: linear-gradient(90deg, #42a5f5, var(--c-primary), #4caf50);
  transition: width 0.3s;
  &.over { background: #e53935; }
}

@media (max-width: 768px) { .hero-title { font-size: 28px; } }
@media (max-width: 600px) { .btn-group { flex-direction: column; } }
</style>
