<template>
  <div class="grid-bg min-h-screen relative">
    <!-- 导航栏 -->
    <SiteNav />

    <!-- 页面标题 -->
    <header class="relative py-12 px-4 hero-gradient mt-16">
      <div class="max-w-4xl mx-auto">
        <NuxtLink to="/diary" class="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-6">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          返回日记
        </NuxtLink>

        <h1 class="font-display text-3xl md:text-5xl font-bold mb-4">
          <span class="neon-text text-cyan-400">编辑日记</span>
        </h1>
        <p class="text-gray-400">修改你的游戏日记</p>
      </div>
    </header>

    <!-- 加载状态 -->
    <div v-if="loading" class="py-12 text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      <p class="text-gray-400 mt-4">加载中...</p>
    </div>

    <!-- 日记表单 -->
    <section v-else class="py-12 px-4">
      <div class="max-w-4xl mx-auto">
        <form @submit.prevent="updateDiary" class="space-y-6">
          <!-- 日期 -->
          <div>
            <label class="block text-white font-medium mb-2">日期 *</label>
            <input
              v-model="diaryForm.date"
              type="date"
              class="w-full px-4 py-3 bg-black/30 border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
              required
            />
          </div>

          <!-- 标题 -->
          <div>
            <label class="block text-white font-medium mb-2">标题 *</label>
            <input
              v-model="diaryForm.title"
              type="text"
              placeholder="例如：第一次通关黑魂3的感动"
              class="w-full px-4 py-3 bg-black/30 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-colors"
              required
            />
          </div>

          <!-- 关联游戏 -->
          <div>
            <label class="block text-white font-medium mb-2">关联游戏（可选）</label>
            <div v-if="!showGameSearch" class="flex gap-4">
              <button
                type="button"
                @click="showGameSearch = true"
                class="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 rounded-lg transition-all text-sm"
              >
                + 选择游戏
              </button>
              <div v-if="selectedGame" class="flex items-center gap-3">
                <img :src="selectedGame.cover" class="w-12 h-8 object-cover rounded" />
                <span class="text-white">{{ selectedGame.title }}</span>
                <button
                  type="button"
                  @click="clearSelectedGame"
                  class="text-gray-400 hover:text-red-400"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- 游戏搜索 -->
            <div v-if="showGameSearch" class="glass-card p-6 rounded-2xl">
              <div class="flex gap-2 mb-4">
                <input
                  v-model="gameSearchQuery"
                  type="text"
                  placeholder="搜索游戏库..."
                  class="flex-1 px-4 py-2 bg-black/30 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                  @input="searchGames"
                />
                <button
                  type="button"
                  @click="showGameSearch = false"
                  class="px-4 py-2 text-gray-400 hover:text-white"
                >
                  取消
                </button>
              </div>

              <!-- 游戏列表 -->
              <div v-if="filteredGames.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
                <button
                  v-for="game in filteredGames"
                  :key="game.id"
                  type="button"
                  @click="selectGame(game)"
                  class="p-2 rounded-lg bg-black/30 hover:bg-cyan-500/20 border border-cyan-500/20 transition-all text-left"
                >
                  <img :src="game.cover" class="w-full aspect-video object-cover rounded mb-2" />
                  <p class="text-white text-sm truncate">{{ game.title }}</p>
                </button>
              </div>
              <p v-else-if="gameSearchQuery" class="text-gray-400 text-center py-4">未找到相关游戏</p>
              <p v-else class="text-gray-400 text-center py-4">请输入关键词搜索游戏</p>
            </div>
          </div>

          <!-- 描述 -->
          <div>
            <label class="block text-white font-medium mb-2">日记内容 *</label>
            <textarea
              v-model="diaryForm.description"
              rows="8"
              placeholder="记录今天的游戏体验..."
              class="w-full px-4 py-3 bg-black/30 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
              required
            ></textarea>
          </div>

          <!-- 提交按钮 -->
          <div class="flex gap-4">
            <button
              type="submit"
              :disabled="saving"
              class="flex-1 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ saving ? '保存中...' : '保存修改' }}
            </button>
            <NuxtLink
              to="/diary"
              class="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
            >
              取消
            </NuxtLink>
          </div>

          <!-- 删除按钮 -->
          <button
            type="button"
            @click="confirmDelete"
            class="w-full px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded-lg transition-colors"
          >
            删除日记
          </button>
        </form>

        <!-- 错误提示 -->
        <div v-if="error" class="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {{ error }}
        </div>

        <!-- 成功提示 -->
        <div v-if="success" class="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
          ✓ 日记保存成功！
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const diaryId = route.query.id

const loading = ref(true)
const diaryForm = ref({
  date: '',
  title: '',
  description: ''
})

const games = ref([])
const filteredGames = ref([])
const selectedGame = ref(null)
const showGameSearch = ref(false)
const gameSearchQuery = ref('')
const saving = ref(false)
const error = ref('')
const success = ref(false)

// 加载日记详情和游戏列表
onMounted(async () => {
  try {
    // 加载游戏列表
    const gamesResponse = await fetch('/api/games')
    games.value = await gamesResponse.json()
    filteredGames.value = games.value

    // 加载日记详情
    if (!diaryId) {
      error.value = '缺少日记 ID'
      loading.value = false
      return
    }

    const diaryResponse = await fetch(`/api/diaries/${diaryId}`)
    if (!diaryResponse.ok) {
      throw new Error('日记不存在')
    }
    const diary = await diaryResponse.json()

    diaryForm.value = {
      date: diary.date,
      title: diary.title,
      description: diary.description
    }

    // 设置已选游戏
    if (diary.game_id) {
      selectedGame.value = {
        id: diary.game_id,
        title: diary.game_title,
        cover: diary.game_cover
      }
    }
  } catch (err) {
    error.value = err.message || '加载日记失败'
  } finally {
    loading.value = false
  }
})

// 搜索游戏
const searchGames = () => {
  if (!gameSearchQuery.value.trim()) {
    filteredGames.value = games.value
    return
  }
  const query = gameSearchQuery.value.toLowerCase()
  filteredGames.value = games.value.filter(game =>
    game.title.toLowerCase().includes(query)
  )
}

// 选择游戏
const selectGame = (game) => {
  selectedGame.value = game
  showGameSearch.value = false
  gameSearchQuery.value = ''
}

// 清除已选游戏
const clearSelectedGame = () => {
  selectedGame.value = null
}

// 更新日记
const updateDiary = async () => {
  saving.value = true
  error.value = ''
  success.value = false

  try {
    const response = await fetch(`/api/diaries/${diaryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: diaryForm.value.date,
        title: diaryForm.value.title,
        description: diaryForm.value.description,
        gameId: selectedGame.value?.id || null
      })
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || '保存失败')
    }

    success.value = true

    setTimeout(() => {
      success.value = false
    }, 3000)
  } catch (err) {
    error.value = err.message || '保存失败，请重试'
  } finally {
    saving.value = false
  }
}

// 确认删除
const confirmDelete = async () => {
  if (!confirm('确定要删除这篇日记吗？此操作不可恢复。')) {
    return
  }

  try {
    const response = await fetch(`/api/diaries/${diaryId}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('删除失败')
    }

    router.push('/diary')
  } catch (err) {
    error.value = err.message || '删除失败，请重试'
  }
}
</script>
