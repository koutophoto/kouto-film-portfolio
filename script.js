document.addEventListener('DOMContentLoaded', () => {

    // --- ハンバーガーメニュー機能 ---
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.main-nav');
    if (hamburger && nav) {
        const navLinks = nav.querySelectorAll('a');

        const toggleNav = () => {
            // 768px以下の時だけハンバーガーメニューが機能するように
            if (window.innerWidth <= 768) {
                hamburger.classList.toggle('is-active');
                nav.classList.toggle('is-active');
            }
        };

        hamburger.addEventListener('click', toggleNav);
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('is-active')) {
                    toggleNav();
                }
            });
        });
    }

    // --- 動画再生モーダル機能 ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('video-modal');
    if (galleryItems.length > 0 && modal) {
        const closeButton = modal.querySelector('.close-button');
        const youtubePlayer = document.getElementById('youtube-player');
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const youtubeId = item.getAttribute('data-youtube-id');
                if (youtubeId) {
                    youtubePlayer.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
                    modal.style.display = 'block';
                }
            });
        });
        const closeModal = () => {
            modal.style.display = 'none';
            youtubePlayer.src = '';
        };
        closeButton.addEventListener('click', closeModal);
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // --- メールアドレスコピー機能 ---
    const copyButton = document.getElementById('copy-button');
    if (copyButton) {
        const emailAddress = document.getElementById('email-address');
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(emailAddress.textContent).then(() => {
                copyButton.textContent = 'コピーしました！';
                copyButton.classList.add('copied');
                setTimeout(() => {
                    copyButton.textContent = 'コピー';
                    copyButton.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('コピーに失敗しました', err);
                copyButton.textContent = '失敗';
            });
        });
    }

    // --- 写真スライダー機能 ---
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        const track = sliderContainer.querySelector('.slider-track');
        const slides = Array.from(track.children);
        const nextButton = sliderContainer.querySelector('.slider-button.next');
        const prevButton = sliderContainer.querySelector('.slider-button.prev');
        const dotsNav = sliderContainer.querySelector('.slider-dots');
        
        // ドットが重複して作られないように初期化
        dotsNav.innerHTML = '';

        let slideWidth = slides.length > 0 ? slides[0].getBoundingClientRect().width : 0;
        let currentIndex = 0;

        if (slides.length > 0) {
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                dot.setAttribute('aria-label', `${index + 1}枚目のスライドへ`);
                dotsNav.appendChild(dot);
            });

            const dots = Array.from(dotsNav.children);

            const updateSlider = (targetIndex) => {
                if (!slides[targetIndex]) return;
                track.style.transform = `translateX(-${slideWidth * targetIndex}px)`;
                dots.forEach(dot => dot.classList.remove('active'));
                dots[targetIndex].classList.add('active');
                prevButton.style.display = (targetIndex === 0) ? 'none' : 'block';
                nextButton.style.display = (targetIndex === slides.length - 1) ? 'none' : 'block';
                currentIndex = targetIndex;
            };

            nextButton.addEventListener('click', () => {
                if (currentIndex < slides.length - 1) {
                    updateSlider(currentIndex + 1);
                }
            });

            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {
                    updateSlider(currentIndex - 1);
                }
            });

            dotsNav.addEventListener('click', e => {
                const targetDot = e.target.closest('button.dot');
                if (!targetDot) return;
                const targetIndex = dots.findIndex(dot => dot === targetDot);
                updateSlider(targetIndex);
            });

            window.addEventListener('resize', () => {
                slideWidth = slides[0].getBoundingClientRect().width;
                updateSlider(currentIndex);
            });
            
            updateSlider(0);
        }
    }

    // --- スクロールアニメーション機能 ---
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -100px 0px'
        });

        fadeElements.forEach(el => {
            observer.observe(el);
        });
    }

});