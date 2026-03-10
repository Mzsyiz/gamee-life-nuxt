<template>
  <nav class="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center">
            <span class="text-xl">🎮</span>
          </div>
          <span class="font-display text-xl font-bold text-white group-hover:text-cyan-400 transition-colors hidden sm:block">
            游戏人生
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-2">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="px-4 py-2 rounded-lg transition-all group relative"
            :class="isActive(item.path) ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'"
          >
            <div class="flex items-center gap-2">
              <component :is="item.icon" class="w-5 h-5" :class="item.iconColor" />
              <span class="font-medium">{{ item.label }}</span>
            </div>
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition-all duration-200"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="mobileMenuOpen" class="md:hidden mt-4 space-y-2">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="mobileMenuOpen = false"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
            :class="isActive(item.path) ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'"
          >
            <component :is="item.icon" class="w-5 h-5" :class="item.iconColor" />
            <span class="font-medium">{{ item.label }}</span>
          </NuxtLink>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, h } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileMenuOpen = ref(false)

const navItems = [
  {
    label: '首页',
    path: '/',
    iconColor: 'text-cyan-400',
    icon: () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
    ])
  },
  {
    label: '游戏库',
    path: '/games',
    iconColor: 'text-purple-400',
    icon: () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' })
    ])
  },
  {
    label: '游戏日记',
    path: '/diary',
    iconColor: 'text-pink-400',
    icon: () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' })
    ])
  }
]

const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>
