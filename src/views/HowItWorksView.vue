<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import FooterSection from '@/components/FooterSection.vue'
import {
    ChevronDown,
    MessageSquare,
    UserPlus,
    ShieldCheck,
    Smile,
    BadgeCheck,
    UserCheck,
    Fingerprint,
    Lock,
    ShieldAlert,
    OctagonAlert,
    CheckCircle2,
    History,
    HeartHandshake,
} from 'lucide-vue-next'

// Cursor glow
let glowEl = null

onMounted(() => {
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

    <main>
        <!-- Scene 1: The Emotional Hook -->
        <section
            class="hero-gradient min-h-screen flex items-center justify-center relative px-4 overflow-hidden pt-20">
            <div class="max-w-4xl text-center z-10 reveal">
                <span
                    class="inline-block py-1 px-3 rounded-full bg-teal/10 text-teal text-[10px] font-bold tracking-wider uppercase mb-6">Sebuah
                    Perjalanan</span>
                <h1 class="text-5xl sm:text-7xl font-extrabold mb-8 leading-tight">
                    Kadang, yang kita butuhkan hanyalah
                    <span class="text-gradient">kehadiran</span>.
                </h1>
                <p class="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
                    Nemenin hadir bukan sekadar aplikasi, tapi sebuah jembatan saat kamu
                    merasa "sepi dalam keramaian". Kita tidak diciptakan untuk berjalan
                    sendirian.
                </p>
                <div class="flex flex-col items-center gap-4 reveal-delay-2">
                    <p class="text-xs text-slate-500 uppercase tracking-widest">
                        Scroll untuk memulai
                    </p>
                    <div class="animate-bounce text-teal/50">
                        <ChevronDown class="w-6 h-6" />
                    </div>
                </div>
            </div>

            <!-- Atmospheric background elements -->
            <div class="warm-blob w-96 h-96 bg-teal/10 -top-20 -left-20 absolute" data-parallax="0.3"></div>
            <div class="warm-blob w-[500px] h-[500px] bg-peach/5 bottom-0 -right-20 absolute" data-parallax="0.2"></div>
        </section>

        <!-- Scene 2: The Problem (The Weight of Solitude) -->
        <section class="py-24 relative overflow-hidden bg-navy-light/30">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid lg:grid-cols-2 gap-16 items-center">
                    <div class="reveal">
                        <h2 class="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                            "Sepi di Tengah Keramaian" <br />
                            <span class="text-teal text-2xl sm:text-3xl font-semibold opacity-80">Bukan sekadar
                                kiasan.</span>
                        </h2>
                        <div class="space-y-6 text-slate-400 text-lg leading-relaxed">
                            <p>
                                Kita hidup di era yang paling terhubung secara digital, namun
                                jutaan orang merasa lebih terasing dari sebelumnya.
                            </p>
                            <p>
                                Ada cerita yang tak bisa dibagikan ke keluarga, emosi yang tak
                                ingin ditunjukkan ke teman kantor, dan kebutuhan sosial yang
                                terabaikan karena kesibukan karier.
                            </p>
                            <div class="pt-4 flex items-center gap-4 text-white italic">
                                <div class="w-12 h-[1px] bg-teal"></div>
                                <span>Kamu tidak butuh konseling medis, kamu hanya ingin
                                    didengar.</span>
                            </div>
                        </div>
                    </div>
                    <div class="relative reveal-delay-2 flex justify-center lg:justify-end">
                        <div
                            class="relative w-full max-w-md aspect-square bg-navy-card rounded-2xl p-8 border border-navy-border/50 shadow-2xl flex flex-col justify-center">
                            <div
                                class="absolute -top-4 -left-4 w-12 h-12 bg-teal rounded-lg flex items-center justify-center shadow-lg animate-pulse">
                                <MessageSquare class="text-white w-6 h-6" />
                            </div>
                            <div class="space-y-4">
                                <div class="h-4 w-3/4 bg-slate-700/50 rounded-full"></div>
                                <div class="h-4 w-1/2 bg-slate-700/50 rounded-full"></div>
                                <div class="h-4 w-2/3 bg-slate-700/50 rounded-full"></div>
                                <div class="pt-6">
                                    <p class="text-slate-500 text-sm">
                                        "Aku cuma pengen cerita aja hari ini, capek banget..."
                                    </p>
                                </div>
                            </div>
                            <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-peach/10 rounded-full filter blur-xl">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Scene 3: The Steps (The Journey) -->
        <section class="py-32 bg-navy relative">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-24 reveal">
                    <h2 class="text-3xl sm:text-5xl font-bold mb-6">
                        Tiga Langkah Menuju <span class="text-gradient">Kenyamanan</span>
                    </h2>
                    <p class="text-slate-400 max-w-2xl mx-auto text-lg">
                        Proses sederhana yang kami rancang untuk memastikan interaksi yang
                        aman, beretika, dan sepenuhnya manusiawi.
                    </p>
                </div>

                <div class="grid md:grid-cols-3 gap-12 relative">
                    <!-- Progress Line (Desktop) -->
                    <div
                        class="hidden md:block absolute top-[100px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-teal/20 via-peach/20 to-teal/20">
                    </div>

                    <!-- Step 1 -->
                    <div class="relative flex flex-col items-center text-center reveal">
                        <div
                            class="w-20 h-20 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center mb-8 relative z-10 transition-transform hover:scale-110 duration-500">
                            <span
                                class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-teal text-white text-sm font-bold flex items-center justify-center">1</span>
                            <UserPlus class="w-10 h-10 text-teal" />
                        </div>
                        <h3 class="text-xl font-bold mb-4">Pilih Peranmu</h3>
                        <p class="text-slate-400 leading-relaxed">
                            Apakah kamu ingin <strong>di-temani</strong> atau kamu siap
                            menjadi <strong>pen-damping</strong>? Daftar dan lengkapi profil
                            emosionalmu.
                        </p>
                    </div>

                    <!-- Step 2 -->
                    <div class="relative flex flex-col items-center text-center reveal reveal-delay-2">
                        <div
                            class="w-20 h-20 rounded-2xl bg-peach/10 border border-peach/20 flex items-center justify-center mb-8 relative z-10 transition-transform hover:scale-110 duration-500">
                            <span
                                class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-peach text-navy text-sm font-bold flex items-center justify-center">2</span>
                            <ShieldCheck class="w-10 h-10 text-peach" />
                        </div>
                        <h3 class="text-xl font-bold mb-4">Verifikasi & Cocokkan</h3>
                        <p class="text-slate-400 leading-relaxed">
                            Tim kami memastikan setiap akun terverifikasi. Pilih pendamping
                            yang sesuai dengan kebutuhanmu: teman curhat atau teman
                            aktivitas sosial.
                        </p>
                    </div>

                    <!-- Step 3 -->
                    <div class="relative flex flex-col items-center text-center reveal reveal-delay-3">
                        <div
                            class="w-20 h-20 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center mb-8 relative z-10 transition-transform hover:scale-110 duration-500">
                            <span
                                class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-teal text-white text-sm font-bold flex items-center justify-center">3</span>
                            <Smile class="w-10 h-10 text-teal" />
                        </div>
                        <h3 class="text-xl font-bold mb-4">Mulai Terhubung</h3>
                        <p class="text-slate-400 leading-relaxed">
                            Interaksi dimulai dalam ruang aman dengan batasan yang jelas.
                            Rasakan pengalaman didengar dan ditemani tanpa dihakimi.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Scene 4: Safety & Ethical Commitment -->
        <section class="py-24 relative overflow-hidden">
            <!-- Background Decoration -->
            <div
                class="absolute inset-0 bg-navy-light/30 skew-y-3 transform origin-bottom-left scale-110 z-0 pointer-events-none">
            </div>

            <div class="max-w-6xl mx-auto px-4 relative z-10">
                <!-- Section Header -->
                <div class="text-center mb-16 reveal">
                    <div class="inline-flex items-center justify-center p-4 rounded-full bg-teal/10 mb-6 animate-pulse">
                        <ShieldCheck class="w-10 h-10 text-teal" />
                    </div>
                    <h2 class="text-3xl md:text-5xl font-bold mb-6">
                        Komitmen <span class="text-gradient">Etika & Keamanan</span>
                    </h2>
                    <p class="text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto">
                        Nemenin dibangun di atas pondasi kepercayaan. Kami menerapkan
                        standar keamanan berlapis untuk memastikan setiap interaksi aman,
                        nyaman, dan manusiawi.
                    </p>
                </div>

                <!-- Interactive Cards Grid -->
                <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
                    <!-- Card 1: Terverifikasi -->
                    <div
                        class="group relative p-8 rounded-2xl bg-navy-card border border-navy-border hover:border-teal/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal/10 reveal reveal-delay-1 overflow-hidden">
                        <div
                            class="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                            <BadgeCheck class="w-40 h-40 text-teal" />
                        </div>
                        <div class="relative z-10">
                            <div
                                class="w-14 h-14 rounded-xl bg-teal/10 flex items-center justify-center mb-6 group-hover:bg-teal group-hover:text-white transition-colors duration-300">
                                <UserCheck class="w-7 h-7 text-teal group-hover:text-white" />
                            </div>
                            <h3 class="text-xl font-bold text-white mb-3">Terverifikasi Ketat</h3>
                            <p
                                class="text-slate-400 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">
                                Setiap counselor melalui proses verifikasi identitas (KTP),
                                wawancara, dan background check. Kami memastikan kamu
                                berinteraksi dengan orang asli yang aman.
                            </p>
                        </div>
                    </div>

                    <!-- Card 2: Privasi -->
                    <div
                        class="group relative p-8 rounded-2xl bg-navy-card border border-navy-border hover:border-peach/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-peach/10 reveal reveal-delay-2 overflow-hidden">
                        <div
                            class="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                            <Fingerprint class="w-40 h-40 text-peach" />
                        </div>
                        <div class="relative z-10">
                            <div
                                class="w-14 h-14 rounded-xl bg-peach/10 flex items-center justify-center mb-6 group-hover:bg-peach group-hover:text-navy transition-colors duration-300">
                                <Lock class="w-7 h-7 text-peach group-hover:text-navy" />
                            </div>
                            <h3 class="text-xl font-bold text-white mb-3">Privasi Terjaga</h3>
                            <p
                                class="text-slate-400 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">
                                Identitas aslimu aman bersama kami. Kamu punya kendali penuh
                                atas informasi yang ingin dibagikan. Chat terenkripsi dan data
                                tidak dijual.
                            </p>
                        </div>
                    </div>

                    <!-- Card 3: Batasan -->
                    <div
                        class="group relative p-8 rounded-2xl bg-navy-card border border-navy-border hover:border-teal-light/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-light/10 reveal reveal-delay-3 overflow-hidden">
                        <div
                            class="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                            <ShieldAlert class="w-40 h-40 text-teal-light" />
                        </div>
                        <div class="relative z-10">
                            <div
                                class="w-14 h-14 rounded-xl bg-teal-light/10 flex items-center justify-center mb-6 group-hover:bg-teal-light group-hover:text-white transition-colors duration-300">
                                <OctagonAlert class="w-7 h-7 text-teal-light group-hover:text-white" />
                            </div>
                            <h3 class="text-xl font-bold text-white mb-3">Batasan Jelas</h3>
                            <p
                                class="text-slate-400 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">
                                Profesional tanpa baper. Dilarang keras melakukan tindakan
                                asusila, romantis, atau melanggar hukum. Tombol lapor tersedia
                                24/7.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Trust Strip -->
                <div
                    class="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-6 md:gap-12 opacity-80 reveal">
                    <div class="flex items-center gap-3 px-4 py-2 rounded-full bg-navy/40 border border-white/5">
                        <CheckCircle2 class="w-5 h-5 text-teal" />
                        <span class="text-sm font-semibold text-slate-300">Zero Tolerance Policy</span>
                    </div>
                    <div class="flex items-center gap-3 px-4 py-2 rounded-full bg-navy/40 border border-white/5">
                        <History class="w-5 h-5 text-peach" />
                        <span class="text-sm font-semibold text-slate-300">24/7 Monitoring</span>
                    </div>
                    <div class="flex items-center gap-3 px-4 py-2 rounded-full bg-navy/40 border border-white/5">
                        <HeartHandshake class="w-5 h-5 text-teal-light" />
                        <span class="text-sm font-semibold text-slate-300">Code of Conduct</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Final CTA -->
        <section class="py-32 relative overflow-hidden">
            <div class="max-w-4xl mx-auto px-4 text-center reveal">
                <h2 class="text-4xl sm:text-5xl font-extrabold mb-8 leading-tight">
                    Siap untuk tidak merasa <br />
                    <span class="text-gradient">sendiri</span> lagi?
                </h2>
                <p class="text-slate-400 text-lg mb-12">
                    Bergabunglah dengan ribuan orang yang mulai memprioritaskan
                    kesehatan emosional dan kebutuhan sosial mereka secara sehat.
                </p>
                <div class="flex flex-wrap justify-center gap-4">
                    <RouterLink to="/register" class="btn-primary py-4 px-10 text-lg font-bold">
                        Daftar Gratis Sekarang
                    </RouterLink>
                </div>
            </div>
            <!-- Background blobs -->
            <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-teal/5 filter blur-3xl rounded-full"></div>
            <div class="absolute -top-20 -right-20 w-96 h-96 bg-peach/5 filter blur-3xl rounded-full"></div>
        </section>
    </main>

    <FooterSection />
</template>
