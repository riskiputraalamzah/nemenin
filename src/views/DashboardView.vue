<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  HeartHandshake,
  LayoutDashboard,
  Search,
  CalendarCheck,
  Crown,
  Settings,
  LogOut,
  Menu,
  Bell,
  Users,
  Calendar,
  Clock,
  BadgeCheck,
  Activity,
  MessageCircle,
  CalendarPlus,
  UserPlus,
  Star,
  Edit,
  Video,
  X,
  Camera,
  Pencil,
  Upload,
  User,
  Landmark,
  Save,
  Zap,
  Check,
} from 'lucide-vue-next'

const router = useRouter()

// Reactive State
const activeTab = ref('beranda')
const mobileMenuOpen = ref(false)
const activeSessionTab = ref('active')
const photoPreview = ref(
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%231E293B' width='100' height='100'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='%2314B8A6' font-size='40' font-family='sans-serif'%3EA%3C/text%3E%3C/svg%3E",
)
const showToast = ref(false)

const tabTitles = {
  beranda: 'Beranda',
  discovery: 'Cari Counselor',
  sessions: 'Sesi Saya',
  upgrade: 'Upgrade Premium',
  settings: 'Pengaturan',
}

const pageTitle = computed(() => tabTitles[activeTab.value])

// Methods
const setTab = (tab) => {
  activeTab.value = tab
  closeMobileSidebar()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const openMobileSidebar = () => {
  mobileMenuOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeMobileSidebar = () => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const handlePhotoUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (ev) => {
      photoPreview.value = ev.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleSettingsSave = (e) => {
  e.preventDefault()
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const handleLogout = () => {
  if (confirm('Yakin ingin keluar?')) {
    router.push('/login')
  }
}
</script>

<template>
  <div class="font-jakarta bg-[#0F172A] text-slate-100 min-h-screen">
    <!-- Sidebar Overlay (mobile) -->
    <div
      class="sidebar-overlay"
      :class="{ open: mobileMenuOpen }"
      @click="closeMobileSidebar"
    ></div>

    <!-- ============================================================
             SIDEBAR
             ============================================================ -->
    <aside class="sidebar flex flex-col" :class="{ open: mobileMenuOpen }">
      <!-- Logo -->
      <div class="p-6 pb-4">
        <router-link
          to="/"
          class="flex items-center gap-2 text-lg font-bold text-white no-underline"
        >
          <div
            class="w-9 h-9 rounded-lg bg-gradient-to-br from-teal to-peach flex items-center justify-center vt-mobile-logo"
          >
            <HeartHandshake class="w-5 h-5 text-white" />
          </div>
          <span>Nemenin</span>
        </router-link>
      </div>

      <!-- User Info -->
      <div class="px-5 pb-4">
        <div class="flex items-center gap-3 p-3 rounded-xl bg-navy/50 border border-navy-border">
          <div
            class="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-peach flex items-center justify-center text-white font-bold text-sm"
          >
            A
          </div>
          <div class="min-w-0">
            <p class="text-sm font-semibold truncate">Arya Pratama</p>
            <p class="text-xs text-slate-400 flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
              Akun Reguler
            </p>
          </div>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 py-2">
        <p class="px-6 text-xs text-slate-500 font-semibold mb-2 uppercase tracking-wider">Menu</p>
        <a
          href="#"
          class="sidebar-link"
          :class="{ active: activeTab === 'beranda' }"
          @click.prevent="setTab('beranda')"
        >
          <LayoutDashboard class="w-5 h-5" /> Beranda
        </a>
        <a
          href="#"
          class="sidebar-link"
          :class="{ active: activeTab === 'discovery' }"
          @click.prevent="setTab('discovery')"
        >
          <Search class="w-5 h-5" /> Cari Counselor
        </a>
        <a
          href="#"
          class="sidebar-link"
          :class="{ active: activeTab === 'sessions' }"
          @click.prevent="setTab('sessions')"
        >
          <CalendarCheck class="w-5 h-5" /> Sesi Saya
        </a>
        <a
          href="#"
          class="sidebar-link"
          :class="{ active: activeTab === 'upgrade' }"
          @click.prevent="setTab('upgrade')"
        >
          <Crown class="w-5 h-5" /> Upgrade Premium
        </a>

        <p class="px-6 text-xs text-slate-500 font-semibold mt-6 mb-2 uppercase tracking-wider">
          Akun
        </p>
        <a
          href="#"
          class="sidebar-link"
          :class="{ active: activeTab === 'settings' }"
          @click.prevent="setTab('settings')"
        >
          <Settings class="w-5 h-5" /> Pengaturan
        </a>
      </nav>

      <!-- Logout -->
      <div class="p-4">
        <button
          @click="handleLogout"
          class="sidebar-link text-red-400 w-full hover:text-red-300 hover:bg-red-500/10 cursor-pointer text-left border-none bg-transparent"
        >
          <LogOut class="w-5 h-5" /> Keluar
        </button>
      </div>
    </aside>

    <!-- ============================================================
             MAIN CONTENT
             ============================================================ -->
    <main class="dashboard-main min-h-screen">
      <!-- Top Bar -->
      <header
        class="sticky top-0 z-50 backdrop-blur-xl bg-navy/80 border-b border-navy-border px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <button
            @click="openMobileSidebar"
            class="mobile-menu-btn p-2 rounded-lg hover:bg-navy-light text-slate-400 cursor-pointer lg:hidden border-none bg-transparent"
          >
            <Menu class="w-5 h-5" />
          </button>
          <h1 class="text-lg font-bold">{{ pageTitle }}</h1>
        </div>
        <div class="flex items-center gap-3">
          <button
            class="relative p-2 rounded-lg hover:bg-navy-light text-slate-400 transition-colors cursor-pointer border-none bg-transparent"
          >
            <Bell class="w-5 h-5" />
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-peach rounded-full"></span>
          </button>
          <div
            class="w-8 h-8 rounded-full bg-gradient-to-br from-teal to-peach flex items-center justify-center text-white font-bold text-xs"
          >
            A
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <div class="p-4 sm:p-6 lg:p-8">
        <!-- ======== PANEL: BERANDA ======== -->
        <div
          v-if="activeTab === 'beranda'"
          class="tab-panel"
          style="animation: fadeInUp 0.4s ease forwards"
        >
          <!-- Welcome -->
          <div class="glass-card p-6 sm:p-8 mb-8 relative overflow-hidden">
            <div
              class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-teal/10 to-transparent rounded-bl-full pointer-events-none"
            ></div>
            <div class="relative z-10">
              <h2 class="text-2xl font-bold mb-2">
                Selamat datang, <span class="text-gradient">Arya!</span> 👋
              </h2>
              <p class="text-slate-400 max-w-lg">
                Kamu tidak sendirian. Temukan teman cerita yang siap mendengarkan kamu hari ini.
              </p>
              <button
                @click="setTab('discovery')"
                class="btn-primary mt-4 inline-flex text-sm cursor-pointer border-none"
              >
                <Search class="w-4 h-4" /> Cari Counselor
              </button>
            </div>
          </div>

          <!-- Stats Cards -->
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div class="dash-stat-card">
              <div class="flex items-center justify-between mb-3">
                <span class="text-sm text-slate-400">Counselor Online</span>
                <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Users class="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <p class="text-2xl font-bold">24</p>
              <p class="text-xs text-emerald-400 mt-1">+3 dari kemarin</p>
            </div>
            <div class="dash-stat-card">
              <div class="flex items-center justify-between mb-3">
                <span class="text-sm text-slate-400">Total Sesi</span>
                <div class="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center">
                  <Calendar class="w-4 h-4 text-teal-light" />
                </div>
              </div>
              <p class="text-2xl font-bold">5</p>
              <p class="text-xs text-slate-400 mt-1">Bulan ini</p>
            </div>
            <div class="dash-stat-card">
              <div class="flex items-center justify-between mb-3">
                <span class="text-sm text-slate-400">Jam Ditemani</span>
                <div class="w-8 h-8 rounded-lg bg-peach/10 flex items-center justify-center">
                  <Clock class="w-4 h-4 text-peach" />
                </div>
              </div>
              <p class="text-2xl font-bold">8.5</p>
              <p class="text-xs text-slate-400 mt-1">Jam total</p>
            </div>
            <div class="dash-stat-card">
              <div class="flex items-center justify-between mb-3">
                <span class="text-sm text-slate-400">Status Akun</span>
                <div class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <BadgeCheck class="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <p class="text-lg font-bold text-peach">Reguler</p>
              <p
                class="text-xs text-teal-light mt-1 cursor-pointer hover:underline"
                @click="setTab('upgrade')"
              >
                Upgrade →
              </p>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="glass-card p-6">
            <h3 class="font-bold mb-4 flex items-center gap-2">
              <Activity class="w-4 h-4 text-teal-light" /> Aktivitas Terbaru
            </h3>
            <div class="space-y-3">
              <div class="flex items-start gap-4 p-3 rounded-xl hover:bg-navy/30 transition-colors">
                <div
                  class="w-10 h-10 shrink-0 rounded-full bg-teal/10 flex items-center justify-center"
                >
                  <MessageCircle class="w-4 h-4 text-teal-light" />
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-medium">
                    Sesi online dengan <span class="text-teal-light">Sari Dewi</span> selesai
                  </p>
                  <p class="text-xs text-slate-500">2 jam lalu · 60 menit · Online</p>
                </div>
              </div>
              <div class="flex items-start gap-4 p-3 rounded-xl hover:bg-navy/30 transition-colors">
                <div
                  class="w-10 h-10 shrink-0 rounded-full bg-peach/10 flex items-center justify-center"
                >
                  <CalendarPlus class="w-4 h-4 text-peach" />
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-medium">
                    Sesi baru dijadwalkan dengan <span class="text-peach">Andi Pratama</span>
                  </p>
                  <p class="text-xs text-slate-500">Kemarin · Offline · Kafe Teman, Jakarta</p>
                </div>
              </div>
              <div class="flex items-start gap-4 p-3 rounded-xl hover:bg-navy/30 transition-colors">
                <div
                  class="w-10 h-10 shrink-0 rounded-full bg-emerald-500/10 flex items-center justify-center"
                >
                  <UserPlus class="w-4 h-4 text-emerald-400" />
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-medium">Akun berhasil dibuat</p>
                  <p class="text-xs text-slate-500">3 hari lalu</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ======== PANEL: CARI COUNSELOR ======== -->
        <div
          v-if="activeTab === 'discovery'"
          class="tab-panel"
          style="animation: fadeInUp 0.4s ease forwards"
        >
          <!-- Search Bar -->
          <div class="flex flex-col sm:flex-row gap-4 mb-6">
            <div class="flex-1 relative">
              <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari berdasarkan nama, keahlian..."
                class="form-input pl-10"
              />
            </div>
            <div class="flex gap-2">
              <button class="tab-btn active">Semua</button>
              <button class="tab-btn">Online</button>
              <button class="tab-btn">Offline</button>
            </div>
          </div>

          <!-- Companion Grid -->
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Companion 1 -->
            <div class="companion-card">
              <div class="p-5">
                <div class="flex items-start gap-4 mb-4">
                  <div
                    class="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center text-white text-xl font-bold shrink-0"
                  >
                    A
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <h4 class="font-bold text-sm truncate">Andi Pratama</h4>
                      <BadgeCheck class="w-4 h-4 text-teal-light shrink-0" />
                    </div>
                    <div class="online-badge online">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                      Online
                    </div>
                  </div>
                </div>
                <p class="text-slate-400 text-xs leading-relaxed mb-4">
                  Pendengar yang baik dan berempati. Siap menemani kamu dalam suasana apa pun.
                </p>
                <div class="flex flex-wrap gap-1.5 mb-4">
                  <span class="text-xs bg-teal/10 text-teal-light px-2 py-0.5 rounded-full"
                    >mendengarkan</span
                  >
                  <span class="text-xs bg-teal/10 text-teal-light px-2 py-0.5 rounded-full"
                    >motivasi</span
                  >
                </div>
                <div class="flex items-center justify-between pt-3 border-t border-navy-border">
                  <div>
                    <p class="text-xs text-slate-500">Mulai dari</p>
                    <p class="text-sm font-bold text-peach">
                      Rp 50.000<span class="text-xs text-slate-400 font-normal">/jam</span>
                    </p>
                  </div>
                  <div class="flex items-center gap-1 text-xs text-amber-400">
                    <Star class="w-3 h-3 fill-current" /> 4.85 (128)
                  </div>
                </div>
                <router-link to="/chat" class="btn-primary w-full justify-center text-sm mt-4">
                  <MessageCircle class="w-4 h-4" /> Mulai Sesi
                </router-link>
              </div>
            </div>

            <!-- Companion 2 -->
            <div class="companion-card">
              <div class="p-5">
                <div class="flex items-start gap-4 mb-4">
                  <div
                    class="w-14 h-14 rounded-2xl bg-gradient-to-br from-peach to-peach-dark flex items-center justify-center text-white text-xl font-bold shrink-0"
                  >
                    S
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <h4 class="font-bold text-sm truncate">Sari Dewi</h4>
                      <BadgeCheck class="w-4 h-4 text-teal-light shrink-0" />
                    </div>
                    <div class="online-badge online">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                      Online
                    </div>
                  </div>
                </div>
                <p class="text-slate-400 text-xs leading-relaxed mb-4">
                  Psikologi lulusan UI. Passionate di bidang kesehatan mental dan empati.
                </p>
                <div class="flex flex-wrap gap-1.5 mb-4">
                  <span class="text-xs bg-peach/10 text-peach px-2 py-0.5 rounded-full"
                    >konseling ringan</span
                  >
                  <span class="text-xs bg-peach/10 text-peach px-2 py-0.5 rounded-full"
                    >empati</span
                  >
                </div>
                <div class="flex items-center justify-between pt-3 border-t border-navy-border">
                  <div>
                    <p class="text-xs text-slate-500">Mulai dari</p>
                    <p class="text-sm font-bold text-peach">
                      Rp 75.000<span class="text-xs text-slate-400 font-normal">/jam</span>
                    </p>
                  </div>
                  <div class="flex items-center gap-1 text-xs text-amber-400">
                    <Star class="w-3 h-3 fill-current" /> 4.92 (96)
                  </div>
                </div>
                <router-link to="/chat" class="btn-primary w-full justify-center text-sm mt-4">
                  <MessageCircle class="w-4 h-4" /> Mulai Sesi
                </router-link>
              </div>
            </div>

            <!-- Companion 3 -->
            <div class="companion-card">
              <div class="p-5">
                <div class="flex items-start gap-4 mb-4">
                  <div
                    class="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shrink-0"
                  >
                    R
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <h4 class="font-bold text-sm truncate">Rizki Amanah</h4>
                      <BadgeCheck class="w-4 h-4 text-teal-light shrink-0" />
                    </div>
                    <div class="online-badge offline">
                      <span class="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block"></span>
                      Offline
                    </div>
                  </div>
                </div>
                <p class="text-slate-400 text-xs leading-relaxed mb-4">
                  Suka ngobrol dan menemani. Tempatku adalah tempat ceritamu.
                </p>
                <div class="flex flex-wrap gap-1.5 mb-4">
                  <span class="text-xs bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded-full"
                    >teman ngobrol</span
                  >
                  <span class="text-xs bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded-full"
                    >curhat</span
                  >
                </div>
                <div class="flex items-center justify-between pt-3 border-t border-navy-border">
                  <div>
                    <p class="text-xs text-slate-500">Mulai dari</p>
                    <p class="text-sm font-bold text-peach">
                      Rp 45.000<span class="text-xs text-slate-400 font-normal">/jam</span>
                    </p>
                  </div>
                  <div class="flex items-center gap-1 text-xs text-amber-400">
                    <Star class="w-3 h-3 fill-current" /> 4.78 (74)
                  </div>
                </div>
                <button class="btn-secondary w-full justify-center text-sm mt-4 cursor-pointer">
                  <Calendar class="w-4 h-4" /> Jadwalkan Sesi
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ======== PANEL: SESI SAYA ======== -->
        <div
          v-if="activeTab === 'sessions'"
          class="tab-panel"
          style="animation: fadeInUp 0.4s ease forwards"
        >
          <!-- Session Tabs -->
          <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              class="session-tab-btn tab-btn"
              :class="{ active: activeSessionTab === 'active' }"
              @click="activeSessionTab = 'active'"
            >
              Aktif
            </button>
            <button
              class="session-tab-btn tab-btn"
              :class="{ active: activeSessionTab === 'upcoming' }"
              @click="activeSessionTab = 'upcoming'"
            >
              Mendatang
            </button>
            <button
              class="session-tab-btn tab-btn"
              :class="{ active: activeSessionTab === 'completed' }"
              @click="activeSessionTab = 'completed'"
            >
              Selesai
            </button>
          </div>

          <!-- Active Sessions -->
          <div
            v-if="activeSessionTab === 'active'"
            class="session-panel space-y-4"
            style="animation: fadeInUp 0.3s ease forwards"
          >
            <div class="session-card flex flex-col sm:flex-row sm:items-center gap-4">
              <div class="flex items-center gap-4 flex-1 min-w-0">
                <div
                  class="w-12 h-12 rounded-xl bg-gradient-to-br from-peach to-peach-dark flex items-center justify-center text-white font-bold shrink-0"
                >
                  S
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <h4 class="font-bold text-sm">Sari Dewi</h4>
                    <span class="session-badge active">Aktif</span>
                  </div>
                  <p class="text-xs text-slate-400 mt-1">Online · Dimulai 15 menit lalu</p>
                </div>
              </div>
              <div class="flex gap-2 sm:shrink-0">
                <router-link to="/chat" class="btn-primary text-xs py-2 px-4 cursor-pointer">
                  <Video class="w-3 h-3" /> Lanjutkan
                </router-link>
                <button
                  class="btn-secondary text-xs py-2 px-4 text-red-400 border-red-400 hover:bg-red-500/10 cursor-pointer"
                >
                  Akhiri
                </button>
              </div>
            </div>
          </div>

          <!-- Upcoming Sessions -->
          <div
            v-if="activeSessionTab === 'upcoming'"
            class="session-panel space-y-4"
            style="animation: fadeInUp 0.3s ease forwards"
          >
            <div class="session-card flex flex-col sm:flex-row sm:items-center gap-4">
              <div class="flex items-center gap-4 flex-1 min-w-0">
                <div
                  class="w-12 h-12 rounded-xl bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center text-white font-bold shrink-0"
                >
                  A
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <h4 class="font-bold text-sm">Andi Pratama</h4>
                    <span class="session-badge upcoming">Mendatang</span>
                  </div>
                  <p class="text-xs text-slate-400 mt-1">
                    Offline · Besok, 14:00 WIB · Kafe Teman, Jakarta
                  </p>
                </div>
              </div>
              <div class="flex gap-2 sm:shrink-0">
                <button class="btn-secondary text-xs py-2 px-4 cursor-pointer">
                  <Edit class="w-3 h-3" /> Ubah Jadwal
                </button>
                <button
                  class="btn-secondary text-xs py-2 px-4 text-red-400 border-red-400 hover:bg-red-500/10 cursor-pointer"
                >
                  Batalkan
                </button>
              </div>
            </div>
          </div>

          <!-- Completed Sessions -->
          <div
            v-if="activeSessionTab === 'completed'"
            class="session-panel space-y-4"
            style="animation: fadeInUp 0.3s ease forwards"
          >
            <div class="session-card flex flex-col sm:flex-row sm:items-center gap-4 opacity-75">
              <div class="flex items-center gap-4 flex-1 min-w-0">
                <div
                  class="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center text-white font-bold shrink-0"
                >
                  M
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <h4 class="font-bold text-sm">Maya Lestari</h4>
                    <span class="session-badge completed">Selesai</span>
                  </div>
                  <p class="text-xs text-slate-400 mt-1">
                    Online · 18 Feb 2026 · 45 menit · Rp 45.000
                  </p>
                </div>
              </div>
              <div class="flex gap-2 sm:shrink-0">
                <button class="btn-secondary text-xs py-2 px-4 cursor-pointer">
                  <Star class="w-3 h-3" /> Beri Rating
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ======== PANEL: UPGRADE PREMIUM ======== -->
        <div
          v-if="activeTab === 'upgrade'"
          class="tab-panel"
          style="animation: fadeInUp 0.4s ease forwards"
        >
          <div class="max-w-3xl mx-auto">
            <div
              class="glass-card pricing-card featured p-8 sm:p-10 text-center mb-8 relative overflow-hidden"
            >
              <div class="pricing-badge">Upgrade</div>
              <div
                class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-peach to-peach-dark flex items-center justify-center mb-6"
              >
                <Crown class="w-8 h-8 text-white" />
              </div>
              <h2 class="text-2xl font-bold mb-2">
                Upgrade ke <span class="text-gradient">Premium</span>
              </h2>
              <p class="text-slate-400 mb-6 max-w-md mx-auto">
                Dapatkan akses penuh ke semua fitur Nemenin dan nikmati pengalaman terbaik.
              </p>
              <div class="mb-8">
                <span class="text-5xl font-extrabold text-gradient">Rp 99.000</span>
                <span class="text-slate-400"> / 6 bulan</span>
              </div>

              <div class="text-left max-w-lg mx-auto mb-8">
                <div class="grid grid-cols-[1fr,auto,auto] gap-x-8 gap-y-3 text-sm">
                  <div class="font-semibold text-slate-300">Fitur</div>
                  <div class="font-semibold text-slate-400 text-center">Reguler</div>
                  <div class="font-semibold text-teal-light text-center">Premium</div>

                  <div class="text-slate-400">Visibilitas Katalog</div>
                  <div class="text-center text-slate-500">Terbatas</div>
                  <div class="text-center text-teal-light">Unlimited</div>

                  <div class="text-slate-400">Konsultasi Online</div>
                  <div class="text-center">
                    <Check class="w-4 h-4 text-teal-light inline" />
                  </div>
                  <div class="text-center">
                    <Check class="w-4 h-4 text-teal-light inline" />
                  </div>

                  <div class="text-slate-400">Konsultasi Offline</div>
                  <div class="text-center text-slate-500">Berbayar</div>
                  <div class="text-center text-teal-light font-bold">Gratis</div>

                  <div class="text-slate-400">Masa Aktif</div>
                  <div class="text-center text-slate-500">1 bulan</div>
                  <div class="text-center text-teal-light">6 bulan</div>

                  <div class="text-slate-400">Komunikasi WA</div>
                  <div class="text-center">
                    <X class="w-4 h-4 text-red-400 inline" />
                  </div>
                  <div class="text-center">
                    <Check class="w-4 h-4 text-teal-light inline" />
                  </div>

                  <div class="text-slate-400">Event & Couple Matching</div>
                  <div class="text-center">
                    <X class="w-4 h-4 text-red-400 inline" />
                  </div>
                  <div class="text-center">
                    <Check class="w-4 h-4 text-teal-light inline" />
                  </div>
                </div>
              </div>
              <button class="btn-primary text-base px-8 cursor-pointer border-none">
                <Zap class="w-5 h-5" /> Upgrade Sekarang
              </button>
              <p class="text-xs text-slate-500 mt-3">
                Pembayaran aman melalui payment gateway terpercaya
              </p>
            </div>
          </div>
        </div>

        <!-- ======== PANEL: PENGATURAN ======== -->
        <div
          v-if="activeTab === 'settings'"
          class="tab-panel"
          style="animation: fadeInUp 0.4s ease forwards"
        >
          <div class="max-w-2xl">
            <form @submit="handleSettingsSave" class="space-y-8">
              <!-- Profile Photo -->
              <div class="glass-card p-6">
                <h3 class="font-bold mb-4 flex items-center gap-2">
                  <Camera class="w-4 h-4 text-teal-light" /> Foto Profil
                </h3>
                <div class="flex items-center gap-6">
                  <div class="relative">
                    <img
                      :src="photoPreview"
                      alt="Profile"
                      class="w-20 h-20 rounded-2xl object-cover border-2 border-navy-border"
                    />
                    <div
                      class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-teal flex items-center justify-center"
                    >
                      <Pencil class="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <label
                      for="photo-upload"
                      class="btn-secondary text-xs py-2 px-4 cursor-pointer inline-flex"
                    >
                      <Upload class="w-3 h-3" /> Unggah Foto
                    </label>
                    <input
                      type="file"
                      id="photo-upload"
                      accept="image/*"
                      class="hidden"
                      @change="handlePhotoUpload"
                    />
                    <p class="text-xs text-slate-500 mt-2">
                      Foto akan otomatis dikonversi ke versi kartun oleh AI
                    </p>
                  </div>
                </div>
              </div>

              <!-- Personal Info -->
              <div class="glass-card p-6">
                <h3 class="font-bold mb-4 flex items-center gap-2">
                  <User class="w-4 h-4 text-teal-light" /> Informasi Pribadi
                </h3>
                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="form-label">Nama Lengkap</label>
                    <input type="text" value="Arya Pratama" class="form-input" />
                  </div>
                  <div>
                    <label class="form-label">Email</label>
                    <input type="email" value="arya@email.com" class="form-input" />
                  </div>
                  <div>
                    <label class="form-label">No. Telepon</label>
                    <input type="tel" value="081234567890" class="form-input" />
                  </div>
                  <div>
                    <label class="form-label">No. KTP</label>
                    <input
                      type="text"
                      value="320101••••••0001"
                      class="form-input"
                      placeholder="Nomor KTP"
                    />
                  </div>
                  <div class="sm:col-span-2">
                    <label class="form-label">Alamat</label>
                    <textarea rows="2" class="form-input" placeholder="Alamat lengkap">
Jakarta Selatan, DKI Jakarta</textarea
                    >
                  </div>
                </div>
              </div>

              <!-- Bank Account -->
              <div class="glass-card p-6">
                <h3 class="font-bold mb-4 flex items-center gap-2">
                  <Landmark class="w-4 h-4 text-teal-light" /> Rekening Bank
                </h3>
                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="form-label">Nama Bank</label>
                    <select class="form-input">
                      <option>BCA</option>
                      <option>BNI</option>
                      <option>BRI</option>
                      <option>Mandiri</option>
                      <option>CIMB Niaga</option>
                      <option>Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label class="form-label">Nomor Rekening</label>
                    <input type="text" class="form-input" placeholder="Nomor rekening" />
                  </div>
                  <div class="sm:col-span-2">
                    <label class="form-label">Nama Pemilik Rekening</label>
                    <input type="text" value="Arya Pratama" class="form-input" />
                  </div>
                </div>
              </div>

              <!-- Save Button -->
              <div class="flex justify-end">
                <button type="submit" class="btn-primary cursor-pointer border-none">
                  <Save class="w-4 h-4" /> Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div
        v-if="showToast"
        class="fixed bottom-8 right-8 bg-gradient-to-br from-teal to-teal-light text-white px-6 py-4 rounded-xl shadow-2xl z-[9999] font-semibold flex items-center gap-3"
      >
        <Check class="w-5 h-5" /> Profil berhasil disimpan!
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Sidebar / Layout styling exists in global CSS */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
