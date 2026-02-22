<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  HeartHandshake,
  Menu,
  X,
  Home,
  Sparkles,
  Route,
  Tag,
  LogIn,
  ArrowRight,
} from 'lucide-vue-next'

const scrolled = ref(false)
const mobileOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 50
}
function openNav() {
  mobileOpen.value = true
  document.body.style.overflow = 'hidden'
}
function closeNav() {
  mobileOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav id="navbar" class="navbar" :class="{ scrolled }">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="navbar-inner flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2.5 text-lg font-bold text-white no-underline shrink-0">
          <div
            class="w-9 h-9 rounded-xl bg-gradient-to-br from-teal to-peach flex items-center justify-center shadow-lg shadow-teal/20 vt-logo">
            <HeartHandshake class="w-5 h-5 text-white" />
          </div>
          <span class="tracking-tight">Nemenin</span>
        </RouterLink>

        <div
          class="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/[0.06] rounded-full px-1.5 py-1">
          <RouterLink to="/" class="nav-link-pill">Beranda</RouterLink>
          <RouterLink :to="{ path: '/', hash: '#features' }" class="nav-link-pill">Fitur</RouterLink>
          <RouterLink :to="{ path: '/', hash: '#how' }" class="nav-link-pill">Cara Kerja</RouterLink>
          <RouterLink :to="{ path: '/', hash: '#pricing' }" class="nav-link-pill">Harga</RouterLink>
        </div>

        <div class="hidden md:flex items-center gap-3 shrink-0">
          <RouterLink to="/login" class="text-sm text-slate-300 hover:text-white font-medium transition-colors">Masuk
          </RouterLink>
          <RouterLink to="/register" class="nav-cta-btn">Daftar Gratis
            <ArrowRight class="w-4 h-4" />
          </RouterLink>
        </div>

        <button @click="openNav"
          class="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.1] transition-all">
          <Menu class="w-5 h-5" />
        </button>
      </div>
    </div>
  </nav>

  <!-- Mobile Nav -->
  <div class="mobile-nav-backdrop" :class="{ open: mobileOpen }" @click="closeNav"></div>
  <div class="mobile-nav-drawer" :class="{ open: mobileOpen }">
    <div class="flex items-center justify-between mb-8">
      <RouterLink to="/" class="flex items-center gap-2 text-lg font-bold text-white no-underline" @click="closeNav">
        <div
          class="w-8 h-8 rounded-lg bg-gradient-to-br from-teal to-peach flex items-center justify-center vt-mobile-logo">
          <HeartHandshake class="w-4 h-4 text-white" />
        </div>
        <span>Nemenin</span>
      </RouterLink>
      <button @click="closeNav"
        class="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.08] text-slate-400 hover:text-white transition-all">
        <X class="w-5 h-5" />
      </button>
    </div>
    <div class="flex flex-col gap-1">
      <RouterLink to="/" class="mobile-nav-link" @click="closeNav">
        <Home class="w-5 h-5 text-teal-light" /> Beranda
      </RouterLink>
      <RouterLink :to="{ path: '/', hash: '#features' }" class="mobile-nav-link" @click="closeNav">
        <Sparkles class="w-5 h-5 text-teal-light" /> Fitur
      </RouterLink>
      <RouterLink :to="{ path: '/', hash: '#how' }" class="mobile-nav-link" @click="closeNav">
        <Route class="w-5 h-5 text-teal-light" /> Cara Kerja
      </RouterLink>
      <RouterLink :to="{ path: '/', hash: '#pricing' }" class="mobile-nav-link" @click="closeNav">
        <Tag class="w-5 h-5 text-teal-light" /> Harga
      </RouterLink>
    </div>
    <div class="mt-auto pt-6 flex flex-col gap-3 border-t border-white/[0.06]">
      <RouterLink to="/login" @click="closeNav"
        class="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-slate-200 font-semibold text-sm hover:bg-white/[0.1] transition-all">
        <LogIn class="w-4 h-4" /> Masuk
      </RouterLink>
      <RouterLink to="/register" @click="closeNav" class="nav-cta-btn justify-center w-full">Daftar Gratis
        <ArrowRight class="w-4 h-4" />
      </RouterLink>
    </div>
  </div>
</template>
