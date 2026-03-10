<template>
  <div
    class="glass-card p-6 hover:scale-[1.02] transition-all duration-300 group"
    :class="align === 'right' ? 'mr-8' : 'ml-8'"
  >
    <!-- 日期标签 -->
    <div class="flex items-center gap-2 mb-3">
      <div class="px-3 py-1 rounded-full bg-neon-blue/20 border border-neon-blue/50">
        <span class="text-neon-blue text-sm font-mono">{{ formatDate(event.date) }}</span>
      </div>
      <div class="px-3 py-1 rounded-full bg-neon-purple/20 border border-neon-purple/50">
        <span class="text-neon-purple text-sm font-display">{{ event.game }}</span>
      </div>
    </div>

    <!-- 标题 -->
    <h3 class="text-xl font-display font-bold mb-3 text-white group-hover:text-neon-blue transition-colors">
      {{ event.title }}
    </h3>

    <!-- 游戏图片 -->
    <div class="relative mb-4 overflow-hidden rounded-lg border border-white/10 aspect-video bg-dark-bg/50">
      <img
        v-if="event.game_image && imageExists(event.game_image)"
        :src="event.game_image"
        :alt="event.game"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        @error="handleImageError"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <div class="text-center">
          <div class="text-6xl mb-2">🎮</div>
          <div class="text-gray-500 text-sm">{{ event.game }}</div>
        </div>
      </div>
      <!-- 渐变遮罩 -->
      <div class="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>

    <!-- 描述 -->
    <p class="text-gray-300 leading-relaxed">
      {{ event.description }}
    </p>

    <!-- 装饰线 -->
    <div class="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink transition-all duration-500 rounded-full"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  align: {
    type: String,
    default: 'left'
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

const imageExists = (path) => {
  // 简单检查路径是否存在
  return path && path.length > 0
}

const handleImageError = (e) => {
  // 图片加载失败时隐藏图片元素
  e.target.style.display = 'none'
}
</script>

<style scoped>
.glass-card {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.glass-card:hover {
  border-color: rgba(96, 165, 250, 0.3);
  box-shadow: 0 8px 32px rgba(96, 165, 250, 0.2);
}
</style>
