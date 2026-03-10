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

      <div class="max-w-6xl mx-auto relative z-10">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="text-center md:text-left">
            <div class="inline-block p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-6">
              <span class="text-5xl">🎮</span>
            </div>
            <h1 class="font-display text-4xl md:text-6xl font-bold mb-4">
              <span class="neon-text text-purple-400">游戏库</span>
            </h1>
            <p class="text-gray-400 text-lg">我的游戏收藏 · 共 {{ totalGames }} 款游戏</p>
          </div>

          <NuxtLink
            to="/admin/add-game"
            class="glass-card px-6 py-3 rounded-xl hover:bg-purple-500/20 transition-all group flex items-center gap-2"
          >
            <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            <span class="text-white font-medium group-hover:text-purple-300 transition-colors">游戏入库</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- 游戏网格 -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="game in paginatedGames"
            :key="game.id"
            class="glass-card rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 group cursor-pointer"
          >
            <!-- 游戏封面 -->
            <div class="relative aspect-[460/215] overflow-hidden">
              <img
                :src="game.cover"
                :alt="game.title"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                @error="handleImageError"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <!-- 游戏信息 -->
            <div class="p-4">
              <h3 class="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{{ game.title }}</h3>
              <p class="text-gray-400 text-sm mb-3">{{ game.description }}</p>
              <div class="flex items-center justify-between text-xs text-gray-500">
                <span>{{ formatDate(game.created_at || game.addedAt) }}</span>
                <span v-if="game.steamId" class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                  Steam
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div v-if="totalPages > 1" class="mt-12 flex justify-center items-center gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="glass-card px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-500/20 transition-colors"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <div class="flex gap-2">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              class="glass-card px-4 py-2 rounded-lg transition-colors"
              :class="currentPage === page ? 'bg-purple-500/30 text-purple-300' : 'hover:bg-purple-500/20 text-white'"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="glass-card px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-500/20 transition-colors"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const games = ref([])
const currentPage = ref(1)
const pageSize = 9

const totalGames = computed(() => games.value.length)
const totalPages = computed(() => Math.ceil(games.value.length / pageSize))

const paginatedGames = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return games.value.slice(start, end)
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''

  const date = new Date(dateStr)

  if (Number.isNaN(date.getTime())) return ''

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/460x215/1a1a2e/ffffff?text=Game+Cover'
}

onMounted(async () => {
  try {
    // 从数据库 API 加载游戏数据
    const response = await fetch('/api/games')
    games.value = await response.json()
  } catch (error) {
    console.error('加载游戏数据失败:', error)
  }
})
</script>
