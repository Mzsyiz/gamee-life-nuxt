<template>
  <div class="grid-bg min-h-screen relative">
    <!-- 导航栏 -->
    <SiteNav />

    <!-- 页面标题 -->
    <header class="relative py-20 px-4 hero-gradient overflow-hidden mt-16">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-20 w-60 h-60 bg-cyan-400 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-20 w-80 h-80 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-5xl mx-auto relative z-10 text-center">
        <div class="inline-block p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-6">
          <span class="text-5xl">📖</span>
        </div>
        <h1 class="font-display text-4xl md:text-6xl font-bold mb-4">
          <span class="neon-text text-cyan-400">游戏日记</span>
        </h1>
        <p class="text-gray-400 text-lg">记录每一个游戏时刻</p>
      </div>
    </header>

    <!-- 时间轴内容 -->
    <section class="py-20 px-4">
      <div class="max-w-5xl mx-auto">
        <div class="relative">
          <!-- 时间轴线 -->
          <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 transform md:-translate-x-1/2"></div>

          <!-- 时间轴项目 -->
          <div class="space-y-12">
            <div
              v-for="(item, index) in diaryItems"
              :key="index"
              class="relative reveal"
              :class="{ active: true }"
            >
              <!-- 时间轴节点 -->
              <div class="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-cyan-400 transform -translate-x-1/2 shadow-lg shadow-cyan-400/50 z-10">
                <div class="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75"></div>
              </div>

              <!-- 内容卡片 - 移动端始终在右侧，桌面端交替显示 -->
              <div
                class="ml-16 md:ml-0"
                :class="index % 2 === 0 ? 'md:pr-[calc(50%+3rem)]' : 'md:pl-[calc(50%+3rem)]'"
              >
                <div class="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300">
                  <!-- 日期标签 -->
                  <div class="flex items-center gap-2 mb-4">
                    <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span class="text-cyan-400 font-medium">{{ formatDate(item.date) }}</span>
                  </div>

                  <!-- 标题 -->
                  <h3 class="text-xl md:text-2xl font-bold text-white mb-4">{{ item.title }}</h3>

                  <!-- 游戏图片 -->
                  <div class="relative rounded-xl overflow-hidden mb-4 group">
                    <img
                      :src="item.game_image"
                      :alt="item.game"
                      class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      @error="handleImageError"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div class="absolute bottom-4 left-4 flex items-center gap-2">
                      <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                      </svg>
                      <span class="text-white font-medium">{{ item.game }}</span>
                    </div>
                  </div>

                  <!-- 描述 -->
                  <p class="text-gray-300 leading-relaxed">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const diaryItems = ref([])

// 格式化日期
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}年${month}月${day}日`
}

// 图片加载失败处理
const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/460x215/1a1a2e/ffffff?text=Game+Image'
}

// 加载日记数据
onMounted(async () => {
  try {
    const response = await fetch('/data/diary.json')
    diaryItems.value = await response.json()
  } catch (error) {
    console.error('加载日记数据失败:', error)
  }
})
</script>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(30px);
  animation: revealAnimation 0.6s ease-out forwards;
}

.reveal.active {
  animation-delay: calc(var(--index, 0) * 0.1s);
}

@keyframes revealAnimation {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
