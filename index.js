document.addEventListener('DOMContentLoaded', () => {
    const cursorGlow = document.querySelector('.cursor-glow');
    
    // --- Cursor Tracking ---
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });

    // --- Intersection Observer for Reveal Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.skill-card, .portfolio-item, .timeline-item, .section-title, .hero-text, .testimonial-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        observer.observe(el);
    });

    // Custom animation class
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // --- Card Spotlight Effect ---
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- Project Showcase Slider ---
    const projectSlides = document.querySelectorAll('.project-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    let currentProjectIndex = 0;

    function showProject(index) {
        if (!projectSlides[index]) return;
        projectSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        projectSlides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        currentProjectIndex = index;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            let index = currentProjectIndex - 1;
            if (index < 0) index = projectSlides.length - 1;
            showProject(index);
        });

        nextBtn.addEventListener('click', () => {
            let index = currentProjectIndex + 1;
            if (index >= projectSlides.length) index = 0;
            showProject(index);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showProject(index);
        });
    });

    // --- Project Image Sub-Slider Logic ---
    const projectImages = {
        aurum: [
            'image/Aurum/dashboard_overview_1777785204792.png',
            'image/Aurum/chemistry_arena_overview_1777785496932.png',
            'image/Aurum/arena_leaderboard_1777785509523.png',
            'image/Aurum/periodic_table_1777785226372.png',
            'image/Aurum/virtual_lab_center_1777785256233.png',
            'image/Aurum/user_profile_character_1777785694006.png'
        ],
        littlefish: [
            'image/LittleFish/31361382703354435724.jpg',
            'image/LittleFish/126962031438264350512.jpg',
            'image/LittleFish/31361382703354435727.jpg',
            'image/LittleFish/31361382703354435728.jpg',
            'image/LittleFish/37518677369967932841.jpg',
            'image/LittleFish/37518677369967932842.jpg',
            'image/LittleFish/37518677369967932843.jpg',
            'image/LittleFish/37518677369967932845.jpg',
            'image/LittleFish/37518677369967932846.jpg',
            'image/LittleFish/37518677369967932849.jpg',
            'image/LittleFish/375186773699679328410.jpg',
            'image/LittleFish/375186773699679328411.jpg',
            'image/LittleFish/375186773699679328413.jpg'
        ]
    };

    const currentImgIndexes = {
        aurum: 0,
        littlefish: 0
    };

    window.jumpToProjectImage = function(projectId, index) {
        const images = projectImages[projectId];
        if (!images || index < 0 || index >= images.length) return;

        currentImgIndexes[projectId] = index;
        updateProjectUI(projectId);
    };

    window.navigateProjectImages = function(projectId, direction) {
        const images = projectImages[projectId];
        if (!images) return;

        let index = currentImgIndexes[projectId] + direction;
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;

        currentImgIndexes[projectId] = index;
        updateProjectUI(projectId);
    };

    function updateProjectUI(projectId) {
        const mainImg = document.getElementById(`${projectId}-main`);
        const dots = document.querySelectorAll(`#${projectId}-dots .img-dot`);
        const images = projectImages[projectId];

        if (mainImg) {
            mainImg.style.opacity = '0';
            setTimeout(() => {
                mainImg.src = images[currentImgIndexes[projectId]];
                mainImg.style.opacity = '1';
            }, 300);
        }

        dots.forEach((dot, idx) => {
            if (idx === currentImgIndexes[projectId]) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // --- Smooth Scrolling for Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    // --- CV Modal Logic ---
    const cvModal = document.getElementById('cvModal');
    const viewCvBtn = document.getElementById('viewCvBtn');
    const closeCvBtn = document.getElementById('closeCvBtn');
    const modalOverlay = cvModal.querySelector('.modal-overlay');

    if (cvModal && viewCvBtn && closeCvBtn) {
        const openModal = () => {
            cvModal.classList.add('active');
            document.body.classList.add('modal-open');
        };

        const closeModal = () => {
            cvModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        };

        viewCvBtn.addEventListener('click', openModal);
        closeCvBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && cvModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // --- Academic Modal Logic ---
    const academicModal = document.getElementById('academicModal');
    const viewAcademicBtn = document.getElementById('viewAcademicBtn');
    const closeAcademicBtn = document.getElementById('closeAcademicBtn');

    if (academicModal && viewAcademicBtn && closeAcademicBtn) {
        const academicOverlay = academicModal.querySelector('.modal-overlay');

        const openAcademicModal = () => {
            academicModal.classList.add('active');
            document.body.classList.add('modal-open');
        };

        const closeAcademicModal = () => {
            academicModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        };

        viewAcademicBtn.addEventListener('click', openAcademicModal);
        closeAcademicBtn.addEventListener('click', closeAcademicModal);
        academicOverlay.addEventListener('click', closeAcademicModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && academicModal.classList.contains('active')) {
                closeAcademicModal();
            }
        });
    }
});