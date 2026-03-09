<template>
  <div class="grid-bg min-h-screen relative">
    <!-- 滚动进度条 -->
    <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    
    <!-- 鼠标跟随光效 -->
    <div class="glow-cursor hidden md:block" :style="{ left: cursorX + 'px', top: cursorY + 'px' }"></div>
    
    <!-- Hero 区域 -->
    <header class="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-20 left-10 w-32 h-32 opacity-20 animate-float">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" class="text-cyan-400">
            <rect x="20" y="30" width="60" height="40" rx="5" stroke-width="3"/>
            <circle cx="35" cy="50" r="5" fill="currentColor"/>
            <circle cx="65" cy="50" r="5" fill="currentColor"/>
            <path d="M40 60 Q50 65 60 60" stroke-width="2"/>
          </svg>
        </div>
        <div class="absolute bottom-32 right-20 w-24 h-24 opacity-20 animate-float" style="animation-delay: 1s;">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" class="text-purple-400">
            <rect x="25" y="25" width="50" height="50" rx="3" stroke-width="3"/>
            <rect x="35" y="40" width="30" height="5" fill="currentColor"/>
            <rect x="45" y="30" width="10" height="25" fill="currentColor"/>
          </svg>
        </div>
      </div>
      
      <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div class="mb-6">
          <span class="inline-block px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium tracking-wider">
            🎮 比比的28年游戏人生 (1998-2026)
          </span>
        </div>
        
        <h1 class="font-display text-5xl md:text-7xl font-black mb-6 leading-tight">
          <span class="neon-text text-cyan-400 block mb-2">我不是在玩游戏</span>
        </h1>
        
        <p class="text-xl md:text-2xl text-pink-400 neon-text-pink font-medium mb-12">
          我是在用游戏，<span class="text-white">活成自己</span>
        </p>
        
        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg class="w-8 h-8 text-cyan-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </div>
    </header>

    <!-- 目录 Section -->
    <section class="py-20 px-4 reveal" :class="{ active: scrollY > 300 }">
      <div class="max-w-3xl mx-auto">
        <h2 class="font-display text-3xl font-bold text-cyan-400 mb-10 flex items-center gap-3">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          目录
        </h2>
        
        <nav class="space-y-3">
          <a v-for="(item, index) in tocItems" :key="index" :href="item.href" class="toc-item glass-card block p-5 rounded-xl group">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-lg flex items-center justify-center text-xl" :class="item.bgClass">
                {{ item.emoji }}
              </div>
              <div class="flex-1">
                <span :class="item.colorClass + ' font-display font-bold text-lg'">{{ item.num }}</span>
                <span class="text-white font-medium ml-2 group-hover:text-cyan-300 transition-colors">{{ item.title }}</span>
              </div>
              <svg class="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </a>
        </nav>
      </div>
    </section>

    <!-- 个人档案 Section -->
    <section id="profile" class="py-20 px-4 relative reveal" :class="{ active: scrollY > 800 }">
      <div class="absolute inset-0 pixel-pattern opacity-50 pointer-events-none"></div>
      
      <div class="max-w-6xl mx-auto relative z-10">
        <div class="text-center mb-16">
          <div class="inline-block mb-4">
            <div class="w-24 h-24 mx-auto mb-4 relative">
              <div class="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-2xl animate-pulse opacity-50"></div>
              <div class="absolute inset-1 bg-gray-900 rounded-2xl flex items-center justify-center text-4xl">
                👾
              </div>
            </div>
          </div>
          <h2 class="font-display text-4xl md:text-5xl font-bold mb-2">
            <span class="neon-text text-cyan-400">序章：个人档案</span>
          </h2>
          <p class="text-gray-400 font-display tracking-widest uppercase text-sm">Personal Profile</p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8">
          <div class="glass-card rounded-2xl p-8">
            <h3 class="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
              <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              基本档案
            </h3>
            
            <div class="flex gap-6">
              <div class="flex-shrink-0">
                <div class="w-24 h-24 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-1">
                  <div class="w-full h-full rounded-lg bg-gray-800 flex items-center justify-center text-5xl overflow-hidden">
                    🧙‍♀️
                  </div>
                </div>
              </div>
              
              <div class="space-y-3 flex-1">
                <div class="flex items-center gap-3">
                  <span class="text-gray-400">姓名:</span>
                  <span class="text-white font-medium">比比</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-gray-400">出生:</span>
                  <span class="text-white font-medium">1994年</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-gray-400">星座:</span>
                  <span class="text-white font-medium">摩羯座</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-gray-400">性别:</span>
                  <span class="text-white font-medium">女</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="glass-card rounded-2xl p-8">
            <h3 class="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
              <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
              </svg>
              游戏生涯数据
            </h3>
            
            <div class="grid grid-cols-2 gap-4">
              <div v-for="stat in stats" :key="stat.label" class="stat-card rounded-xl p-4 text-center">
                <div :class="['text-3xl font-display font-bold mb-1', stat.color]">{{ stat.value }}</div>
                <div class="text-xs text-gray-400">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 第一幕 -->
    <section id="childhood" class="py-20 px-4 relative overflow-hidden reveal" :class="{ active: scrollY > 1200 }">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-10 w-40 h-40 bg-yellow-400 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-20 w-60 h-60 bg-orange-400 rounded-full blur-3xl"></div>
      </div>
      
      <div class="max-w-5xl mx-auto relative z-10">
        <div class="text-center mb-16">
          <div class="inline-block p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <span class="text-5xl">🐣</span>
          </div>
          <h2 class="font-display text-4xl md:text-5xl font-bold text-yellow-400 mb-2">第一幕：童年与启蒙</h2>
          <p class="text-gray-400 font-display">1998 - 2006</p>
        </div>
        
        <div class="space-y-8">
          <div v-for="item in childhoodItems" :key="item.title" class="glass-card rounded-2xl p-8">
            <div class="flex items-start gap-6">
              <div class="w-20 h-20 rounded-xl flex items-center justify-center text-4xl flex-shrink-0" :class="item.bgClass">
                {{ item.emoji }}
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white mb-3">{{ item.title }}</h3>
                <p class="text-gray-300 leading-relaxed">{{ item.desc }}</p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span v-for="tag in item.tags" :key="tag" class="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-sm">{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 第二幕 -->
    <section id="growth" class="py-20 px-4 relative overflow-hidden reveal" :class="{ active: scrollY > 2000 }">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-40 right-10 w-60 h-60 bg-green-400 rounded-full blur-3xl"></div>
        <div class="absolute bottom-40 left-20 w-40 h-40 bg-teal-400 rounded-full blur-3xl"></div>
      </div>
      
      <div class="max-w-5xl mx-auto relative z-10">
        <div class="text-center mb-16">
          <div class="inline-block p-4 rounded-2xl bg-green-500/10 border border-green-500/20 mb-6">
            <span class="text-5xl">🌱</span>
          </div>
          <h2 class="font-display text-4xl md:text-5xl font-bold text-green-400 mb-2">第二幕：成长与探索</h2>
          <p class="text-gray-400 font-display">2006 - 2019</p>
        </div>
        
        <div class="space-y-8">
          <div v-for="item in growthItems" :key="item.title" class="glass-card rounded-2xl p-8">
            <div class="flex items-start gap-6">
              <div class="w-20 h-20 rounded-xl flex items-center justify-center text-4xl flex-shrink-0" :class="item.bgClass">
                {{ item.emoji }}
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white mb-3">{{ item.title }}</h3>
                <p class="text-gray-300 leading-relaxed mb-4">{{ item.desc }}</p>
                <div v-if="item.games" class="flex flex-wrap gap-2">
                  <span v-for="tag in item.games" :key="tag" class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 第三幕 -->
    <section id="hardcore" class="py-20 px-4 relative overflow-hidden reveal" :class="{ active: scrollY > 2800 }">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-1/3 w-80 h-80 bg-red-400 rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-1/4 w-60 h-60 bg-pink-400 rounded-full blur-3xl"></div>
      </div>
      
      <div class="max-w-5xl mx-auto relative z-10">
        <div class="text-center mb-16">
          <div class="inline-block p-4 rounded-2xl bg-red-500/10 border border-red-500/20 mb-6">
            <span class="text-5xl">🎮</span>
          </div>
          <h2 class="font-display text-4xl md:text-5xl font-bold text-red-400 mb-2">第三幕：硬核与沉淀</h2>
          <p class="text-gray-400 font-display">2019 - 2026</p>
        </div>
        
        <div class="space-y-8">
          <div v-for="item in hardcoreItems" :key="item.title" class="glass-card rounded-2xl p-8">
            <div class="flex items-start gap-6">
              <div class="w-20 h-20 rounded-xl flex items-center justify-center text-4xl flex-shrink-0" :class="item.bgClass">
                {{ item.emoji }}
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white mb-3">{{ item.title }}</h3>
                <p class="text-gray-300 leading-relaxed">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 终章 -->
    <section id="life" class="py-20 px-4 relative overflow-hidden reveal" :class="{ active: scrollY > 3500 }">
      <div class="absolute inset-0 hero-gradient opacity-50"></div>
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400 rounded-full blur-3xl"></div>
      </div>
      
      <div class="max-w-4xl mx-auto relative z-10">
        <div class="text-center mb-16">
          <div class="inline-block p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-6">
            <span class="text-5xl">🏆</span>
          </div>
          <h2 class="font-display text-4xl md:text-5xl font-bold text-purple-400 mb-2">终章：游戏与人生</h2>
          <p class="text-gray-400">Game Over? No, To Be Continued...</p>
        </div>
        
        <div class="glass-card rounded-2xl p-8 md:p-12 text-center">
          <div class="max-w-2xl mx-auto">
            <p class="text-xl text-gray-300 leading-relaxed mb-8">28 年，531 款游戏。</p>
            <p class="text-lg text-gray-400 leading-relaxed mb-8">
              有人说游戏是逃避现实的工具，但对我来说，游戏是理解世界的方式。
            </p>
            <div class="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 border border-purple-500/20 mb-8">
              <p class="text-2xl md:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                "我不是在玩游戏"
              </p>
              <p class="text-xl md:text-2xl text-white mt-2">
                我是在用游戏，<span class="text-pink-400">活成自己</span>
              </p>
            </div>
            <p class="text-gray-500 text-sm">游戏还在继续，故事未完待续...</p>
          </div>
        </div>
        
        <div class="mt-12 flex justify-center gap-6">
          <a href="#" class="glass-card w-14 h-14 rounded-full flex items-center justify-center hover:bg-purple-500/20 transition-colors">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>
          </a>
          <a href="#" class="glass-card w-14 h-14 rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition-colors">
            <svg class="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15h-2v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95 0-5.52-4.48-10-10-10z"/></svg>
          </a>
          <a href="#" class="glass-card w-14 h-14 rounded-full flex items-center justify-center hover:bg-pink-500/20 transition-colors">
            <svg class="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          </a>
        </div>
      </div>
    </section>

    <footer class="py-12 px-4 border-t border-gray-800">
      <div class="max-w-4xl mx-auto text-center">
        <p class="text-gray-500 text-sm">Made with 🎮 by 比比 | 用游戏，活成自己</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)
const scrollY = ref(0)
const cursorX = ref(-150)
const cursorY = ref(-150)

const tocItems = [
  { href: '#profile', emoji: '👤', num: '01', title: '序章：个人档案', colorClass: 'text-cyan-400', bgClass: 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20' },
  { href: '#childhood', emoji: '🐣', num: '02', title: '第一幕：童年与启蒙 (1998-2006)', colorClass: 'text-yellow-400', bgClass: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20' },
  { href: '#growth', emoji: '🌱', num: '03', title: '第二幕：成长与探索 (2006-2019)', colorClass: 'text-green-400', bgClass: 'bg-gradient-to-br from-green-500/20 to-teal-500/20' },
  { href: '#hardcore', emoji: '🎮', num: '04', title: '第三幕：硬核与沉淀 (2019-2026)', colorClass: 'text-red-400', bgClass: 'bg-gradient-to-br from-red-500/20 to-pink-500/20' },
  { href: '#life', emoji: '🏆', num: '05', title: '终章：游戏与人生', colorClass: 'text-purple-400', bgClass: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' },
]

const stats = [
  { value: '28年', label: '游戏龄 (1998-2026)', color: 'text-cyan-400' },
  { value: '531款', label: '总游戏数', color: 'text-orange-400' },
  { value: '5405个', label: 'Steam 成就总数', color: 'text-yellow-400' },
  { value: '36个', label: '完美通关游戏', color: 'text-blue-400' },
  { value: '666个', label: 'DLC 拥有数量', color: 'text-red-400' },
  { value: '39%', label: '平均成就完成率', color: 'text-green-400' },
]

const childhoodItems = [
  { title: '街机厅的初遇', desc: '4岁那年，第一次被爸爸带去游戏机房。霓虹灯下，摇杆和按钮的声音像是另一个世界的召唤。', emoji: '🕹️', bgClass: 'bg-gradient-to-br from-yellow-400/20 to-orange-400/20', tags: ['拳皇 97', '街霸', '合金弹头'] },
  { title: '小霸王学习机', desc: '"小霸王，其乐无穷！" 和表弟抢手柄，在超级玛丽里寻找隐藏关卡。', emoji: '📺', bgClass: 'bg-gradient-to-br from-red-400/20 to-pink-400/20', tags: ['超级玛丽', '魂斗罗', '热血系列'] },
  { title: 'Game Boy Color', desc: '第一部真正属于自己的掌机。宝可梦的金版银版，通关了一遍又一遍。', emoji: '🎮', bgClass: 'bg-gradient-to-br from-purple-400/20 to-blue-400/20', tags: ['宝可梦 金/银/水晶版'] },
]

const growthItems = [
  { title: 'PSP：移动游戏的新纪元', desc: 'PSP 让我第一次体验到了"主机级"的便携游戏体验。', emoji: '🎴', bgClass: 'bg-gradient-to-br from-gray-400/20 to-slate-400/20', games: ['侠盗猎车手', '怪物猎人'] },
  { title: '网游：虚拟世界的社交', desc: 'QQ 飞车、穿越火线、地下城与勇士... 连接了千万玩家的虚拟世界。', emoji: '🌐', bgClass: 'bg-gradient-to-br from-blue-400/20 to-cyan-400/20', games: ['QQ 飞车', '穿越火线', 'DNF'] },
  { title: '3DS：裸眼3D的魔法', desc: '《塞尔达传说：时之笛3D》重温经典，《动物森友会》每天必 check。', emoji: '🥽', bgClass: 'bg-gradient-to-br from-red-400/20 to-blue-400/20', games: ['动物森友会'] },
]

const hardcoreItems = [
  { title: 'Steam 与 PC 游戏', desc: '从独立游戏到3A大作，从夏促到冬促，库里的游戏越来越多。', emoji: '🖥️', bgClass: 'bg-gradient-to-br from-blue-400/20 to-indigo-400/20' },
  { title: 'Nintendo Switch', desc: '《塞尔达传说：旷野之息》重新定义开放世界。', emoji: '🎌', bgClass: 'bg-gradient-to-br from-red-400/20 to-white/10' },
  { title: '追求完美', desc: '36 个完美通关游戏，5405 个成就。全收集、全成就、全结局。', emoji: '⭐', bgClass: 'bg-gradient-to-br from-yellow-400/20 to-amber-400/20' },
]

const handleScroll = () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  progress.value = height > 0 ? (winScroll / height) * 100 : 0
  scrollY.value = winScroll
}

const handleMouseMove = (e) => {
  cursorX.value = e.clientX - 150
  cursorY.value = e.clientY - 150
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>
