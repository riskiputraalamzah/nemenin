<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import FooterSection from '@/components/FooterSection.vue'
import {
  Sparkles,
  Star,
  ShieldCheck,
  Lock,
  Users,
  Heart,
  Search,
  User,
  MessageCircle,
  MessageCircleHeart,
  PartyPopper,
  Clapperboard,
  Gamepad2,
  ArrowRight,
  Shield,
  BadgeCheck,
  Check,
  CircleDot,
  LayoutGrid,
  HeartPulse,
  Brain,
  CloudRain,
  HandHeart,
  Phone,
  Compass,
  UserPlus,
  Tag,
  Quote,
  HelpCircle,
  ChevronDown,
  Rocket,
  Crown,
  UserCheck,
  MessageSquareHeart,
  X as XIcon,
} from 'lucide-vue-next'

const typewriterText = ref('')
const counterHero = ref(0)

// Typewriter
const phrases = ['merasa ditemani', 'didengarkan', 'berbagi cerita', 'tidak sendirian']
let phraseIdx = 0,
  charIdx = 0,
  isDeleting = false

function typewrite() {
  const current = phrases[phraseIdx]
  if (isDeleting) {
    charIdx--
    typewriterText.value = current.substring(0, charIdx)
  } else {
    charIdx++
    typewriterText.value = current.substring(0, charIdx)
  }
  let delay = isDeleting ? 40 : 80
  if (!isDeleting && charIdx === current.length) {
    delay = 2000
    isDeleting = true
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false
    phraseIdx = (phraseIdx + 1) % phrases.length
    delay = 400
  }
  setTimeout(typewrite, delay)
}

// FAQ
const activeFaq = ref(-1)
function toggleFaq(i) {
  activeFaq.value = activeFaq.value === i ? -1 : i
}

const faqItems = [
  {
    q: 'Apa bedanya Nemenin dengan aplikasi kencan?',
    a: 'Nemenin bukan aplikasi kencan atau pacaran. Nemenin adalah platform pendampingan emosional dan sosial — kamu bisa menemukan teman bicara, pendamping ke acara sosial, atau seseorang yang hadir agar kamu tidak merasa sendiri. Semua interaksi memiliki batasan yang jelas, beretika, dan profesional.',
  },
  {
    q: 'Apakah data pribadi saya aman?',
    a: 'Sangat aman. Data KTP dan informasi pribadi kamu dienkripsi dengan standar keamanan tertinggi. Kami tidak pernah membagikan data pengguna ke pihak ketiga. Setiap counselor juga melewati verifikasi identitas dan background check.',
  },
  {
    q: 'Berapa biaya menggunakan Nemenin?',
    a: 'Kamu bisa mendaftar dan menggunakan konsultasi online secara gratis. Untuk fitur premium seperti konsultasi offline, komunikasi langsung via WhatsApp, dan couple matching, tersedia paket Premium seharga Rp 99.000 / 6 bulan.',
  },
  {
    q: 'Siapa saja yang bisa menjadi counselor?',
    a: 'Siapa pun yang memiliki empati dan kemauan untuk mendengarkan bisa mendaftar sebagai counselor. Setiap calon counselor akan melewati proses verifikasi identitas, background check, dan pelatihan empati dasar sebelum bisa aktif di platform.',
  },
  {
    q: 'Apakah pertemuan offline aman?',
    a: 'Keamanan adalah prioritas kami. Setiap counselor sudah terverifikasi identitasnya. Untuk pertemuan offline, kami menyarankan bertemu di tempat umum, dan fitur notifikasi darurat tersedia untuk kenyamanan kamu.',
  },
  {
    q: 'Siapa yang cocok menggunakan Nemenin?',
    a: 'Siapa pun — mahasiswa yang butuh teman cerita, pekerja yang merasa burnout, orang tua yang kesepian, atau siapa saja yang ingin didengar tanpa dihakimi. Nemenin terbuka untuk semua usia dan latar belakang.',
  },
  {
    q: 'Apa bedanya Nemenin dengan layanan konseling profesional?',
    a: 'Nemenin bukan layanan konseling medis atau psikiatri. Kami menyediakan pendampingan emosional dan sosial — tempat untuk didengar, ditemani, dan berbagi cerita. Jika kamu membutuhkan bantuan klinis, kami akan mereferensikan ke profesional yang tepat.',
  },
]

const testimonials = [
  {
    text: '"Aku cuma butuh didengar tanpa dihakimi. Di Nemenin, aku nemu counselor yang bener-bener paham rasanya overthinking. Sekarang aku nggak ngerasa sendiri lagi."',
    name: 'Sarah D.',
    role: 'Mahasiswa, 21 tahun',
    img: 'photo-1517841905240-472988babdf9',
  },
  {
    text: '"Sebagai orang yang fokus karier, aku nggak punya waktu buat curhat ke temen. Nemenin jadi tempat aman buat ngeluarin semua beban pikiran tanpa takut di-judge."',
    name: 'Budi P.',
    role: 'Profesional, 28 tahun',
    img: 'photo-1500648767791-00dcc994a43e',
  },
  {
    text: '"Pertama kali coba, aku minta counselor nemenin ke acara kantor. Ternyata nggak awkward sama sekali — profesional, sopan, dan bisa diajak ngobrol. Sekarang jadi langganan."',
    name: 'Rini S.',
    role: 'Ibu rumah tangga, 35 tahun',
    img: 'photo-1544005313-94ddf0286df2',
  },
  {
    text: '"Jadi counselor di Nemenin mengajarkan aku bahwa banyak orang hanya butuh didengar. Bukan dinasihati, bukan diarahkan — cukup hadir dan mendengarkan. Itu sudah cukup."',
    name: 'Kak Dimas',
    role: 'Counselor Nemenin, 26 tahun',
    img: 'photo-1507003211169-0a1dd7228f2d',
  },
]

// Counter
function formatNumber(num, suffix) {
  if (num >= 1000000) return (num / 1000000).toFixed(2).replace('.', ',') + ' jt' + suffix
  return num.toLocaleString('id-ID') + suffix
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target)
  const suffix = el.dataset.suffix || ''
  const duration = 2000,
    start = performance.now()
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 4)
    el.textContent = formatNumber(Math.floor(ease * target), suffix)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

// Cursor glow
let glowEl = null

onMounted(() => {
  typewrite()

  // Scroll reveal
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('active')
          obs.unobserve(e.target)
        }
      })
    },
    { rootMargin: '0px 0px -80px 0px', threshold: 0.1 },
  )
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => obs.observe(el))

  // Shield items
  const shieldList = document.getElementById('shield-list')
  if (shieldList) {
    const so = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            shieldList.querySelectorAll('.shield-item').forEach((item) => {
              setTimeout(() => item.classList.add('visible'), parseInt(item.dataset.delay || 0))
            })
            so.unobserve(shieldList)
          }
        })
      },
      { threshold: 0.3 },
    )
    so.observe(shieldList)
  }

  // Chat bubbles
  const chatDemo = document.getElementById('chat-demo')
  if (chatDemo) {
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            chatDemo
              .querySelectorAll('.chat-bubble, .typing-indicator')
              .forEach((el) => el.classList.add('animate'))
            co.unobserve(chatDemo)
          }
        })
      },
      { threshold: 0.3 },
    )
    co.observe(chatDemo)
  }

  // Steps
  const stepsFlow = document.querySelector('.steps-flow')
  if (stepsFlow) {
    const sto = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            stepsFlow
              .querySelectorAll('.step-item')
              .forEach((s, i) => setTimeout(() => s.classList.add('visible'), i * 250))
            sto.unobserve(stepsFlow)
          }
        })
      },
      { threshold: 0.2 },
    )
    sto.observe(stepsFlow)
  }

  // Counters
  const counterEls = document.querySelectorAll('.counter-number')
  if (counterEls.length) {
    const cob = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCounter(e.target)
            cob.unobserve(e.target)
          }
        })
      },
      { threshold: 0.5 },
    )
    counterEls.forEach((el) => cob.observe(el))
  }



  // Parallax
  if (window.innerWidth > 768) {
    const pels = document.querySelectorAll('[data-parallax]')
    if (pels.length) {
      let ticking = false
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            pels.forEach((el) => {
              el.style.transform = `translateY(${window.scrollY * parseFloat(el.dataset.parallax)}px)`
            })
            ticking = false
          })
          ticking = true
        }
      })
    }
  }

  // Pricing tilt
  document.querySelectorAll('.pricing-card-enhanced').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect(),
        x = e.clientX - r.left,
        y = e.clientY - r.top
      card.style.transform = `perspective(1000px) rotateX(${(y - r.height / 2) / 20}deg) rotateY(${(r.width / 2 - x) / 20}deg) translateY(-8px)`
    })
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)'
    })
  })

  // Cursor glow
  if (!('ontouchstart' in window)) {
    glowEl = document.createElement('div')
    glowEl.style.cssText =
      'position:fixed;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(224,122,95,0.07) 0%,rgba(224,122,95,0.03) 40%,transparent 70%);pointer-events:none;z-index:1;transform:translate(-50%,-50%);opacity:0;transition:opacity 0.4s ease;'
    document.body.appendChild(glowEl)
    let mx = 0,
      my = 0,
      gx = 0,
      gy = 0
    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      glowEl.style.opacity = '1'
    }
    const onLeave = () => {
      if (glowEl) glowEl.style.opacity = '0'
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    const updateGlow = () => {
      gx += (mx - gx) * 0.08
      gy += (my - gy) * 0.08
      if (glowEl) {
        glowEl.style.left = gx + 'px'
        glowEl.style.top = gy + 'px'
      }
      requestAnimationFrame(updateGlow)
    }
    requestAnimationFrame(updateGlow)
  }

  // Magnetic buttons
  document.querySelectorAll('.btn-primary, .nav-cta-btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect()
      btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px, ${(e.clientY - r.top - r.height / 2) * 0.2}px)`
      btn.style.transition = 'transform 0.15s ease'
    })
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)'
      btn.style.transition = 'transform 0.3s ease'
    })
  })
})

onUnmounted(() => {
  if (glowEl) {
    glowEl.remove()
    glowEl = null
  }
})
</script>

<template>
  <NavBar />

  <!-- HERO -->
  <section id="hero" class="hero-gradient relative min-h-screen flex items-center overflow-hidden pt-20">
    <div class="warm-blob w-[500px] h-[500px] bg-teal/20 -top-40 -left-40 absolute" data-parallax="0.3"></div>
    <div class="warm-blob w-[400px] h-[400px] bg-peach/15 bottom-0 right-0 absolute" data-parallax="0.2"></div>
    <div class="warm-blob w-[300px] h-[300px] bg-teal-light/10 top-1/2 left-1/2 absolute" data-parallax="0.15"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div class="relative z-10" style="animation: fadeInLeft 1s ease-out">
          <div class="section-tag">
            <Sparkles class="w-3.5 h-3.5" /> Platform Counselor #1 di Indonesia
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Ruang aman untuk <br /><span class="text-gradient">{{ typewriterText }}</span><span
              class="typewriter-cursor"></span>
          </h1>
          <p class="text-lg text-slate-400 max-w-xl mb-8 leading-relaxed">
            Di dunia yang serba terhubung, justru banyak yang merasa sendiri.
            <strong class="text-slate-200">Nemenin</strong> hadir sebagai ruang aman untuk
            didengar, ditemani, dan dipahami — tanpa dihakimi, tanpa tuntutan relasi.
          </p>
          <div class="flex flex-row gap-3 sm:gap-4">
            <RouterLink to="/register"
              class="btn-primary text-sm sm:text-base py-3 px-4 sm:px-6 whitespace-nowrap flex-1 sm:flex-none justify-center">
              <Heart class="w-4 h-4" /> Buat Profil
            </RouterLink>
            <RouterLink to="/login"
              class="btn-secondary text-sm sm:text-base py-3 px-4 sm:px-6 whitespace-nowrap flex-1 sm:flex-none justify-center">
              Masuk
            </RouterLink>
          </div>
          <div class="flex flex-wrap items-center gap-x-6 gap-y-3 mt-10 text-sm text-slate-500">
            <div class="flex items-center gap-2">
              <ShieldCheck class="w-4 h-4 text-teal-light" /> Terverifikasi
            </div>
            <div class="flex items-center gap-2">
              <Lock class="w-4 h-4 text-teal-light" /> Privasi Terjaga
            </div>
            <div class="flex items-center gap-2">
              <Users class="w-4 h-4 text-teal-light" />
              <span><span data-target="2500" data-suffix="+" class="counter-number">0</span> Pengguna</span>
            </div>
          </div>
        </div>
        <!-- Floating Cards -->
        <div class="relative flex justify-center items-center" style="animation: fadeInRight 1s ease-out 0.3s both">
          <div class="floating-cards-container">
            <div class="floating-card float-card-1">
              <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-teal/30 shrink-0">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                  alt="Rina" class="w-full h-full object-cover" />
              </div>
              <div class="card-info">
                <h4>Rina Kartika</h4>
                <p>Counselor · Online</p>
              </div>
              <div class="card-rating">
                <Star class="w-3.5 h-3.5 inline" /> 4.9
              </div>
            </div>
            <div class="floating-card float-card-2">
              <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-peach/30 shrink-0">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
                  alt="Adi" class="w-full h-full object-cover" />
              </div>
              <div class="card-info">
                <h4>Adi Nugroho</h4>
                <p>Counselor · Offline</p>
              </div>
              <div class="card-rating">
                <Star class="w-3.5 h-3.5 inline" /> 4.8
              </div>
            </div>
            <div class="floating-card float-card-3">
              <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-peach-light/30 shrink-0">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Maya" class="w-full h-full object-cover" />
              </div>
              <div class="card-info">
                <h4>Maya Sari</h4>
                <p>Counselor · Online</p>
              </div>
              <div class="card-rating">
                <Star class="w-3.5 h-3.5 inline" /> 5.0
              </div>
            </div>
            <div class="floating-card float-card-4">
              <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-light/30 shrink-0">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Budi" class="w-full h-full object-cover" />
              </div>
              <div class="card-info">
                <h4>Budi Santoso</h4>
                <p>Counselor · Online</p>
              </div>
              <div class="card-rating">
                <Star class="w-3.5 h-3.5 inline" /> 4.7
              </div>
            </div>
            <div class="absolute w-3 h-3 rounded-full bg-teal/40 top-[20%] left-[45%] animate-pulse"
              data-parallax="0.4"></div>
            <div class="absolute w-2 h-2 rounded-full bg-peach/50 bottom-[25%] right-[30%] animate-pulse"
              style="animation-delay: 1s" data-parallax="0.5"></div>
            <div class="absolute w-4 h-4 rounded-full bg-peach-light/30 top-[60%] left-[40%] animate-pulse"
              style="animation-delay: 2s" data-parallax="0.35"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CATEGORIES -->
  <section class="py-16 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 reveal">
        <div class="section-tag mx-auto w-fit">
          <LayoutGrid class="w-3.5 h-3.5" /> Kategori
        </div>
        <h2 class="text-3xl font-bold mb-4">
          Mau ditemenin <span class="text-gradient">ngapain</span> hari ini?
        </h2>
        <p class="text-slate-400">Pilih aktivitas dan temukan partner yang paling cocok.</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 reveal">
        <!-- Category 1: Curhat -->
        <RouterLink to="/register"
          class="group relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-square flex flex-col justify-end p-5 border border-white/10 hover:border-teal/50 transition-all duration-300 bg-navy-card">
          <div
            class="absolute inset-0 bg-gradient-to-b from-teal/5 via-teal/10 to-teal/90 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
          </div>
          <div
            class="absolute -top-4 -right-4 text-teal/10 group-hover:text-teal/20 transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
            <MessageCircleHeart class="w-32 h-32" />
          </div>
          <div class="absolute top-8 left-8 w-2 h-2 rounded-full bg-teal/40 animate-pulse"></div>
          <div class="absolute top-12 right-12 w-1.5 h-1.5 rounded-full bg-white/30" style="animation-delay: 1s"></div>
          <div class="relative z-20 w-full transform group-hover:translate-y-[-4px] transition-transform duration-300">
            <div
              class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center mb-4 group-hover:bg-teal group-hover:text-white transition-colors shadow-lg">
              <MessageCircleHeart class="w-6 h-6" />
            </div>
            <h3 class="font-bold text-xl leading-tight mb-1.5 text-white">Teman Curhat</h3>
            <p class="text-sm text-slate-300 font-medium">Deep talk & pendengar setia</p>
          </div>
        </RouterLink>

        <!-- Category 2: Kondangan -->
        <RouterLink to="/register"
          class="group relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-square flex flex-col justify-end p-5 border border-white/10 hover:border-peach/50 transition-all duration-300 bg-navy-card">
          <div
            class="absolute inset-0 bg-gradient-to-b from-peach/5 via-peach/10 to-peach/90 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
          </div>
          <div
            class="absolute -top-4 -right-4 text-peach/10 group-hover:text-peach/20 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
            <PartyPopper class="w-32 h-32" />
          </div>
          <div class="absolute top-10 left-6 w-2 h-2 rounded-full bg-peach/40 animate-pulse"></div>
          <div class="relative z-20 w-full transform group-hover:translate-y-[-4px] transition-transform duration-300">
            <div
              class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center mb-4 group-hover:bg-peach group-hover:text-navy transition-colors shadow-lg">
              <PartyPopper class="w-6 h-6" />
            </div>
            <h3 class="font-bold text-xl leading-tight mb-1.5 text-white">Partner Kondangan</h3>
            <p class="text-sm text-slate-300 font-medium">Tampil serasi di acara formal</p>
          </div>
        </RouterLink>

        <!-- Category 3: Movie/Hangout -->
        <RouterLink to="/register"
          class="group relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-square flex flex-col justify-end p-5 border border-white/10 hover:border-warm-sky/50 transition-all duration-300 bg-navy-card">
          <div
            class="absolute inset-0 bg-gradient-to-b from-warm-sky/5 via-warm-sky/10 to-warm-sky/90 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
          </div>
          <div
            class="absolute -top-4 -right-4 text-warm-sky/10 group-hover:text-warm-sky/20 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
            <Clapperboard class="w-32 h-32" />
          </div>
          <div class="absolute top-6 right-8 w-2 h-2 rounded-full bg-warm-sky/40 animate-pulse"></div>
          <div class="relative z-20 w-full transform group-hover:translate-y-[-4px] transition-transform duration-300">
            <div
              class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center mb-4 group-hover:bg-warm-sky group-hover:text-white transition-colors shadow-lg">
              <Clapperboard class="w-6 h-6" />
            </div>
            <h3 class="font-bold text-xl leading-tight mb-1.5 text-white">Movie Buddy</h3>
            <p class="text-sm text-slate-300 font-medium">Nonton & hangout santai</p>
          </div>
        </RouterLink>

        <!-- Category 4: Gamer -->
        <RouterLink to="/register"
          class="group relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-square flex flex-col justify-end p-5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 bg-navy-card">
          <div
            class="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-purple-500/10 to-purple-500/90 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
          </div>
          <div
            class="absolute -top-4 -right-4 text-purple-500/10 group-hover:text-purple-500/20 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
            <Gamepad2 class="w-32 h-32" />
          </div>
          <div class="absolute top-8 left-1/2 w-2 h-2 rounded-full bg-purple-500/40 animate-pulse"></div>
          <div class="relative z-20 w-full transform group-hover:translate-y-[-4px] transition-transform duration-300">
            <div
              class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center mb-4 group-hover:bg-purple-500 group-hover:text-white transition-colors shadow-lg">
              <Gamepad2 class="w-6 h-6" />
            </div>
            <h3 class="font-bold text-xl leading-tight mb-1.5 text-white">Mabar Game</h3>
            <p class="text-sm text-slate-300 font-medium">Push rank anti toxic</p>
          </div>
        </RouterLink>
      </div>

      <!-- Positioning Statement -->
      <div class="mt-12 text-center reveal">
        <p class="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed italic">
          Bukan aplikasi kencan. Bukan konseling medis.<br />
          <span class="text-slate-300 not-italic font-semibold">Nemenin adalah ruang di mana kamu bisa didengar,
            ditemani, dan merasa aman.</span>
        </p>
      </div>
    </div>
  </section>

  <!-- FEATURE 1: Temukan Teman Cerita -->
  <section id="features" class="feature-showcase reveal">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="feature-grid">
        <div>
          <div class="feature-tag">
            <Search class="w-3.5 h-3.5" /> Fitur Utama
          </div>
          <h2 class="feature-title">
            Temukan teman cerita yang <span class="text-gradient">tepat untukmu</span>
          </h2>
          <p class="feature-desc">
            Jelajahi profil counselor terverifikasi. Lihat bio, keahlian, rating, dan ketersediaan
            mereka. Cari berdasarkan topik, lokasi, atau jadwal — semuanya disesuaikan dengan
            kebutuhanmu.
          </p>
          <RouterLink to="/register" class="feature-cta">Mulai Cari
            <ArrowRight class="w-4 h-4" />
          </RouterLink>
        </div>
        <div class="feature-visual flex items-center justify-center">
          <div class="space-y-3 w-full max-w-xs">
            <div class="glass-card p-4 flex items-center gap-3 reveal reveal-delay-1" style="transform: rotate(-1deg)">
              <div class="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-teal/30">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
                  alt="Dr. Anisa" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-bold text-sm">Dr. Anisa</div>
                <div class="text-xs text-slate-400">
                  Psikologi ·
                  <Star class="w-3 h-3 inline text-peach" /> 4.9
                </div>
              </div>
              <div class="w-2 h-2 rounded-full shrink-0 bg-green-400 animate-pulse"></div>
            </div>

            <div class="glass-card p-4 flex items-center gap-3 reveal reveal-delay-2" style="transform: rotate(0.5deg)">
              <div class="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-peach/30">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Kak Dimas" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-bold text-sm">Kak Dimas</div>
                <div class="text-xs text-slate-400">
                  Life Coach ·
                  <Star class="w-3 h-3 inline text-peach" /> 4.8
                </div>
              </div>
              <div class="w-2 h-2 rounded-full shrink-0 bg-green-400 animate-pulse"></div>
            </div>

            <div class="glass-card p-4 flex items-center gap-3 reveal reveal-delay-3"
              style="transform: rotate(-0.5deg)">
              <div class="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-peach-light/30">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                  alt="Mbak Rina" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-bold text-sm">Mbak Rina</div>
                <div class="text-xs text-slate-400">
                  Mentor ·
                  <Star class="w-3 h-3 inline text-peach" /> 4.7
                </div>
              </div>
              <div class="w-2 h-2 rounded-full shrink-0 bg-yellow-400"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURE 2: Chat -->
  <section class="feature-showcase reveal">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="feature-grid reversed">
        <div>
          <div class="feature-tag">
            <MessageCircle class="w-3.5 h-3.5" /> Pengalaman Chat
          </div>
          <h2 class="feature-title">
            Didengarkan dengan <span class="text-gradient">empati</span>
          </h2>
          <p class="feature-desc">
            Bukan chatbot. Kamu bicara dengan manusia sungguhan yang terlatih untuk mendengarkan
            tanpa menghakimi. Cerita apa saja — beban pikiran, kesepian, atau sekadar butuh teman
            bicara.
          </p>
          <RouterLink to="/register" class="feature-cta">Mulai Cerita
            <ArrowRight class="w-4 h-4" />
          </RouterLink>
        </div>
        <div class="feature-visual flex items-center justify-center">
          <div class="chat-demo" id="chat-demo">
            <div class="chat-bubble left">Hai, aku lagi merasa overwhelmed akhir-akhir ini...</div>
            <div class="chat-bubble right">
              Hai! Terima kasih sudah mau cerita. Aku di sini untuk mendengarkan.
            </div>
            <div class="chat-bubble left">Rasanya kayak nggak ada yang ngerti...</div>
            <div class="chat-bubble right">Perasaanmu valid. Yuk, kita ngobrol pelan-pelan ya.</div>
            <div class="typing-indicator">
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURE 3: Security -->
  <section class="feature-showcase reveal">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="feature-grid">
        <div>
          <div class="feature-tag">
            <Shield class="w-3.5 h-3.5" /> Keamanan
          </div>
          <h2 class="feature-title">
            Privasi &amp; keamananmu <span class="text-gradient">terjaga</span>
          </h2>
          <p class="feature-desc">
            Kalau kamu menghargai privasi, tenang saja. Data pribadimu terenkripsi, percakapan
            bersifat rahasia, dan kamu punya kendali penuh atas informasi yang dibagikan.
          </p>
          <RouterLink to="/register" class="feature-cta">Pelajari Keamanan
            <ArrowRight class="w-4 h-4" />
          </RouterLink>
        </div>
        <div class="feature-visual flex items-center justify-center">
          <div class="glass-card p-6 max-w-xs w-full reveal">
            <div class="flex items-center gap-3 mb-5">
              <div
                class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal/20 to-teal/5 flex items-center justify-center">
                <Shield class="w-5 h-5 text-teal-light" />
              </div>
              <div>
                <div class="font-bold text-sm">Keamanan Nemenin</div>
                <div class="text-xs text-slate-500">Perlindungan berlapis</div>
              </div>
            </div>
            <div class="space-y-2.5">
              <div v-for="(s, i) in [
                { text: 'Enkripsi end-to-end', pct: '100%' },
                { text: 'Verifikasi KTP terenkripsi', pct: '100%' },
                { text: 'Kontrol privasi penuh', pct: '95%' },
                { text: 'Anti-spam & moderasi', pct: '98%' },
                { text: 'Hak hapus data', pct: '100%' },
              ]" :key="i" class="reveal" :class="`reveal-delay-${i + 1}`">
                <div class="flex items-center justify-between text-xs mb-1">
                  <span class="text-slate-300 flex items-center gap-1.5">
                    <Check class="w-3 h-3 text-teal-light" /> {{ s.text }}
                  </span>
                  <span class="text-teal-light font-semibold">{{ s.pct }}</span>
                </div>
                <div class="h-1 rounded-full bg-navy-light overflow-hidden">
                  <div class="h-full rounded-full bg-gradient-to-r from-teal to-teal-light transition-all duration-1000"
                    :style="{ width: s.pct }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURE 4: Verified -->
  <section class="feature-showcase reveal">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="feature-grid reversed">
        <div>
          <div class="feature-tag">
            <BadgeCheck class="w-3.5 h-3.5" /> Terverifikasi
          </div>
          <h2 class="feature-title">Temui <span class="text-gradient">orang asli</span></h2>
          <p class="feature-desc">
            Setiap counselor melewati proses verifikasi identitas, background check, dan pelatihan
            empati. Kamu hanya bertemu orang-orang yang benar-benar siap mendengarkan.
          </p>
          <RouterLink to="/register" class="feature-cta">Lihat Counselor
            <ArrowRight class="w-4 h-4" />
          </RouterLink>
        </div>
        <div class="feature-visual flex items-center justify-center">
          <div class="glass-card p-8 max-w-xs text-center reveal">
            <div class="relative w-24 h-24 mx-auto mb-4">
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
                alt="Dr. Anisa" class="w-full h-full rounded-full object-cover border-4 border-teal/20" />
              <div
                class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center shadow-lg border-2 border-navy">
                <Check class="w-4 h-4 text-white" />
              </div>
            </div>
            <h4 class="font-bold text-lg mb-1">Dr. Anisa Putri</h4>
            <p class="text-slate-400 text-sm mb-3">Psikolog Klinis · 3 tahun pengalaman</p>
            <div class="flex items-center justify-center gap-1 text-peach text-sm font-semibold mb-4">
              <Star class="w-3.5 h-3.5" />
              <Star class="w-3.5 h-3.5" />
              <Star class="w-3.5 h-3.5" />
              <Star class="w-3.5 h-3.5" />
              <Star class="w-3.5 h-3.5" /><span class="text-slate-400 font-normal ml-1">(128 ulasan)</span>
            </div>
            <div class="flex flex-wrap gap-2 justify-center">
              <span
                class="text-xs px-2.5 py-1 rounded-full bg-teal/10 text-teal-light border border-teal/15 flex items-center gap-1">
                <ShieldCheck class="w-3 h-3" /> Terverifikasi
              </span>
              <span
                class="text-xs px-2.5 py-1 rounded-full bg-peach/10 text-peach border border-peach/15 flex items-center gap-1">
                <CircleDot class="w-3 h-3" /> Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- MENTAL HEALTH -->
  <section class="py-24 relative overflow-hidden">
    <div class="absolute w-[600px] h-[600px] rounded-full bg-teal/5 -right-60 top-1/2 -translate-y-1/2"
      data-parallax="0.1"></div>
    <div class="absolute w-[400px] h-[400px] rounded-full bg-peach/5 -left-40 top-1/4" data-parallax="0.15"></div>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="mental-health-card glass-card p-10 sm:p-14 text-center reveal relative overflow-hidden">
        <div class="absolute inset-0 rounded-2xl border border-teal/20 pointer-events-none"></div>
        <div
          class="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-teal/15 to-peach/10 flex items-center justify-center mental-health-pulse">
          <HeartPulse class="w-10 h-10 text-teal-light" />
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">
          Kamu <span class="text-gradient">Tidak Sendiri</span>
        </h2>
        <p class="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-4">
          Ketika dunia terasa berat, ketika pikiran menumpuk dan merasa tak ada jalan keluar — kami
          ada untukmu. Nemenin hadir bukan hanya sebagai teman bicara, tapi juga sebagai
          <strong class="text-slate-200">ruang aman untuk jiwa yang sedang berjuang</strong>.
        </p>
        <p class="text-slate-500 text-sm mb-6">
          Untuk siapa pun — mahasiswa, pekerja, orang tua — tanpa batasan usia atau latar belakang.
        </p>
        <div class="mb-10 px-6 py-4 rounded-xl bg-navy-light/50 border border-navy-border max-w-lg mx-auto">
          <p class="text-slate-300 text-base italic leading-relaxed">
            “Sepi dalam keramaian” —
            <span class="text-slate-400 not-italic text-sm">semakin banyak dialami oleh generasi yang hidup di era serba
              terhubung ini. Berinteraksi dengan banyak orang, namun tetap merasa sendiri.</span>
          </p>
        </div>
        <div class="grid sm:grid-cols-3 gap-6 mb-10">
          <div v-for="(m, i) in [
            {
              icon: Brain,
              title: 'Tekanan Akademik',
              desc: 'Stres kuliah, tugas, dan ekspektasi',
              color: 'teal',
            },
            {
              icon: CloudRain,
              title: 'Kesepian & Isolasi',
              desc: 'Merasa sendiri di tengah keramaian',
              color: 'peach',
            },
            {
              icon: HandHeart,
              title: 'Butuh Didengar',
              desc: 'Cerita tanpa dihakimi',
              color: 'peach-light',
            },
          ]" :key="i" class="flex flex-col items-center gap-3 p-4">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center" :class="`bg-${m.color}/10`">
              <component :is="m.icon" class="w-6 h-6" :class="`text-${m.color}`" />
            </div>
            <p class="text-sm text-slate-300 font-medium">{{ m.title }}</p>
            <p class="text-xs text-slate-500">{{ m.desc }}</p>
          </div>
        </div>
        <div
          class="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-navy-light/80 border border-navy-border text-sm">
          <MessageCircle class="w-4 h-4 text-teal-light" />
          <span class="text-slate-400">Butuh teman cerita sekarang?</span>
          <a href="https://wa.me/6282333671988?text=Halo%20Nemenin,%20saya%20ingin%20cerita..." target="_blank"
            class="text-teal-light font-bold hover:text-teal transition-colors">Chat Admin</a>
        </div>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section id="how" class="py-24 relative">
    <div class="absolute inset-0 bg-gradient-to-b from-navy via-navy-light/30 to-navy pointer-events-none"></div>
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center mb-16 reveal">
        <div class="section-tag mx-auto w-fit">
          <Compass class="w-3.5 h-3.5" /> Cara Kerja
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">
          Mulai dalam <span class="text-gradient">3 langkah</span> mudah
        </h2>
        <p class="text-slate-400 max-w-2xl mx-auto">
          Tidak perlu ribet. Buat akun, temukan counselor, dan mulai cerita.
        </p>
      </div>
      <div class="steps-flow reveal">
        <div v-for="(step, i) in [
          {
            icon: UserPlus,
            title: 'Buat Profil',
            desc: 'Daftar gratis dan lengkapi profil. Data KTP terenkripsi dan aman.',
          },
          {
            icon: Search,
            title: 'Temukan Counselor',
            desc: 'Jelajahi profil counselor terverifikasi sesuai kebutuhanmu.',
          },
          {
            icon: MessageCircle,
            title: 'Mulai Sesi',
            desc: 'Chat online atau offline meetup. Jadwalkan sesuai waktumu.',
          },
        ]" :key="i" class="step-item">
          <div class="step-icon-wrap">
            <component :is="step.icon" class="w-8 h-8 text-teal-light" />
          </div>
          <div v-if="i < 2" class="step-connector"></div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-desc">{{ step.desc }}</p>
        </div>
      </div>
      <div class="mt-12 text-center reveal">
        <RouterLink to="/how-it-works"
          class="inline-flex items-center gap-2 text-teal-light font-bold hover:text-white transition-colors group">
          Lihat Selengkapnya
          <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- PRICING -->
  <section id="pricing" class="py-24 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 reveal">
        <div class="section-tag mx-auto w-fit">
          <Tag class="w-3.5 h-3.5" /> Paket Harga
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">
          Pilih paket yang <span class="text-gradient">tepat</span>
        </h2>
        <p class="text-slate-400 max-w-2xl mx-auto">
          Mulai gratis, upgrade kapan saja untuk pengalaman terbaik.
        </p>
      </div>
      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <!-- Reguler -->
        <div class="glass-card pricing-card-enhanced p-8 reveal reveal-delay-1">
          <h3 class="text-xl font-bold mb-1">Akun Reguler</h3>
          <p class="text-slate-400 text-sm mb-6">Untuk kamu yang ingin mencoba</p>
          <div class="mb-8"><span class="text-4xl font-extrabold">Gratis</span></div>
          <ul class="space-y-3 mb-8">
            <li v-for="(f, i) in [
              { t: 'Visibilitas terbatas pada katalog', ok: true },
              { t: 'Konsultasi online gratis', ok: true },
              { t: 'Konsultasi offline berbayar', ok: true },
              { t: 'Masa aktif 1 bulan', ok: true },
              { t: 'Komunikasi langsung via WA', ok: false },
            ]" :key="i" class="flex items-start gap-3 text-sm">
              <Check v-if="f.ok" class="w-4 h-4 check-icon shrink-0 mt-0.5" />
              <XIcon v-else class="w-4 h-4 cross-icon shrink-0 mt-0.5" />
              <span :class="f.ok ? 'text-slate-300' : 'text-slate-500'">{{ f.t }}</span>
            </li>
          </ul>
          <RouterLink to="/register" class="btn-secondary w-full justify-center text-sm">Daftar Gratis</RouterLink>
        </div>
        <!-- Premium -->
        <div class="glass-card pricing-card-enhanced featured p-8 reveal reveal-delay-2">
          <div class="pricing-badge">Populer</div>
          <h3 class="text-xl font-bold mb-1">Akun Premium</h3>
          <p class="text-slate-400 text-sm mb-6">Pengalaman terbaik di Nemenin</p>
          <div class="mb-8">
            <span class="text-4xl font-extrabold text-gradient">Rp 99.000</span>
            <span class="text-slate-400 text-sm">/ 6 bulan</span>
          </div>
          <ul class="space-y-3 mb-8">
            <li v-for="(f, i) in [
              'Visibilitas unlimited di katalog',
              'Konsultasi online & offline gratis',
              'Komunikasi langsung via WA',
              'Update event & couple matching',
              'Masa aktif 6 bulan',
            ]" :key="i" class="flex items-start gap-3 text-sm">
              <Check class="w-4 h-4 check-icon shrink-0 mt-0.5" /><span class="text-slate-300">{{
                f
                }}</span>
            </li>
          </ul>
          <RouterLink to="/register" class="btn-primary w-full justify-center text-sm">Upgrade Premium
            <Crown class="w-4 h-4" />
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <!-- BECOME COUNSELOR CTA -->
  <section class="py-20 relative">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="glass-card p-8 sm:p-12 reveal relative overflow-hidden">
        <div class="absolute -top-8 -right-8 text-teal/5">
          <HandHeart class="w-40 h-40" />
        </div>
        <div class="grid md:grid-cols-[1fr,auto] gap-8 items-center relative z-10">
          <div>
            <div class="section-tag w-fit mb-4">
              <HandHeart class="w-3.5 h-3.5" /> Bergabung Sebagai Pendamping
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold mb-3">
              Ingin menjadi <span class="text-gradient">Counselor</span>?
            </h2>
            <p class="text-slate-400 leading-relaxed max-w-lg">
              Punya empati dan kemauan untuk mendengarkan? Jadilah bagian dari komunitas
              pendamping yang membantu orang lain merasa tidak sendiri. Daftar, verifikasi,
              dan mulai menemani.
            </p>
          </div>
          <div class="flex flex-col gap-3">
            <RouterLink to="/register" class="btn-primary whitespace-nowrap justify-center">
              <UserPlus class="w-4 h-4" /> Daftar Counselor
            </RouterLink>
            <RouterLink to="/how-it-works" class="btn-secondary whitespace-nowrap justify-center text-sm">
              Pelajari Lebih Lanjut
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- COUNTER STATS -->
  <section class="py-20 relative">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
        <div v-for="(s, i) in [
          {
            icon: Users,
            target: '2860000',
            suffix: '+',
            label: 'Potensi Pengguna',
            color: 'teal',
          },
          {
            icon: UserCheck,
            target: '500',
            suffix: '+',
            label: 'Counselor Terverifikasi',
            color: 'peach',
          },
          {
            icon: MessageSquareHeart,
            target: '10000',
            suffix: '+',
            label: 'Sesi Selesai',
            color: 'peach-light',
          },
          {
            icon: Heart,
            target: '98',
            suffix: '%',
            label: 'Merasa Lebih Baik',
            color: 'teal-light',
          },
        ]" :key="i" class="text-center reveal" :class="i > 0 ? `reveal-delay-${i}` : ''">
          <div class="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center" :class="`bg-${s.color}/10`">
            <component :is="s.icon" class="w-7 h-7" :class="`text-${s.color}`" />
          </div>
          <div class="text-3xl sm:text-4xl font-extrabold text-gradient counter-number" :data-target="s.target"
            :data-suffix="s.suffix">
            0
          </div>
          <p class="text-slate-400 text-sm mt-1">{{ s.label }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="py-24 relative overflow-hidden">
    <div class="absolute w-[500px] h-[500px] rounded-full bg-teal/[0.03] -left-40 top-1/3" data-parallax="0.08"></div>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 reveal">
        <div class="section-tag mx-auto w-fit">
          <Quote class="w-3.5 h-3.5" /> Cerita Mereka
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">
          Apa kata <span class="text-gradient">pengguna</span> kami
        </h2>
        <p class="text-slate-400 max-w-2xl mx-auto">
          Kisah nyata dari mereka yang sudah merasakan manfaat Nemenin.
        </p>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(t, i) in testimonials" :key="i" class="testimonial-card glass-card p-6 reveal"
          :class="`reveal-delay-${i + 1}`">
          <div class="flex items-center gap-1 text-peach mb-4">
            <Star class="w-4 h-4" />
            <Star class="w-4 h-4" />
            <Star class="w-4 h-4" />
            <Star class="w-4 h-4" />
            <Star class="w-4 h-4" />
          </div>
          <p class="text-slate-300 text-sm leading-relaxed mb-6">{{ t.text }}</p>
          <div class="flex items-center gap-3 pt-4 border-t border-navy-border">
            <img :src="`https://images.unsplash.com/${t.img}?auto=format&fit=crop&w=100&q=80`" :alt="t.name"
              class="w-10 h-10 rounded-full object-cover border border-white/10" />
            <div>
              <h4 class="font-semibold text-sm">{{ t.name }}</h4>
              <p class="text-xs text-slate-500">{{ t.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="py-24 relative">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 reveal">
        <div class="section-tag mx-auto w-fit">
          <HelpCircle class="w-3.5 h-3.5" /> FAQ
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">
          Pertanyaan yang <span class="text-gradient">sering ditanya</span>
        </h2>
      </div>
      <div class="faq-list space-y-4 reveal">
        <div v-for="(faq, i) in faqItems" :key="i" class="faq-item glass-card" :class="{ active: activeFaq === i }">
          <button class="faq-question" @click="toggleFaq(i)">
            <span>{{ faq.q }}</span>
            <ChevronDown class="w-5 h-5 faq-icon" />
          </button>
          <div class="faq-answer">
            <p>{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA BANNER -->
  <section class="py-20 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-teal-dark/20 via-navy to-peach-dark/20 pointer-events-none">
    </div>
    <div class="absolute w-3 h-3 rounded-full bg-teal/30 top-[20%] left-[10%] animate-pulse"></div>
    <div class="absolute w-2 h-2 rounded-full bg-peach/40 top-[40%] right-[15%] animate-pulse"
      style="animation-delay: 1s"></div>
    <div class="absolute w-4 h-4 rounded-full bg-teal-light/20 bottom-[30%] left-[20%] animate-pulse"
      style="animation-delay: 2s"></div>
    <div class="max-w-4xl mx-auto px-4 text-center relative z-10 reveal">
      <h2 class="text-3xl sm:text-4xl font-bold mb-4">Siap memulai perjalananmu?</h2>
      <p class="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
        Kami percaya setiap orang berhak untuk didengar. Bergabung dengan ribuan
        orang yang sudah menemukan ruang aman mereka di Nemenin.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <RouterLink to="/register" class="btn-primary text-base">
          <Rocket class="w-5 h-5" /> Mulai Sekarang
        </RouterLink>
        <RouterLink to="/how-it-works" class="btn-secondary text-base">Lihat Cara Kerja
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- WAVE DIVIDER -->
  <div style="margin-top: -2px; line-height: 0; overflow: hidden">
    <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
      style="width: 100%; height: 60px; display: block">
      <path d="M0,40 C360,100 720,0 1080,60 C1260,80 1380,50 1440,40 L1440,100 L0,100 Z" fill="rgba(15,23,42,0.6)" />
      <path d="M0,60 C320,20 640,90 960,40 C1120,20 1320,60 1440,50 L1440,100 L0,100 Z" fill="rgba(15,23,42,0.8)" />
      <path d="M0,75 C240,60 480,90 720,70 C960,50 1200,80 1440,65 L1440,100 L0,100 Z" fill="#0F172A" />
    </svg>
  </div>

  <!-- WA FLOAT -->
  <a href="https://wa.me/6282333671988?text=Halo%20Nemenin,%20saya%20tertarik%20untuk%20mencari%20teman..."
    target="_blank"
    class="fixed bottom-6 right-6 z-50 group flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg shadow-green-900/20 hover:scale-110 transition-transform duration-300">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
    <span
      class="absolute right-16 bg-white text-navy px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-sm pointer-events-none">Tanya
      Admin</span>
  </a>

  <FooterSection />
</template>
