<script setup>
import { onMounted, ref } from 'vue'

const visible = ref(!sessionStorage.getItem('splashShown'))
const glowStyle = ref({ opacity: '0', width: '300px', height: '300px' })
const textStyle = ref({ opacity: '0', transform: 'translateY(10px)' })
const taglineStyle = ref({ opacity: '0', transform: 'translateY(8px)' })

onMounted(() => {
  if (visible.value) {
    sessionStorage.setItem('splashShown', 'true')

    setTimeout(() => {
      glowStyle.value = { opacity: '1', width: '300px', height: '300px' }
      textStyle.value = { opacity: '1', transform: 'translateY(0)' }
      taglineStyle.value = { opacity: '1', transform: 'translateY(0)' }
    }, 300)

    setTimeout(() => {
      glowStyle.value = { opacity: '1', width: '600px', height: '600px' }
    }, 900)

    setTimeout(() => {
      visible.value = false
    }, 2200)
  }
})
</script>

<template>
  <Transition name="splash-fade">
    <div v-if="visible" class="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0f172a]">
      <div class="absolute rounded-full transition-all duration-1000" :style="{
        ...glowStyle,
        background:
          'radial-gradient(circle, rgba(224,122,95,0.15) 0%, rgba(224,122,95,0.05) 50%, transparent 70%)',
      }"></div>
      <div class="relative z-[2] flex flex-col items-center gap-4">
        <div
          class="w-20 h-20 rounded-[1.25rem] bg-gradient-to-br from-teal to-teal-light flex items-center justify-center vt-logo"
          style="
            box-shadow:
              0 0 40px rgba(224, 122, 95, 0.3),
              0 0 80px rgba(224, 122, 95, 0.1);
            animation: splashPulse 1.5s ease-in-out infinite;
          ">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            <path
              d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
            <path d="m18 15-2-2" />
            <path d="m15 18-2-2" />
          </svg>
        </div>
        <div class="font-jakarta text-[1.75rem] font-extrabold text-white tracking-tight transition-all duration-500"
          :style="textStyle">
          Nemenin
        </div>
        <div class="font-jakarta text-[0.85rem] text-white/50 transition-all duration-500" :style="taglineStyle">
          Ruang aman untuk merasa ditemani
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.splash-fade-leave-active {
  transition: opacity 0.6s ease;
}

.splash-fade-leave-to {
  opacity: 0;
}
</style>
