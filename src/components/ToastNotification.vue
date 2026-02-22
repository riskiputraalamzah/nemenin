<script setup>
import { ref, watch } from 'vue'
import { Check, AlertCircle, Info } from 'lucide-vue-next'

const props = defineProps({
    show: { type: Boolean, default: false },
    message: { type: String, default: '' },
    type: { type: String, default: 'success' }, // success | error | info
    duration: { type: Number, default: 3000 },
})

const emit = defineEmits(['close'])

const visible = ref(false)

watch(
    () => props.show,
    (val) => {
        if (val) {
            visible.value = true
            if (props.duration > 0) {
                setTimeout(() => {
                    visible.value = false
                    emit('close')
                }, props.duration)
            }
        } else {
            visible.value = false
        }
    },
)

const iconMap = { success: Check, error: AlertCircle, info: Info }
const gradientMap = {
    success: 'from-teal to-teal-light',
    error: 'from-red-500 to-red-400',
    info: 'from-peach to-peach-light',
}
</script>

<template>
    <Transition name="toast-slide">
        <div v-if="visible"
            class="fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-white font-semibold text-sm"
            :class="`bg-gradient-to-r ${gradientMap[type]}`">
            <component :is="iconMap[type]" class="w-5 h-5 shrink-0" />
            <span>{{ message }}</span>
        </div>
    </Transition>
</template>

<style scoped>
.toast-slide-enter-active,
.toast-slide-leave-active {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-slide-enter-from {
    opacity: 0;
    transform: translateX(100px);
}

.toast-slide-leave-to {
    opacity: 0;
    transform: translateX(100px);
}
</style>
