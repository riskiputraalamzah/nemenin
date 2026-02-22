<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { HeartHandshake } from 'lucide-vue-next'
</script>

<template>
    <div
        class="font-jakarta bg-[#0F172A] text-slate-100 min-h-[100dvh] flex items-center justify-center relative overflow-hidden">
        <!-- Background Decor (Persists across Auth routes) -->
        <div class="hero-blob w-96 h-96 bg-teal/20 -top-32 -right-16 absolute"></div>
        <div class="hero-blob w-72 h-72 bg-peach/15 bottom-10 left-10 absolute" style="animation-delay: -4s"></div>
        <div class="absolute inset-0 bg-gradient-to-br from-peach/5 via-transparent to-teal/5 pointer-events-none">
        </div>

        <div class="w-full flex flex-col items-center px-4 py-8 relative z-10 min-h-screen justify-center">
            <!-- Shared Logo Area -->
            <div class="text-center mb-8 relative z-20">
                <RouterLink to="/"
                    class="inline-flex items-center gap-2 text-2xl font-bold text-white no-underline hover:scale-105 transition-transform">
                    <div
                        class="w-10 h-10 rounded-lg bg-gradient-to-br from-teal to-peach flex items-center justify-center shadow-lg shadow-teal/20 vt-logo">
                        <HeartHandshake class="w-6 h-6 text-white" />
                    </div>
                    <span class="tracking-tight">Nemenin</span>
                </RouterLink>
            </div>

            <!-- Nested Route Transition -->
            <div class="w-full relative flex justify-center">
                <RouterView v-slot="{ Component, route }">
                    <transition name="auth-slide" mode="out-in">
                        <component :is="Component" :key="route.name" />
                    </transition>
                </RouterView>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Scoped to AuthLayout if needed, animations in global */
.vt-logo {
    view-transition-name: logo;
}
</style>
