document.addEventListener('DOMContentLoaded', function () {
    // --- Paksa Scroll ke Atas saat Halaman Dimuat ---
    // Ini untuk memastikan tampilan selalu dimulai dari bagian hero (cover)
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // --- Script Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('opacity-0');
        preloader.addEventListener('transitionend', () => preloader.classList.add('hidden'));
    });

    // --- Script Mobile Menu ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Tutup menu mobile saat link di-klik
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });


    // --- Script Animasi Scroll (Intersection Observer) ---
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // Jalankan animasi staggered
                const staggerParents = entry.target.querySelectorAll('.stagger-children');
                staggerParents.forEach(parent => {
                    const children = parent.children;
                    for (let i = 0; i < children.length; i++) {
                        children[i].style.transitionDelay = `${i * 100}ms`;
                    }
                });

                // Jalankan animasi counter
                const counters = entry.target.querySelectorAll('[data-count]');
                counters.forEach(counter => {
                    animateCount(counter);
                });
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
    
    // --- Fungsi Animasi Counter Angka ---
    function animateCount(element) {
        const target = +element.getAttribute('data-count');
        if (element.dataset.animated) return; // Jangan animasikan lagi
        element.dataset.animated = "true";

        let start = 0;
        const duration = 1500; // 1.5 detik
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const current = Math.floor(progress * target);
            element.innerText = `Rp ${current.toLocaleString('id-ID')}`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // --- Script Header Transparan ---
    const header = document.getElementById('header');
    window.onscroll = function() {
        if (window.pageYOffset > 50) {
            header.classList.add('py-2');
            header.classList.remove('py-4');
        } else {
            header.classList.add('py-4');
            header.classList.remove('py-2');
        }
    };

    // --- Script Parallax Hero ---
    const hero = document.getElementById('hero');
    window.addEventListener('scroll', () => {
        const offset = window.pageYOffset;
        hero.style.backgroundPositionY = `${offset * 0.5}px`;
    });

    // --- Script Tab ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const activeTabId = button.dataset.tab;
            
            tabContents.forEach(content => {
                if (content.id !== activeTabId && !content.classList.contains('hidden')) {
                    content.classList.add('hiding');
                    content.addEventListener('transitionend', () => {
                        content.classList.add('hidden');
                        content.classList.remove('hiding');
                    }, { once: true });
                }
            });

            const activeContent = document.getElementById(activeTabId);
            activeContent.classList.remove('hidden', 'hiding');
        });
    });

    // --- Script Navigasi Aktif ---
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('main section');
    const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: "-30% 0px -70% 0px" });
    contentSections.forEach(section => navObserver.observe(section));

    // --- Script Modal Galeri ---
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModalBtn = document.getElementById('close-modal');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            modal.classList.remove('opacity-0', 'pointer-events-none');
            modalImg.src = item.src;
        });
    });

    const closeModal = () => {
         modal.classList.add('opacity-0', 'pointer-events-none');
    }

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Tutup modal dengan tombol Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) {
            closeModal();
        }
    });
});
// PERBAIKAN: Menghapus satu kurung kurawal } penutup yang berlebih di akhir file.
