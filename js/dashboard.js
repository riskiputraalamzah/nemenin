/* ========================================
   NEMENIN — Dashboard JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Sidebar Navigation ----------
    const sidebarLinks = document.querySelectorAll('.sidebar-link[data-tab]');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const pageTitle = document.getElementById('page-title');

    const tabTitles = {
        'beranda': 'Beranda',
        'discovery': 'Cari Counselor',
        'sessions': 'Sesi Saya',
        'upgrade': 'Upgrade Premium',
        'settings': 'Pengaturan'
    };

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = link.getAttribute('data-tab');

            // Update active sidebar link
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show correct panel
            tabPanels.forEach(panel => {
                panel.classList.add('hidden');
                if (panel.id === 'panel-' + tab) {
                    panel.classList.remove('hidden');
                }
            });

            // Update title
            if (pageTitle) {
                pageTitle.textContent = tabTitles[tab] || 'Dashboard';
            }

            // Close mobile sidebar
            closeMobileSidebar();
        });
    });

    // ---------- Mobile Sidebar Toggle ----------
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const mobileMenuBtn = document.getElementById('dash-menu-btn');

    function openMobileSidebar() {
        if (sidebar) sidebar.classList.add('open');
        if (sidebarOverlay) sidebarOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileSidebar() {
        if (sidebar) sidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeMobileSidebar);

    // ---------- Session Sub-Tabs ----------
    const sessionTabBtns = document.querySelectorAll('.session-tab-btn');
    const sessionPanels = document.querySelectorAll('.session-panel');

    sessionTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-session');

            sessionTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sessionPanels.forEach(p => {
                p.classList.add('hidden');
                if (p.id === 'session-' + target) {
                    p.classList.remove('hidden');
                }
            });
        });
    });

    // ---------- Profile Photo Upload Preview ----------
    const photoInput = document.getElementById('photo-upload');
    const photoPreview = document.getElementById('photo-preview');

    if (photoInput && photoPreview) {
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    photoPreview.src = ev.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // ---------- Settings Save (stub) ----------
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Show a simple toast-like feedback
            const toast = document.createElement('div');
            toast.textContent = '✅ Profil berhasil disimpan!';
            toast.style.cssText = `
        position: fixed; bottom: 2rem; right: 2rem;
        background: linear-gradient(135deg, #E07A5F, #F2A68B);
        color: #fff; padding: 1rem 1.5rem;
        border-radius: 0.75rem; font-weight: 600;
        font-family: 'Plus Jakarta Sans', sans-serif;
        z-index: 9999; box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        animation: fadeInUp 0.4s ease;
      `;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        });
    }

    // ---------- Logout (stub) ----------
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Yakin ingin keluar?')) {
                window.location.href = 'index.html';
            }
        });
    }

});
