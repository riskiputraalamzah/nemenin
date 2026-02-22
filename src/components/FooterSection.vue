<script setup>
import { RouterLink } from 'vue-router'
import { HeartHandshake, Instagram, Twitter, Linkedin, Mail, Heart } from 'lucide-vue-next'
</script>

<template>
  <footer class="footer-gradient pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-4 gap-12 mb-12">
        <div class="md:col-span-2">
          <div class="flex items-center gap-2 text-xl font-bold mb-4">
            <div
              class="w-9 h-9 rounded-lg bg-gradient-to-br from-teal to-peach flex items-center justify-center"
            >
              <HeartHandshake class="w-5 h-5 text-white" />
            </div>
            <span>Nemenin</span>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed max-w-md mb-6">
            Platform pendampingan emosional dan sosial — ruang aman untuk didengar, ditemani, dan
            berinteraksi dengan batasan yang jelas, aman, dan beretika.
          </p>
          <div class="flex gap-3">
            <a href="#" class="social-icon" aria-label="Instagram">
              <Instagram class="w-4 h-4" />
            </a>
            <a href="#" class="social-icon" aria-label="Twitter">
              <Twitter class="w-4 h-4" />
            </a>
            <a href="#" class="social-icon" aria-label="LinkedIn">
              <Linkedin class="w-4 h-4" />
            </a>
            <a href="#" class="social-icon" aria-label="Email">
              <Mail class="w-4 h-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 class="font-bold text-sm mb-4 text-white">Platform</h4>
          <ul class="space-y-2.5">
            <li><a href="#features" class="footer-link">Fitur</a></li>
            <li><a href="#how" class="footer-link">Cara Kerja</a></li>
            <li><a href="#pricing" class="footer-link">Harga</a></li>
            <li><a href="#" class="footer-link">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-sm mb-4 text-white">Perusahaan</h4>
          <ul class="space-y-2.5">
            <li><a href="#" class="footer-link">Tentang Kami</a></li>
            <li><a href="#" class="footer-link">Kebijakan Privasi</a></li>
            <li><a href="#" class="footer-link">Syarat &amp; Ketentuan</a></li>
            <li><a href="#" class="footer-link">Hubungi Kami</a></li>
          </ul>
        </div>
      </div>
      <div
        class="border-t border-navy-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p class="text-slate-500 text-xs">&copy; 2026 Nemenin. Semua hak dilindungi.</p>
        <p class="text-slate-600 text-xs">
          Dibuat dengan <Heart class="w-3.5 h-3.5 inline text-peach" /> untuk kemanusiaan
        </p>
      </div>
    </div>
  </footer>
</template>
