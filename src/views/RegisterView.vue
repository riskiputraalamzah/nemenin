<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import {
  HeartHandshake,
  ArrowLeft,
  ArrowRight,
  User,
  Calendar,
  Mail,
  Phone,
  CreditCard,
  Lock,
  Eye,
  Camera,
  CheckCircle,
} from 'lucide-vue-next'
import ToastNotification from '@/components/ToastNotification.vue'

const router = useRouter()
const currentStep = ref(1)
const totalSteps = 6
const transitionName = ref('step-next')
const formData = ref({
  role: '',
  gender: '',
  name: '',
  dob: '',
  email: '',
  phone: '',
  ktp: '',
  password: '',
  password2: '',
})
const photoPreview = ref('')
const showToast = ref(false)

const progressDots = computed(() => {
  return Array.from({ length: totalSteps }, (_, i) => {
    if (i < currentStep.value - 1) return 'filled'
    if (i === currentStep.value - 1) return 'current'
    return ''
  })
})

function selectChoice(key, value) {
  formData.value[key] = value
  setTimeout(() => goNext(), 350)
}

function goNext() {
  if (currentStep.value < totalSteps) {
    transitionName.value = 'step-next'
    currentStep.value++
  }
}
function goBack() {
  if (currentStep.value > 1) {
    transitionName.value = 'step-back'
    currentStep.value--
  }
}

const step3Valid = computed(() => formData.value.name.trim().length >= 2 && formData.value.dob)
const step4Valid = computed(
  () =>
    formData.value.email.includes('@') &&
    formData.value.phone.length >= 10 &&
    formData.value.ktp.length === 16,
)

const pwStrength = computed(() => {
  const pw = formData.value.password
  let s = 0
  if (pw.length >= 8) s++
  if (/[A-Z]/.test(pw)) s++
  if (/[0-9]/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  return s
})
const pwColors = ['#EF4444', '#FB923C', '#FBBF24', '#10B981']
const pwLabels = ['Lemah', 'Cukup', 'Bagus', 'Kuat 🔒']
const step5Valid = computed(
  () => formData.value.password.length >= 8 && formData.value.password === formData.value.password2,
)

const showPassword = ref(false)

function previewPhoto(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (ev) => {
      photoPreview.value = ev.target.result
    }
    reader.readAsDataURL(file)
  }
}

function finishRegister() {
  showToast.value = true
  setTimeout(() => router.push('/login'), 1500)
}
</script>

<template>
  <div
    class="font-jakarta bg-[#0F172A] text-slate-100 min-h-[100dvh] flex items-center justify-center relative overflow-x-hidden">
    <!-- BG -->
    <div class="hero-blob w-96 h-96 bg-teal/20 -top-32 -left-32 absolute"></div>
    <div class="hero-blob w-72 h-72 bg-peach/15 bottom-10 right-10 absolute" style="animation-delay: -4s"></div>
    <div class="absolute inset-0 bg-gradient-to-br from-teal/5 via-transparent to-peach/5 pointer-events-none"></div>

    <div class="w-full flex flex-col items-center px-4 py-8 relative z-10">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 text-xl font-bold text-white no-underline mb-8">
        <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-teal to-peach flex items-center justify-center vt-logo">
          <HeartHandshake class="w-5 h-5 text-white" />
        </div>
        <span>Nemenin</span>
      </RouterLink>

      <!-- Step Card -->
      <div class="step-card">
        <!-- Progress Bar -->
        <div class="progress-bar z-10 relative">
          <div v-for="(s, i) in progressDots" :key="i" class="progress-dot" :class="s"></div>
        </div>

        <Transition :name="transitionName" mode="out-in">
          <!-- STEP 1: Role -->
          <div v-if="currentStep === 1" class="step-content">
            <h2 class="step-title-reg">Hai, salam kenal 👋</h2>
            <p class="step-desc-reg">Ceritakan sedikit tentang dirimu — ini akan membantu kami memberikan pengalaman
              terbaik.</p>
            <div class="space-y-3">
              <button class="choice-btn" :class="{ selected: formData.role === 'user' }"
                @click="selectChoice('role', 'user')">
                <div class="choice-icon bg-peach/15 text-peach">🙋</div>
                <div class="text-left">
                  <div>Aku mencari teman cerita</div>
                  <div class="text-xs text-slate-400 font-normal mt-0.5">Butuh seseorang untuk mendengarkan</div>
                </div>
              </button>
              <button class="choice-btn" :class="{ selected: formData.role === 'companion' }"
                @click="selectChoice('role', 'companion')">
                <div class="choice-icon bg-teal/15 text-teal-light">🤝</div>
                <div class="text-left">
                  <div>Aku ingin menjadi counselor</div>
                  <div class="text-xs text-slate-400 font-normal mt-0.5">Siap mendengarkan dan menemani</div>
                </div>
              </button>
            </div>
          </div>

          <!-- STEP 2: Gender -->
          <div v-else-if="currentStep === 2" class="step-content">
            <button class="back-btn" @click="goBack">
              <ArrowLeft class="w-4 h-4" />
            </button>
            <h2 class="step-title-reg">Kamu seorang...</h2>
            <p class="step-desc-reg">Informasi ini bersifat privat dan terenkripsi.</p>
            <div class="space-y-3">
              <button class="choice-btn" :class="{ selected: formData.gender === 'male' }"
                @click="selectChoice('gender', 'male')">
                <div class="choice-icon bg-sky-500/15 text-sky-400">👨</div>
                <div>Laki-laki</div>
              </button>
              <button class="choice-btn" :class="{ selected: formData.gender === 'female' }"
                @click="selectChoice('gender', 'female')">
                <div class="choice-icon bg-pink-500/15 text-pink-400">👩</div>
                <div>Perempuan</div>
              </button>
            </div>
          </div>

          <!-- STEP 3: Name & Birth -->
          <div v-else-if="currentStep === 3" class="step-content">
            <button class="back-btn" @click="goBack">
              <ArrowLeft class="w-4 h-4" />
            </button>
            <h2 class="step-title-reg">Siapa namamu?</h2>
            <p class="step-desc-reg">Gunakan nama asli agar counselor bisa menyapamu dengan nyaman.</p>
            <div class="space-y-4">
              <div>
                <label class="form-label">Nama Lengkap</label>
                <div class="relative">
                  <User class="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input v-model="formData.name" type="text" placeholder="Masukkan nama lengkap" class="form-input"
                    style="padding-left: 2.75rem" />
                </div>
              </div>
              <div>
                <label class="form-label">Tanggal Lahir</label>
                <div class="relative">
                  <Calendar class="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input v-model="formData.dob" type="date" class="form-input" style="padding-left: 2.75rem" />
                </div>
              </div>
            </div>
            <button class="next-btn" :disabled="!step3Valid" @click="goNext">
              Lanjutkan
              <ArrowRight class="w-4 h-4" />
            </button>
          </div>

          <!-- STEP 4: Contact -->
          <div v-else-if="currentStep === 4" class="step-content">
            <button class="back-btn" @click="goBack">
              <ArrowLeft class="w-4 h-4" />
            </button>
            <h2 class="step-title-reg">Kontak</h2>
            <p class="step-desc-reg">Kami tidak akan menampilkan info ini secara publik.</p>
            <div class="space-y-4">
              <div>
                <label class="form-label">Email</label>
                <div class="relative">
                  <Mail class="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input v-model="formData.email" type="email" placeholder="nama@email.com" class="form-input"
                    style="padding-left: 2.75rem" />
                </div>
              </div>
              <div>
                <label class="form-label">No. Telepon</label>
                <div class="relative">
                  <Phone class="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input v-model="formData.phone" type="tel" placeholder="08xxxxxxxxxx" class="form-input"
                    style="padding-left: 2.75rem" />
                </div>
              </div>
              <div>
                <label class="form-label">No. KTP <span class="text-xs text-slate-500">(terenkripsi)</span></label>
                <div class="relative">
                  <CreditCard class="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input v-model="formData.ktp" type="text" placeholder="16 digit nomor KTP" maxlength="16"
                    class="form-input" style="padding-left: 2.75rem" />
                </div>
              </div>
            </div>
            <button class="next-btn" :disabled="!step4Valid" @click="goNext">
              Lanjutkan
              <ArrowRight class="w-4 h-4" />
            </button>
          </div>

          <!-- STEP 5: Password -->
          <div v-else-if="currentStep === 5" class="step-content">
            <button class="back-btn" @click="goBack">
              <ArrowLeft class="w-4 h-4" />
            </button>
            <h2 class="step-title-reg">Buat password</h2>
            <p class="step-desc-reg">Minimal 8 karakter dengan kombinasi huruf dan angka.</p>
            <div class="space-y-4">
              <div>
                <label class="form-label">Password</label>
                <div class="relative">
                  <Lock class="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input v-model="formData.password" :type="showPassword ? 'text' : 'password'"
                    placeholder="Minimal 8 karakter" class="form-input"
                    style="padding-left: 2.75rem; padding-right: 2.5rem" minlength="8" />
                  <button type="button" @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                    <Eye class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <label class="form-label">Konfirmasi Password</label>
                <div class="relative">
                  <Lock class="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input v-model="formData.password2" type="password" placeholder="Ulangi password" class="form-input"
                    style="padding-left: 2.75rem" minlength="8" />
                </div>
              </div>
              <div class="flex gap-1.5">
                <div v-for="i in 4" :key="i" class="flex-1 h-1 rounded"
                  :style="{ background: i <= pwStrength ? pwColors[Math.min(pwStrength - 1, 3)] : 'rgba(148,163,184,0.15)' }">
                </div>
              </div>
              <p v-if="formData.password.length > 0" class="text-xs text-slate-500"
                :style="{ color: pwColors[Math.min(pwStrength - 1, 3)] }">
                {{ pwLabels[Math.min(pwStrength - 1, 3)] || '' }}
              </p>
            </div>
            <button class="next-btn" :disabled="!step5Valid" @click="goNext">
              Lanjutkan
              <ArrowRight class="w-4 h-4" />
            </button>
          </div>

          <!-- STEP 6: Photo -->
          <div v-else-if="currentStep === 6" class="step-content">
            <button class="back-btn" @click="goBack">
              <ArrowLeft class="w-4 h-4" />
            </button>
            <h2 class="step-title-reg">Foto profil</h2>
            <p class="step-desc-reg">Unggah fotomu — nanti AI kami akan mengkonversinya jadi avatar kartun yang keren!
              🎨</p>
            <div class="upload-area" @click="$refs.photoInput.click()">
              <div v-if="photoPreview" class="mb-3">
                <img :src="photoPreview" alt="Preview"
                  class="w-24 h-24 rounded-2xl object-cover mx-auto border-2 border-teal/30" />
              </div>
              <div v-else>
                <div class="w-16 h-16 mx-auto mb-3 rounded-2xl bg-teal/10 flex items-center justify-center">
                  <Camera class="w-8 h-8 text-teal-light" />
                </div>
                <p class="text-sm text-slate-300 font-semibold">Tap untuk unggah foto</p>
                <p class="text-xs text-slate-500 mt-1">JPG, PNG · Maks 5MB</p>
              </div>
              <input ref="photoInput" type="file" accept="image/*" class="hidden" @change="previewPhoto" />
            </div>
            <button class="next-btn" @click="finishRegister">
              <CheckCircle class="w-5 h-5" /> Selesai — Buat Profil
            </button>
            <button
              class="w-full text-center text-sm text-slate-500 hover:text-slate-300 mt-3 bg-transparent border-none font-medium cursor-pointer"
              @click="finishRegister">
              Lewati untuk sekarang →
            </button>
          </div>
        </Transition>
      </div>

      <!-- Login link -->
      <p class="text-sm text-slate-400 mt-6">
        Sudah punya akun?
        <RouterLink to="/login" class="text-teal-light font-semibold hover:underline">Masuk di sini</RouterLink>
      </p>
      <p class="text-xs text-slate-600 mt-4">&copy; 2026 Nemenin. Semua hak dilindungi.</p>
    </div>

    <ToastNotification :show="showToast" message="✅ Profil berhasil dibuat! Mengarahkan..." type="success"
      @close="showToast = false" />
  </div>
</template>

<style scoped>
.step-card {
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 1.5rem;
  max-width: 480px;
  width: 100%;
  padding: 2.5rem 2rem;
  position: relative;
}

.progress-bar {
  display: flex;
  gap: 6px;
  margin-bottom: 2rem;
}

.progress-dot {
  flex: 1;
  height: 5px;
  border-radius: 99px;
  background: rgba(148, 163, 184, 0.15);
  transition: background 0.4s ease;
}

.progress-dot.filled {
  background: linear-gradient(90deg, #e07a5f, #f2a68b);
}

.progress-dot.current {
  background: linear-gradient(90deg, #f2a68b, #f7dba7);
  box-shadow: 0 0 12px rgba(242, 166, 139, 0.4);
}

@keyframes stepIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.step-content {
  width: 100%;
}

.choice-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1.25rem 1.5rem;
  background: rgba(15, 23, 42, 0.6);
  border: 2px solid rgba(148, 163, 184, 0.12);
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #f1f5f9;
  font-weight: 600;
  font-size: 1rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.choice-btn:hover {
  border-color: rgba(242, 166, 139, 0.4);
  background: rgba(224, 122, 95, 0.08);
  transform: translateY(-2px);
}

.choice-btn.selected {
  border-color: #f2a68b;
  background: rgba(224, 122, 95, 0.12);
  box-shadow: 0 0 20px rgba(224, 122, 95, 0.15);
}

.choice-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.step-title-reg {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.step-desc-reg {
  color: #94a3b8;
  font-size: 0.9rem;
  margin-bottom: 1.75rem;
  line-height: 1.6;
}

.back-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(148, 163, 184, 0.1);
  border: 1px solid rgba(148, 163, 184, 0.15);
  color: #94a3b8;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin-bottom: 1rem;
  flex-shrink: 0;
}

.back-btn:hover {
  color: #fff;
  background: rgba(148, 163, 184, 0.2);
}

.next-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 0.875rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: linear-gradient(135deg, #e07a5f, #f2a68b);
  color: #fff;
  margin-top: 1.5rem;
}

.next-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(224, 122, 95, 0.4);
}

.next-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.upload-area {
  border: 2px dashed rgba(148, 163, 184, 0.2);
  border-radius: 1.25rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-area:hover {
  border-color: rgba(242, 166, 139, 0.4);
}

@media (max-width: 480px) {
  .step-card {
    padding: 2rem 1.25rem;
    border-radius: 1.25rem;
  }

  .step-title-reg {
    font-size: 1.25rem;
  }
}
</style>
