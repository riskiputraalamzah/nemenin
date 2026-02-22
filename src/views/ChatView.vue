<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowLeft,
  BadgeCheck,
  Video,
  Phone,
  Info,
  Clock,
  Paperclip,
  Send,
  ShieldCheck,
} from 'lucide-vue-next'

const router = useRouter()

const messages = ref([
  {
    id: 1,
    sender: 'companion',
    text: 'Halo Arya! 👋 Selamat datang di sesi kita hari ini. Apa kabar?',
    time: '14:00',
  },
  {
    id: 2,
    sender: 'user',
    text: 'Hai Sari! Aku baik, cuma akhir-akhir ini lagi agak overwhelmed sama kerjaan 😅',
    time: '14:01',
  },
  {
    id: 3,
    sender: 'companion',
    text: 'Aku mengerti perasaanmu. Merasa overwhelmed itu wajar kok, apalagi kalau banyak yang harus dikerjakan sekaligus. Mau cerita lebih lanjut tentang apa yang bikin kamu overwhelmed?',
    time: '14:02',
  },
  {
    id: 4,
    sender: 'user',
    text: 'Iya, jadi ada beberapa project deadline bareng semua minggu ini. Terus aku juga ngerasa kurang support dari tim...',
    time: '14:03',
  },
  {
    id: 5,
    sender: 'companion',
    text: 'Terima kasih sudah mau berbagi, Arya. Pasti berat ya handle semuanya sendiri. Kamu sudah coba ngomong ke tim soal ini?',
    time: '14:05',
  },
])

const newMessage = ref('')
const isTyping = ref(false)
const chatMessagesRef = ref(null)
const msgInputRef = ref(null)

const sessionSeconds = ref(932)
let timerInterval = null

const formattedTimer = ref('00:15:32')

const updateTimer = () => {
  sessionSeconds.value++
  const h = Math.floor(sessionSeconds.value / 3600)
    .toString()
    .padStart(2, '0')
  const m = Math.floor((sessionSeconds.value % 3600) / 60)
    .toString()
    .padStart(2, '0')
  const s = (sessionSeconds.value % 60).toString().padStart(2, '0')
  formattedTimer.value = `${h}:${m}:${s}`
}

const scrollToBottom = () => {
  nextTick(() => {
    if (chatMessagesRef.value) {
      chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight + 100
    }
  })
}

onMounted(() => {
  timerInterval = setInterval(updateTimer, 1000)
  scrollToBottom()
})

onUnmounted(() => {
  clearInterval(timerInterval)
})

const handleKey = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

const adjustTextareaHeight = () => {
  if (!msgInputRef.value) return
  msgInputRef.value.style.height = 'auto'
  msgInputRef.value.style.height = Math.min(msgInputRef.value.scrollHeight, 120) + 'px'
}

const sendMessage = () => {
  const text = newMessage.value.trim()
  if (!text) return

  const now = new Date()
  const time =
    now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0')

  messages.value.push({
    id: Date.now(),
    sender: 'user',
    text: text,
    time: time,
  })

  newMessage.value = ''
  adjustTextareaHeight()
  scrollToBottom()

  // Simulate typing
  setTimeout(() => {
    isTyping.value = true
    scrollToBottom()
  }, 800)

  setTimeout(() => {
    isTyping.value = false
    const replies = [
      'Terima kasih sudah berbagi itu. Aku di sini untuk mendengarkan.',
      'Aku mengerti perasaanmu. Mau cerita lebih banyak?',
      'Itu pasti tidak mudah. Bagaimana kamu menanganinya selama ini?',
      'Kamu tidak sendirian dalam hal ini. Ayo kita bahas bersama.',
      'Itu sangat berani. Teruslah berbicara, aku mendengarkan.',
    ]
    const reply = replies[Math.floor(Math.random() * replies.length)]
    messages.value.push({
      id: Date.now() + 1,
      sender: 'companion',
      text: reply,
      time: time,
    })
    scrollToBottom()
  }, 2500)
}

const endSession = () => {
  if (confirm('Yakin ingin mengakhiri sesi ini?')) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <div class="font-jakarta bg-[#0F172A] text-slate-100 h-screen flex flex-col overflow-hidden">
    <!-- Chat Header -->
    <header
      class="shrink-0 backdrop-blur-xl bg-navy/80 border-b border-navy-border px-4 sm:px-6 py-3"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <router-link to="/dashboard" class="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft class="w-5 h-5" />
          </router-link>
          <div
            class="w-10 h-10 rounded-full bg-gradient-to-br from-peach to-peach-dark flex items-center justify-center text-white font-bold"
          >
            S
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-bold text-sm">Sari Dewi</h2>
              <BadgeCheck class="w-3.5 h-3.5 text-teal-light" />
            </div>
            <p class="text-xs text-emerald-400 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
              Online · Sesi aktif
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="p-2 rounded-lg hover:bg-navy-light text-slate-400 transition-colors bg-transparent border-none cursor-pointer"
            title="Panggilan Video"
          >
            <Video class="w-5 h-5" />
          </button>
          <button
            class="p-2 rounded-lg hover:bg-navy-light text-slate-400 transition-colors bg-transparent border-none cursor-pointer"
            title="Panggilan Suara"
          >
            <Phone class="w-5 h-5" />
          </button>
          <button
            class="p-2 rounded-lg hover:bg-navy-light text-slate-400 transition-colors bg-transparent border-none cursor-pointer"
            title="Info Sesi"
          >
            <Info class="w-5 h-5" />
          </button>
          <button
            @click="endSession"
            class="ml-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border-none cursor-pointer text-xs font-semibold hover:bg-red-500/20 transition-colors"
          >
            Akhiri Sesi
          </button>
        </div>
      </div>
      <!-- Session timer -->
      <div class="flex items-center justify-center mt-2 gap-2 text-xs text-slate-500">
        <Clock class="w-3 h-3" />
        <span>Sesi berjalan: </span>
        <span class="font-mono text-teal-light font-semibold">{{ formattedTimer }}</span>
        <span class="text-slate-600">·</span>
        <span>Durasi: 60 menit</span>
      </div>
    </header>

    <!-- Chat Messages Area -->
    <div ref="chatMessagesRef" class="chat-area flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
      <!-- System message -->
      <div class="text-center">
        <span
          class="inline-block px-4 py-1.5 rounded-full bg-navy-light border border-navy-border text-xs text-slate-400"
        >
          Sesi dimulai · Hari ini, 14:00 WIB
        </span>
      </div>

      <!-- Messages Loop -->
      <div v-for="msg in messages" :key="msg.id">
        <!-- Companion Message -->
        <div
          v-if="msg.sender === 'companion'"
          class="flex gap-3"
          style="animation: fadeInUp 0.3s ease"
        >
          <div
            class="w-8 h-8 rounded-full bg-gradient-to-br from-peach to-peach-dark flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1"
          >
            S
          </div>
          <div>
            <div
              class="chat-bubble bg-navy-card border border-navy-border rounded-2xl rounded-tl-md px-4 py-3"
            >
              <p class="text-sm">{{ msg.text }}</p>
            </div>
            <span class="text-xs text-slate-500 mt-1 ml-1 block">{{ msg.time }}</span>
          </div>
        </div>

        <!-- User Message -->
        <div v-else class="flex gap-3 justify-end" style="animation: fadeInUp 0.3s ease">
          <div>
            <div
              class="chat-bubble bg-gradient-to-br from-teal to-teal-dark rounded-2xl rounded-tr-md px-4 py-3 text-white"
            >
              <p class="text-sm">{{ msg.text }}</p>
            </div>
            <span class="text-xs text-slate-500 mt-1 mr-1 block text-right">{{ msg.time }}</span>
          </div>
          <div
            class="w-8 h-8 rounded-full bg-gradient-to-br from-teal to-teal-light flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1"
          >
            A
          </div>
        </div>
      </div>

      <!-- Typing indicator -->
      <div v-if="isTyping" class="flex gap-3" style="animation: fadeInUp 0.3s ease">
        <div
          class="w-8 h-8 rounded-full bg-gradient-to-br from-peach to-peach-dark flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1"
        >
          S
        </div>
        <div class="bg-navy-card border border-navy-border rounded-2xl rounded-tl-md px-4 py-3">
          <div class="flex gap-1.5 items-center">
            <span
              class="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
              style="animation-delay: 0s"
            ></span>
            <span
              class="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
              style="animation-delay: 0.15s"
            ></span>
            <span
              class="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
              style="animation-delay: 0.3s"
            ></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Input -->
    <div class="shrink-0 border-t border-navy-border bg-navy/80 backdrop-blur-xl px-4 sm:px-6 py-3">
      <div class="flex items-end gap-3">
        <button
          class="p-2 rounded-lg hover:bg-navy-light text-slate-400 transition-colors shrink-0 bg-transparent border-none cursor-pointer"
        >
          <Paperclip class="w-5 h-5" />
        </button>
        <div class="flex-1 relative">
          <textarea
            ref="msgInputRef"
            v-model="newMessage"
            rows="1"
            placeholder="Ketik pesan..."
            class="form-input pr-12 resize-none min-h-[44px] max-h-[120px]"
            @keydown="handleKey"
            @input="adjustTextareaHeight"
          >
          </textarea>
        </div>
        <button
          @click="sendMessage"
          class="p-2.5 rounded-xl border-none cursor-pointer bg-gradient-to-r from-teal to-teal-light text-white hover:shadow-lg hover:shadow-teal/30 transition-all shrink-0"
        >
          <Send class="w-5 h-5" />
        </button>
      </div>
      <p class="text-center text-xs text-slate-600 mt-2">
        <ShieldCheck class="w-3 h-3 inline" />
        Percakapan bersifat privat dan dilindungi oleh kebijakan kerahasiaan Nemenin
      </p>
    </div>
  </div>
</template>

<style scoped>
.chat-area {
  height: calc(100vh - 140px);
}

.chat-bubble {
  max-width: 75%;
  word-break: break-word;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .chat-area {
    height: calc(100vh - 130px);
  }
}
</style>
