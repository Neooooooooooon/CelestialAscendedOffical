// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initCountdown();
    initMobileMenu();
    initTitleAnimations();
    initConstellation();
    initProgressAnimation();
    initLogoAnimations();
    initSmoothScrolling();
});

// Матричные созвездия
function initConstellation() {
    const container = document.getElementById('constellation');
    if (!container) return;
    
    const starCount = 80;
    const stars = [];
    
    // Очищаем контейнер
    container.innerHTML = '';
    
    // Создание звезд
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Случайная позиция
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        star.style.left = x + '%';
        star.style.top = y + '%';
        
        // Размер
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Яркость
        star.style.opacity = Math.random() * 0.5 + 0.3;
        
        // Цвет
        const colors = ['#ffffff', '#00ccff', '#ff3366', '#ffd700'];
        star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Анимация
        star.style.animation = `floatSlow ${Math.random() * 10 + 5}s infinite alternate`;
        
        container.appendChild(star);
        stars.push({element: star, x: x, y: y});
    }
    
    // Создание соединений между близкими звездами
    stars.forEach((star1, i) => {
        stars.forEach((star2, j) => {
            if (i < j) {
                const dx = star1.x - star2.x;
                const dy = star1.y - star2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Соединяем только близкие звезды
                if (distance < 15) {
                    const connection = document.createElement('div');
                    connection.className = 'connection';
                    
                    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                    
                    connection.style.width = distance + '%';
                    connection.style.left = star1.x + '%';
                    connection.style.top = star1.y + '%';
                    connection.style.transform = `rotate(${angle}deg)`;
                    connection.style.opacity = 0.3 - (distance / 15) * 0.2;
                    
                    container.appendChild(connection);
                }
            }
        });
    });
}

// Простые частицы
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
    
    function createParticle(parent) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайная позиция
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        // Размер
        const size = Math.random() * 2 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Цвет
        const colors = ['#ffffff', '#00ccff', '#ff3366'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        
        // Анимация
        const duration = Math.random() * 10 + 5;
        const x = Math.random() * 100 - 50;
        const y = Math.random() * 100 - 50;
        
        particle.style.setProperty('--float-x', x + 'px');
        particle.style.setProperty('--float-y', y + 'px');
        particle.style.animation = `float ${duration}s linear infinite`;
        
        parent.appendChild(particle);
    }
}

// Обратный отсчёт до лета 2026
function initCountdown() {
    // Устанавливаем дату релиза на 1 июня 2026
    const releaseDate = new Date('June 1, 2026 00:00:00').getTime();
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = releaseDate - now;
        
        if (timeLeft < 0) {
            daysElement.textContent = '000';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        daysElement.textContent = days.toString().padStart(3, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        // Динамический прогресс
        const startDate = new Date('January 1, 2024').getTime();
        const totalTime = releaseDate - startDate;
        const timePassed = now - startDate;
        const progress = Math.min(78, Math.max(65, Math.floor((timePassed / totalTime) * 100)));
        
        const progressPercent = document.getElementById('progress-percent');
        const progressFill = document.getElementById('progress-fill');
        
        if (progressPercent && progressFill) {
            progressPercent.textContent = progress + '%';
            progressFill.style.width = progress + '%';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Анимации для заголовка
function initTitleAnimations() {
    const evolutionText = document.getElementById('evolution-text');
    const throughText = document.getElementById('through-text');
    const ascensionText = document.getElementById('ascension-text');
    
    if (!evolutionText || !throughText || !ascensionText) return;
    
    // Добавляем классы анимации
    evolutionText.classList.add('animated-title');
    throughText.classList.add('animated-title');
    ascensionText.classList.add('animated-title');
    
    // Создаем элемент вспышки для "ВОЗНЕСЕНИЕ"
    const ascensionFlash = document.createElement('div');
    ascensionFlash.className = 'ascension-flash';
    
    const ascensionGlow = document.createElement('div');
    ascensionGlow.className = 'ascension-glow';
    
    const ascensionContainer = ascensionText.parentElement;
    ascensionContainer.style.position = 'relative';
    ascensionContainer.appendChild(ascensionFlash);
    ascensionContainer.appendChild(ascensionGlow);
    
    // Запускаем анимацию вспышки с задержкой
    setTimeout(() => {
        ascensionFlash.style.animation = 'ascensionFlash 1s ease forwards';
        ascensionGlow.style.animation = 'ascensionGlow 2s infinite alternate';
        
        // Убираем вспышку после анимации
        setTimeout(() => {
            ascensionFlash.style.display = 'none';
        }, 1000);
    }, 1500);
    
    // Эффект непрерывного свечения для "ВОЗНЕСЕНИЕ"
    setInterval(() => {
        const intensity = 0.5 + Math.random() * 0.5;
        ascensionText.style.textShadow = 
            `0 0 ${20 * intensity}px rgba(255, 255, 255, 0.8),
             0 0 ${40 * intensity}px rgba(255, 255, 255, 0.5),
             0 0 ${60 * intensity}px rgba(0, 204, 255, 0.3)`;
    }, 500);
}

// Мобильное меню
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 900) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 900 && 
            !event.target.closest('.nav-menu') && 
            !event.target.closest('.menu-toggle') &&
            navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Анимация прогресс-бара
function initProgressAnimation() {
    const progressFill = document.getElementById('progress-fill');
    if (!progressFill) return;
    
    // Запускаем анимацию мерцания
    setInterval(() => {
        progressFill.style.animation = 'shimmer 2s infinite';
    }, 2000);
}

// Анимации для логотипов
function initLogoAnimations() {
    // Добавляем вращение логотипам при наведении
    const logos = document.querySelectorAll('.game-logo-small, .game-logo-footer');
    logos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.5s ease';
            this.style.transform = 'rotate(10deg) scale(1.1)';
            this.style.boxShadow = '0 0 30px rgba(0, 204, 255, 0.6)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
            this.style.boxShadow = '0 0 20px rgba(0, 204, 255, 0.3)';
        });
    });
    
    // Эффект пульсации для основного логотипа
    const mainLogo = document.querySelector('.ced-logo-large.pulsing');
    if (mainLogo) {
        setInterval(() => {
            const scale = 1 + Math.sin(Date.now() / 1000) * 0.02;
            const opacity = 0.3 + Math.sin(Date.now() / 800) * 0.2;
            
            mainLogo.style.transform = `scale(${scale})`;
            mainLogo.style.boxShadow = 
                `0 0 ${40 + Math.sin(Date.now() / 700) * 20}px rgba(255, 215, 0, ${opacity}),
                 0 0 ${80 + Math.sin(Date.now() / 800) * 30}px rgba(0, 204, 255, ${opacity * 0.7})`;
        }, 50);
    }
}

// Плавная прокрутка для якорных ссылок
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Закрытие мобильного меню
                if (window.innerWidth <= 900) {
                    const navMenu = document.querySelector('.nav-menu');
                    const menuToggle = document.querySelector('.menu-toggle');
                    if (navMenu && menuToggle) {
                        navMenu.classList.remove('active');
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            }
        });
    });
}

// Эффект параллакса для фона
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const stars = document.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
        const speed = 0.1 + (index % 3) * 0.05;
        const yPos = -(scrolled * speed);
        star.style.transform = `translateY(${yPos}px)`;
    });
});

// Добавляем обработчик для перерисовки созвездий при изменении размера окна
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initConstellation, 250);
});

// Дополнительные эффекты для заголовков при скролле
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const glowingTitles = document.querySelectorAll('.glowing-title');
    
    glowingTitles.forEach(title => {
        const rect = title.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            const intensity = 1 - (rect.top / window.innerHeight);
            const glowIntensity = Math.max(0.5, intensity);
            
            title.style.textShadow = 
                `0 0 ${10 * glowIntensity}px rgba(255, 255, 255, 0.7),
                 0 0 ${20 * glowIntensity}px rgba(255, 255, 255, 0.5),
                 0 0 ${30 * glowIntensity}px rgba(255, 255, 255, 0.3)`;
        }
    });
});