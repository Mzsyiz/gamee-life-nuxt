<template>
  <div class="grid-bg min-h-screen relative">
    <!-- 导航栏 -->
    <SiteNav />

    <!-- 页面标题 -->
    <header class="relative py-12 px-4 hero-gradient mt-16">
      <div class="max-w-4xl mx-auto">
        <NuxtLink to="/games" class="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-6">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          返回游戏库
        </NuxtLink>

        <h1 class="font-display text-3xl md:text-5xl font-bold mb-4">
          <span class="neon-text text-cyan-400">游戏入库</span>
        </h1>
        <p class="text-gray-400">添加新游戏到你的收藏</p>
      </div>
    </header>

    <!-- 入库方式选择 -->
    <section class="py-12 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="grid md:grid-cols-2 gap-6 mb-12">
          <button
            @click="inputMethod = 'steam'"
            class="glass-card p-8 rounded-2xl transition-all"
            :class="inputMethod === 'steam' ? 'border-2 border-cyan-500 bg-cyan-500/10' : 'hover:bg-white/5'"
          >
            <div class="text-center">
              <div class="inline-block p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
                <svg class="w-12 h-12 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Steam 游戏入库</h3>
              <p class="text-gray-400 text-sm">通过 Steam ID 或 URL 自动获取游戏信息</p>
            </div>
          </button>

          <button
            @click="inputMethod = 'manual'"
            class="glass-card p-8 rounded-2xl transition-all"
            :class="inputMethod === 'manual' ? 'border-2 border-purple-500 bg-purple-500/10' : 'hover:bg-white/5'"
          >
            <div class="text-center">
              <div class="inline-block p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-4">
                <svg class="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">手动输入信息</h3>
              <p class="text-gray-400 text-sm">手动填写游戏标题、封面和描述</p>
            </div>
          </button>
        </div>

        <!-- Steam 入库表单 -->
        <div v-if="inputMethod === 'steam'" class="glass-card p-8 rounded-2xl">
          <h3 class="text-2xl font-bold text-cyan-400 mb-6">Steam 游戏信息</h3>

          <form @submit.prevent="fetchSteamGame" class="space-y-6">
            <div>
              <label class="block text-white font-medium mb-2">Steam ID 或 URL</label>
              <input
                v-model="steamInput"
                type="text"
                placeholder="例如: 1942660 或 https://store.steampowered.com/app/1942660/"
                class="w-full px-4 py-3 bg-black/30 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-colors"
                required
              />
              <p class="text-gray-400 text-sm mt-2">输入 Steam 游戏的 ID 或完整 URL</p>
            </div>

            <div v-if="steamGameData" class="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <h4 class="text-white font-medium mb-3">预览</h4>
              <div class="flex gap-4">
                <img :src="steamGameData.cover" alt="" class="w-32 h-auto rounded" />
                <div>
                  <p class="text-white font-bold">{{ steamGameData.title }}</p>
                  <p class="text-gray-400 text-sm mt-1">{{ steamGameData.description }}</p>
                </div>
              </div>
            </div>

            <div class="flex gap-4">
              <button
                type="submit"
                :disabled="loading"
                class="flex-1 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ loading ? '获取中...' : '获取游戏信息' }}
              </button>
              <button
                v-if="steamGameData"
                type="button"
                @click="saveGame"
                class="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
              >
                保存到游戏库
              </button>
            </div>
          </form>

          <div v-if="error" class="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {{ error }}
          </div>
        </div>

        <!-- 手动入库表单 -->
        <div v-if="inputMethod === 'manual'" class="glass-card p-8 rounded-2xl">
          <h3 class="text-2xl font-bold text-purple-400 mb-6">手动输入游戏信息</h3>

          <form @submit.prevent="saveManualGame" class="space-y-6">
            <div>
              <label class="block text-white font-medium mb-2">游戏标题 *</label>
              <input
                v-model="manualGame.title"
                type="text"
                placeholder="例如: 塞尔达传说：旷野之息"
                class="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label class="block text-white font-medium mb-2">封面图片 URL *</label>
              <input
                v-model="manualGame.cover"
                type="url"
                placeholder="https://example.com/cover.jpg"
                class="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label class="block text-white font-medium mb-2">游戏描述</label>
              <textarea
                v-model="manualGame.description"
                rows="4"
                placeholder="简单描述这款游戏..."
                class="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors resize-none"
              ></textarea>
            </div>

            <div v-if="manualGame.cover" class="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <h4 class="text-white font-medium mb-3">封面预览</h4>
              <img :src="manualGame.cover" alt="" class="w-full max-w-md rounded" @error="handlePreviewError" />
            </div>

            <button
              type="submit"
              class="w-full px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors"
            >
              保存到游戏库
            </button>
          </form>
        </div>

        <!-- 成功提示 -->
        <div v-if="success" class="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 flex items-center justify-between">
          <span>✓ 游戏已成功添加到游戏库！</span>
          <NuxtLink to="/games" class="text-green-300 hover:text-green-200 underline">查看游戏库</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const inputMethod = ref('steam')
const steamInput = ref('')
const steamGameData = ref(null)
const loading = ref(false)
const error = ref('')
const success = ref(false)

const manualGame = ref({
  title: '',
  cover: '',
  description: ''
})

watch(inputMethod, (method) => {
  error.value = ''
  success.value = false

  if (method === 'steam') {
    manualGame.value = { title: '', cover: '', description: '' }
  } else {
    steamGameData.value = null
    steamInput.value = ''
    loading.value = false
  }
})

// 从 Steam URL 或 ID 提取 App ID
const extractSteamId = (input) => {
  const urlMatch = input.match(/\/app\/(\d+)/)
  if (urlMatch) return urlMatch[1]
  return input.trim()
}

// 获取 Steam 游戏信息
const fetchSteamGame = async () => {
  loading.value = true
  error.value = ''
  steamGameData.value = null

  try {
    const steamId = extractSteamId(steamInput.value)

    if (!/^\d+$/.test(steamId)) {
      throw new Error('请输入正确的 Steam AppID 或 URL')
    }

    steamGameData.value = await $fetch('/api/games/steam', {
      method: 'POST',
      body: {
        appId: steamId
      }
    })
  } catch (err) {
    error.value = err?.data?.message || err?.message || '获取游戏信息失败，请检查 Steam ID 是否正确'
  } finally {
    loading.value = false
  }
}

// 保存 Steam 游戏
const saveGame = async () => {
  if (!steamGameData.value) return

  try {
    const response = await fetch('/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: steamGameData.value.title,
        cover: steamGameData.value.cover,
        steamId: steamGameData.value.steamId,
        description: steamGameData.value.description
      })
    })

    if (!response.ok) throw new Error('保存失败')

    success.value = true
    steamInput.value = ''
    steamGameData.value = null

    setTimeout(() => {
      success.value = false
    }, 5000)
  } catch (err) {
    error.value = '保存失败，请重试'
  }
}

// 保存手动输入的游戏
const saveManualGame = async () => {
  try {
    const response = await fetch('/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: manualGame.value.title,
        cover: manualGame.value.cover,
        description: manualGame.value.description || ''
      })
    })

    if (!response.ok) throw new Error('保存失败')

    success.value = true
    manualGame.value = { title: '', cover: '', description: '' }

    setTimeout(() => {
      success.value = false
    }, 5000)
  } catch (err) {
    error.value = '保存失败，请重试'
  }
}

const handlePreviewError = (e) => {
  e.target.src = 'https://via.placeholder.com/460x215/1a1a2e/ffffff?text=Invalid+Image'
}
</script>
