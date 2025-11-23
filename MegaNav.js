// MegaNav.js

// 1. Стили меню (CSS)
const navStyles = `
    .mega-nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .nav-container {
        max-width: 1400px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        padding: 0 20px;
        height: 70px;
    }
    .nav-logo {
        font-size: 24px;
        font-weight: 700;
        color: #667eea;
        text-decoration: none;
        margin-right: 40px;
    }
    .nav-menu {
        display: flex;
        list-style: none;
        gap: 5px;
        flex: 1;
    }
    .nav-item {
        position: relative;
    }
    .nav-link {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 10px 18px;
        color: #333;
        text-decoration: none;
        font-weight: 500;
        font-size: 15px;
        border-radius: 8px;
        transition: all 0.2s;
    }
    .nav-link:hover {
        background: #f0f0f0;
        color: #667eea;
    }
    /* DROPDOWN STYLES */
    .dropdown-arrow {
        font-size: 12px;
        transition: transform 0.3s;
    }
    .nav-item:hover .dropdown-arrow {
        transform: rotate(180deg);
    }
    .mega-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        margin-top: 10px;
        min-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
    }
    .nav-item:hover .mega-dropdown {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    .mega-content {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;
        padding: 30px;
    }
    .mega-section {
        display: flex;
        flex-direction: column;
    }
    .mega-section-title {
        font-size: 13px;
        font-weight: 700;
        color: #667eea;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 15px;
    }
    .mega-links {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .mega-link {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        color: #333;
        text-decoration: none;
        border-radius: 6px;
        transition: all 0.2s;
        font-size: 14px;
    }
    .mega-link:hover {
        background: #f8f9ff;
        color: #667eea;
        padding-left: 16px;
    }
    .mobile-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #333;
        margin-left: auto;
    }
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        .nav-menu.mobile-active {
            display: flex;
        }
        .mobile-toggle {
            display: block;
        }
        .mega-dropdown {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            box-shadow: none;
            margin-top: 10px;
            min-width: 100%;
            display: none;
        }
        .nav-item.mobile-open .mega-dropdown {
            display: block;
        }
        .mega-content {
            grid-template-columns: 1fr;
            padding: 15px;
        }
    }
`;

// 2. HTML-разметка меню (весь тег <nav>)
const navHTML = `
    <nav class="mega-nav">
        <div class="nav-container">
            <a href="/home.html" class="nav-logo">💼 FinTools</a>
            <ul class="nav-menu" id="navMenu">
                <li class="nav-item">
                    <a href="/home.html" class="nav-link">🏠 Home</a>
                </li>
                <li class="nav-item">
                    <a href="/tax-calculators.html" class="nav-link">
                        📊 Tax Calculators
                        <span class="dropdown-arrow">▼</span>
                    </a>
                    <div class="mega-dropdown">
                        <div class="mega-content">
                            <div class="mega-section">
                                <div class="mega-section-title">🇺🇸 United States</div>
                                <div class="mega-links">
                                    <a href="/index.html" class="mega-link">
                                        <span>🇺🇸</span>Federal Tax
                                    </a>
                                    <a href="/us-states/california.html" class="mega-link">
                                        <span>🌴</span>California
                                    </a>
                                    <a href="/us-states/new-york.html" class="mega-link">
                                        <span>🗽</span>New York
                                    </a>
                                    <a href="/us-states/texas.html" class="mega-link">
                                        <span>🤠</span>Texas
                                    </a>
                                    <a href="/us-states/florida.html" class="mega-link">
                                        <span>🏖️</span>Florida
                                    </a>
                                    <a href="/us-states/washington.html" class="mega-link">
                                        <span>🌲</span>Washington
                                    </a>
                                    <a href="/us-states/arizona.html" class="mega-link">
                                        <span>🌵</span>Arizona
                                    </a>
                                </div>
                            </div>
                            
                            <div class="mega-section">
                                <div class="mega-section-title">🇪🇺 Europe</div>
                                <div class="mega-links">
                                    <a href="/europe/uk.html" class="mega-link">
                                        <span>🇬🇧</span>United Kingdom
                                    </a>
                                    <a href="/europe/germany.html" class="mega-link">
                                        <span>🇩🇪</span>Germany
                                    </a>
                                    <a href="/europe/france.html" class="mega-link">
                                        <span>🇫🇷</span>France
                                    </a>
                                    <a href="/europe/netherlands.html" class="mega-link">
                                        <span>🇳🇱</span>Netherlands
                                    </a>
                                    <a href="/europe/spain.html" class="mega-link">
                                        <span>🇪🇸</span>Spain
                                    </a>
                                    <a href="/europe/italy.html" class="mega-link">
                                        <span>🇮🇹</span>Italy
                                    </a>
                                </div>
                            </div>
                            
                            <div class="mega-section">
                                <div class="mega-section-title">🌍 Other Countries</div>
                                <div class="mega-links">
                                    <a href="/other/canada.html" class="mega-link">
                                        <span>🇨🇦</span>Canada
                                    </a>
                                    <a href="/other/australia.html" class="mega-link">
                                        <span>🇦🇺</span>Australia
                                    </a>
                                    <a href="/other/japan.html" class="mega-link">
                                        <span>🇯🇵</span>Japan
                                    </a>
                                    <a href="/other/singapore.html" class="mega-link">
                                        <span>🇸🇬</span>Singapore
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        🔧 Other Tools
                        <span class="dropdown-arrow">▼</span>
                    </a>
                    <div class="mega-dropdown">
                        <div class="mega-content">
                            <div class="mega-section">
                                <div class="mega-section-title">💰 Financial Tools</div>
                                <div class="mega-links">
                                    <a href="/loan-calculator.html" class="mega-link">
                                        <span>💰</span>Loan Calculator
                                    </a>
                                    <a href="/retirement.html" class="mega-link">
                                        <span>🏖️</span>Retirement
                                    </a>
                                    <a href="/salary-hourly.html" class="mega-link">
                                        <span>💵</span>Salary ↔ Hourly
                                    </a>
                                </div>
                            </div>
                            
                            <div class="mega-section">
                                <div class="mega-section-title">🎯 Lifestyle Tools</div>
                                <div class="mega-links">
                                    <a href="/tip-calculator.html" class="mega-link">
                                        <span>🍽️</span>Tip Calculator
                                    </a>
                                    <a href="/bmi.html" class="mega-link">
                                        <span>💪</span>BMI Calculator
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <button class="mobile-toggle" onclick="toggleMobileMenu()">☰</button>
        </div>
    </nav>
`;

// 3. Логика меню (JS для интерактивности)
function toggleMobileMenu() {
    const menu = document.getElementById('navMenu');
    if (menu) {
        menu.classList.toggle('mobile-active');
    }
}

function initNavLogic() {
    // Делаем функцию глобально доступной
    window.toggleMobileMenu = toggleMobileMenu;

    // Закрытие меню при клике вне него
    document.addEventListener('click', function(event) {
        const nav = document.querySelector('.mega-nav');
        const menu = document.getElementById('navMenu');
        if (nav && menu && !nav.contains(event.target)) {
            menu.classList.remove('mobile-active');
        }
    });

    // Мобильный клик для открытия дропдаунов
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                const link = this.querySelector('.nav-link');
                if (link && link.getAttribute('href') === '#') {
                    e.preventDefault();
                    this.classList.toggle('mobile-open');
                }
            }
        });
    });
}


// 4. Главная функция для вставки всего
function injectMegaNav() {
    // Вставка стилей
    const styleTag = document.createElement('style');
    styleTag.textContent = navStyles;
    document.head.appendChild(styleTag);

    // Вставка HTML-разметки перед <body>
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // Инициализация логики после загрузки DOM
    initNavLogic();
}

// Запускаем инъекцию, как только DOM загрузится
document.addEventListener('DOMContentLoaded', injectMegaNav);