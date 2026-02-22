<script setup>
import { RouterView, useRouter } from 'vue-router'
import SplashScreen from '@/components/SplashScreen.vue'

const router = useRouter()

// View Transitions API — smooth cross-fade between pages
router.beforeResolve(async (to, from) => {
  // Skip transition for same-page hash navigation
  if (to.path === from.path && to.hash) return

  // If browser doesn't support View Transitions, just scroll to top
  if (!document.startViewTransition) {
    if (!to.hash) window.scrollTo({ top: 0 })
    return
  }

  // Use View Transition: the callback fires when the new DOM is ready
  await new Promise((resolve) => {
    const transition = document.startViewTransition(() => {
      // Scroll to top INSIDE the transition so it's part of the animation
      if (!to.hash) window.scrollTo({ top: 0 })
      resolve()
    })
  })
})
</script>

<template>
  <SplashScreen />
  <RouterView />
</template>

<style>
/* No scoped styles needed — everything is in global style.css */
</style>
