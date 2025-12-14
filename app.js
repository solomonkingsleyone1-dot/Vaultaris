
// ============================
// UTILITY FUNCTIONS
// ============================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================
// MOBILE MENU TOGGLE
// ============================
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ============================
// ACTIVE NAV LINK ON SCROLL
// ============================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', debounce(updateActiveNavLink, 100));

// ============================
// SCROLL PROGRESS INDICATOR
// ============================
const scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    });
}

// ============================
// SMOOTH SCROLL
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if(window.innerWidth < 768 && navLinks) {
                navLinks.classList.remove('active');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// ============================
// BACK TO TOP BUTTON
// ============================
const backToTopBtn = document.getElementById('backToTopBtn');
if (backToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================
// NOTIFICATION TOAST
// ============================
function showNotification(message, type = 'success') {
    const toast = document.getElementById('notificationToast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = `notification-toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================
// MESSAGE DEEPSEEK
// ============================
const messageBtn = document.getElementById('messageBtn');
const messageModal = document.getElementById('messageModal');
const closeModal = document.querySelector('.close-modal');
const messageForm = document.getElementById('messageForm');

if (messageBtn) {
    messageBtn.addEventListener('click', () => {
        messageModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        messageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

if (messageForm) {
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const textarea = messageForm.querySelector('textarea');
        const message = textarea.value.trim();
        
        if (message) {
            showNotification('✅ Message sent to DeepSeek! We\'ll respond soon.', 'success');
            textarea.value = '';
            messageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            showNotification('Please type a message first.', 'error');
        }
    });
}

// ============================
// DEEPTHINK SEARCH
// ============================
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const closeSearch = document.querySelector('.close-search');
const searchInput = document.getElementById('searchInput');
const searchSubmit = document.getElementById('searchSubmit');
const searchResults = document.getElementById('searchResults');
const suggestionTags = document.querySelectorAll('.suggestion-tag');

const searchDatabase = [
    {
        title: "Portfolio Management",
        description: "Customized investment strategies tailored to your financial goals.",
        category: "Services",
        keywords: ["portfolio", "management", "investment", "strategies"]
    },
    {
        title: "Market Research",
        description: "Data-driven insights and market trend analysis.",
        category: "Services",
        keywords: ["market", "research", "data", "analysis"]
    },
    {
        title: "Risk Analysis",
        description: "Advanced risk assessment for secure investment decisions.",
        category: "Services",
        keywords: ["risk", "analysis", "security", "assessment"]
    },
    {
        title: "Investment Performance",
        description: "Average annual returns of +24% with consistent growth.",
        category: "Performance",
        keywords: ["returns", "performance", "growth", "24%"]
    },
    {
        title: "Minimum Investment",
        description: "Start investing from just $50 with our flexible plans.",
        category: "FAQ",
        keywords: ["minimum", "investment", "$50", "start"]
    },
    {
        title: "Security & Insurance",
        description: "All client assets are held with SIPC-insured custodians.",
        category: "FAQ",
        keywords: ["security", "insurance", "SIPC", "protection"]
    }
];

// Open search modal
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        searchModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        setTimeout(() => searchInput.focus(), 300);
    });
}

// Close search modal
if (closeSearch) {
    closeSearch.addEventListener('click', () => {
        searchModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        searchInput.value = '';
        showInitialMessage();
    });
}

// Close modals on outside click
window.addEventListener('click', (e) => {
    if (e.target === messageModal) {
        messageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if (e.target === searchModal) {
        searchModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        searchInput.value = '';
        showInitialMessage();
    }
});

// Escape key to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (messageModal.style.display === 'flex') {
            messageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (searchModal.style.display === 'flex') {
            searchModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            searchInput.value = '';
            showInitialMessage();
        }
    }
});

// Search functions
function performSearch(query) {
    if (!query.trim()) {
        showInitialMessage();
        return;
    }
    
    const searchTerms = query.toLowerCase().split(' ');
    const results = [];
    
    searchDatabase.forEach(item => {
        let relevance = 0;
        const title = item.title.toLowerCase();
        const description = item.description.toLowerCase();
        
        searchTerms.forEach(term => {
            if (title.includes(term)) relevance += 3;
            if (description.includes(term)) relevance += 2;
            if (item.keywords.some(k => k.includes(term))) relevance += 4;
        });
        
        if (relevance > 0) {
            results.push({...item, relevance});
        }
    });
    
    results.sort((a, b) => b.relevance - a.relevance);
    displayResults(results, query);
}

function displayResults(results, query) {
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <h4><i class="fas fa-search"></i> No results found for "${query}"</h4>
                <p>Try different keywords or browse our suggestions below.</p>
            </div>
        `;
        return;
    }
    
    let html = `<div class="result-count">Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"</div>`;
    results.forEach(result => {
        html += `
            <div class="result-item">
                <h4>${result.title}</h4>
                <p>${result.description}</p>
                <span class="result-category">${result.category}</span>
            </div>
        `;
    });
    
    searchResults.innerHTML = html;
}

function showInitialMessage() {
    if (!searchResults) return;
    
    searchResults.innerHTML = `
        <div class="initial-message">
            <p><i class="fas fa-lightbulb"></i> Try searching for: 
            <button class="search-tag" data-search="portfolio">"portfolio management"</button>, 
            <button class="search-tag" data-search="market">"market research"</button>, 
            <button class="search-tag" data-search="risk">"risk analysis"</button></p>
        </div>
    `;
    
    // Add click events to search tags
    document.querySelectorAll('.search-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const searchTerm = tag.getAttribute('data-search');
            if (searchInput) searchInput.value = searchTerm;
            performSearch(searchTerm);
        });
    });
}

// Event listeners for search
if (searchSubmit) {
    searchSubmit.addEventListener('click', () => {
        if (searchInput) performSearch(searchInput.value);
    });
}

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}

// Suggestion tags
if (suggestionTags.length > 0) {
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const searchTerm = tag.getAttribute('data-search');
            if (searchInput) searchInput.value = searchTerm;
            performSearch(searchTerm);
        });
    });
}

// Initialize search
showInitialMessage();

// ============================================
// INVESTMENT LAUNCHPAD FUNCTIONALITY - NEW
// ============================================
function initInvestmentLaunchpad() {
    // Amount Presets
    const amountPresets = document.querySelectorAll('.amount-preset');
    const customAmountInput = document.getElementById('customAmount');
    const summaryAmount = document.getElementById('summaryAmount');
    const summaryProjection = document.getElementById('summaryProjection');
    const calcInitial = document.getElementById('calcInitial');
    const calcCurrent = document.getElementById('calcCurrent');
    const calcReturn = document.getElementById('calcReturn');
    const calcDaily = document.getElementById('calcDaily');
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const strategyOptions = document.querySelectorAll('.strategy-option');
    const summaryStrategy = document.getElementById('summaryStrategy');
    const summaryReturns = document.getElementById('summaryReturns');
    const startInvestmentBtn = document.getElementById('startInvestmentBtn');
    const investmentModal = document.getElementById('investmentModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const closeModalBtn2 = document.getElementById('closeModalBtn');
    const modalAmount = document.getElementById('modalAmount');
    const modalStrategy = document.getElementById('modalStrategy');
    const modalReturn = document.getElementById('modalReturn');
    const modalTotal = document.getElementById('modalTotal');
    const modalRef = document.getElementById('modalRef');

    let selectedAmount = 500;
    let selectedStrategy = 'conservative';
    let selectedPeriod = '7';

    // Investment returns by strategy (annual)
    const strategyReturns = {
        conservative: { daily: 0.242, annual: 8.5, risk: 'low' },
        balanced: { daily: 0.386, annual: 14.0, risk: 'medium' },
        aggressive: { daily: 0.548, annual: 20.0, risk: 'high' }
    };

    // Initialize
    updateInvestmentSummary();

    // Amount presets
    if (amountPresets.length > 0) {
        amountPresets.forEach(preset => {
            preset.addEventListener('click', () => {
                amountPresets.forEach(p => p.classList.remove('selected'));
                preset.classList.add('selected');
                selectedAmount = parseInt(preset.dataset.amount);
                if (customAmountInput) customAmountInput.value = selectedAmount;
                updateInvestmentSummary();
            });
        });
    }

    // Custom amount input
    if (customAmountInput) {
        customAmountInput.addEventListener('input', (e) => {
            let value = parseInt(e.target.value) || 0;
            if (value < 50) value = 50;
            if (value > 1000000) value = 1000000;
            
            selectedAmount = value;
            
            // Remove selection from presets if custom amount
            if (amountPresets.length > 0) {
                amountPresets.forEach(p => p.classList.remove('selected'));
            }
            
            updateInvestmentSummary();
        });
    }

    // Period toggle
    if (toggleButtons.length > 0) {
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                toggleButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                selectedPeriod = button.dataset.period;
                updateInvestmentSummary();
            });
        });
    }

    // Strategy selection
    if (strategyOptions.length > 0) {
        strategyOptions.forEach(option => {
            option.addEventListener('click', () => {
                strategyOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                selectedStrategy = option.dataset.strategy;
                updateInvestmentSummary();
            });
        });
    }

    // Update investment summary
    function updateInvestmentSummary() {
        const strategy = strategyReturns[selectedStrategy];
        const days = parseInt(selectedPeriod);
        
        // Calculate returns based on period
        let totalReturn, dailyReturn;
        if (days === 7) {
            totalReturn = strategy.daily * 7; // 7-day return
            dailyReturn = strategy.daily;
        } else if (days === 30) {
            totalReturn = (strategy.annual / 365) * 30; // 30-day return
            dailyReturn = strategy.annual / 365;
        } else { // 365 days (1 year)
            totalReturn = strategy.annual;
            dailyReturn = strategy.annual / 365;
        }
        
        const projectedValue = selectedAmount * (1 + totalReturn/100);
        
        // Update summary
        if (summaryAmount) summaryAmount.textContent = `$${selectedAmount.toLocaleString()}`;
        if (summaryStrategy) summaryStrategy.textContent = selectedStrategy.charAt(0).toUpperCase() + selectedStrategy.slice(1);
        if (summaryReturns) summaryReturns.textContent = `+${totalReturn.toFixed(1)}%`;
        if (summaryProjection) summaryProjection.textContent = `$${projectedValue.toFixed(2)}`;
        
        // Update calculator
        if (calcInitial) calcInitial.textContent = `$${selectedAmount.toLocaleString()}`;
        if (calcCurrent) calcCurrent.textContent = `$${projectedValue.toFixed(2)}`;
        if (calcReturn) calcReturn.textContent = `+${totalReturn.toFixed(1)}%`;
        if (calcDaily) calcDaily.textContent = `+${dailyReturn.toFixed(2)}%`;
        
        // Enable/disable start button
        if (startInvestmentBtn) {
            startInvestmentBtn.disabled = selectedAmount < 50;
        }
    }

    // Start investment
    if (startInvestmentBtn) {
        startInvestmentBtn.addEventListener('click', () => {
            if (selectedAmount < 50) {
                showNotification('Minimum investment amount is $50', 'error');
                return;
            }
            
            // Show modal with details
            if (modalAmount) modalAmount.textContent = `$${selectedAmount.toLocaleString()}`;
            if (modalStrategy) modalStrategy.textContent = selectedStrategy.charAt(0).toUpperCase() + selectedStrategy.slice(1);
            
            const strategy = strategyReturns[selectedStrategy];
            const totalReturn = strategy.daily * 7;
            const projectedValue = selectedAmount * (1 + totalReturn/100);
            
            if (modalReturn) modalReturn.textContent = `+${totalReturn.toFixed(1)}%`;
            if (modalTotal) modalTotal.textContent = `$${projectedValue.toFixed(2)}`;
            if (modalRef) modalRef.textContent = `VLT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
            
            if (investmentModal) {
                investmentModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
            
            // Send investment data to server (simulated)
            setTimeout(() => {
                showNotification(`✅ Investment of $${selectedAmount} started successfully!`, 'success');
            }, 500);
        });
    }

    // Close modal
    function closeInvestmentModal() {
        if (investmentModal) {
            investmentModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeInvestmentModal);
    }

    if (closeModalBtn2) {
        closeModalBtn2.addEventListener('click', closeInvestmentModal);
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === investmentModal) {
            closeInvestmentModal();
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && investmentModal && investmentModal.style.display === 'flex') {
            closeInvestmentModal();
        }
    });
}

// ============================================
// LIVE DASHBOARD FUNCTIONALITY
// ============================================

function initDashboard() {
    // Create charts if Chart.js is loaded
    if (window.Chart) {
        createCharts();
        initInvestmentCalculator();
    } else {
        // Wait for Chart.js to load
        setTimeout(initDashboard, 100);
    }
}

function createCharts() {
    // Growth Chart (Line Chart)
    const growthCtx = document.getElementById('growthChart');
    if (growthCtx) {
        try {
            new Chart(growthCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Portfolio Value',
                        data: [100, 115, 125, 140, 155, 180, 195, 210, 230, 250, 270, 300],
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#667eea',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            callbacks: {
                                label: function(context) {
                                    return `$${context.parsed.y}K`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            grid: { color: 'rgba(0, 0, 0, 0.05)' },
                            ticks: {
                                callback: function(value) {
                                    return '$' + value + 'K';
                                }
                            }
                        },
                        x: {
                            grid: { display: false }
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error creating growth chart:', error);
        }
    }
    
    // Allocation Chart (Doughnut Chart)
    const allocationCtx = document.getElementById('allocationChart');
    if (allocationCtx) {
        try {
            new Chart(allocationCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Tech Stocks', 'Cryptocurrency', 'Real Estate', 'Bonds'],
                    datasets: [{
                        data: [42, 28, 18, 12],
                        backgroundColor: [
                            '#667eea',
                            '#10b981',
                            '#f59e0b',
                            '#8b5cf6'
                        ],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    },
                    cutout: '70%'
                }
            });
        } catch (error) {
            console.error('Error creating allocation chart:', error);
        }
    }
    
    // Update metrics with live data (simulated)
    updateLiveMetrics();
}

function updateLiveMetrics() {
    // Simulate live updates
    const metrics = document.querySelectorAll('.metric-value');
    if (metrics.length > 0) {
        // Only set interval once
        if (!window.metricInterval) {
            window.metricInterval = setInterval(() => {
                const change = (Math.random() * 0.5 - 0.25).toFixed(2);
                if (metrics[0]) {
                    const currentValue = parseFloat(metrics[0].textContent.replace('+', '').replace('%', ''));
                    const newValue = currentValue + parseFloat(change);
                    metrics[0].textContent = `${newValue >= 0 ? '+' : ''}${newValue.toFixed(2)}%`;
                    metrics[0].className = `metric-value ${newValue >= 0 ? 'positive' : ''}`;
                }
                
                // Update dollar values based on percentage
                const dollarChange = Math.floor(Math.random() * 5000 + 500);
                const changeElements = document.querySelectorAll('.metric-change');
                if (changeElements[0]) {
                    const currentDollar = parseInt(changeElements[0].textContent.replace('+$', '').replace(',', ''));
                    const newDollar = currentDollar + dollarChange;
                    changeElements[0].textContent = `+$${newDollar.toLocaleString()}`;
                }
            }, 10000); // Update every 10 seconds
        }
    }
}

// Investment Calculator - FIXED VERSION
function initInvestmentCalculator() {
    const investmentSelect = document.getElementById('investmentAmount');
    const calculatorResults = document.getElementById('calculatorResults');
    const calcInitial = document.getElementById('calcInitial');
    const calcCurrent = document.getElementById('calcCurrent');
    const calcReturn = document.getElementById('calcReturn');
    const calcDaily = document.getElementById('calcDaily');
    const dailyValues = document.getElementById('dailyValues');
    
    if (investmentSelect && calculatorResults) {
        investmentSelect.addEventListener('change', function() {
            const value = parseFloat(this.value);
            if (!isNaN(value) && value > 0) {
                // Calculate 7-day return (1.7% average)
                const dailyReturn = 1.7 / 7; // ~0.242857% per day
                const finalValue = value * (1 + 1.7/100);
                const dailyGain = value * (dailyReturn/100);
                
                // Update display
                if (calcInitial) calcInitial.textContent = `$${value.toLocaleString()}`;
                if (calcCurrent) calcCurrent.textContent = `$${finalValue.toFixed(2)}`;
                if (calcReturn) calcReturn.textContent = `+1.7%`;
                if (calcDaily) calcDaily.textContent = `+${dailyReturn.toFixed(2)}%`;
                
                // Generate daily values
                if (dailyValues) {
                    let dailyHTML = '';
                    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                    let currentValue = value;
                    
                    days.forEach(day => {
                        const dailyChange = Math.random() * 0.5 + 0.1; // 0.1% to 0.6%
                        currentValue = currentValue * (1 + dailyChange/100);
                        const isPositive = Math.random() > 0.3; // 70% chance positive
                        
                        dailyHTML += `
                            <div class="day-value ${isPositive ? 'positive' : 'negative'}">
                                ${isPositive ? '+' : '-'}${dailyChange.toFixed(2)}%
                            </div>
                        `;
                    });
                    
                    dailyValues.innerHTML = dailyHTML;
                }
                
                calculatorResults.classList.add('show');
                showNotification(`7-day projection: $${value} → $${finalValue.toFixed(2)}`, 'success');
            } else {
                calculatorResults.classList.remove('show');
            }
        });
        
        // Initialize with default
        if (investmentSelect.value) {
            investmentSelect.dispatchEvent(new Event('change'));
        }
    }
}

// ============================
// FAQ ACCORDION FUNCTIONALITY
// ============================
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        console.log('Initializing FAQ accordion...');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (question && answer) {
                question.addEventListener('click', () => {
                    // Close all other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            if (otherAnswer) {
                                otherAnswer.style.maxHeight = null;
                            }
                        }
                    });
                    
                    // Toggle current item
                    const isActive = item.classList.contains('active');
                    item.classList.toggle('active');
                    
                    if (!isActive) {
                        // Opening
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    } else {
                        // Closing
                        answer.style.maxHeight = null;
                    }
                });
            }
        });
        
        // Auto-open first question
        if (faqItems.length > 0) {
            const firstItem = faqItems[0];
            const firstAnswer = firstItem.querySelector('.faq-answer');
            if (firstItem && firstAnswer) {
                firstItem.classList.add('active');
                firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
            }
        }
        
        console.log('FAQ accordion initialized successfully');
    }
}

// ============================
// TESTIMONIALS CAROUSEL
// ============================
function initTestimonialsCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (slides.length === 0) {
        console.log('No testimonial slides found');
        return;
    }
    
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.display = 'none';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
            slides[index].style.display = 'block';
        }
        
        // Activate corresponding dot
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        showSlide(prevIndex);
    }
    
    function startAutoSlide() {
        if (!slideInterval) {
            slideInterval = setInterval(nextSlide, slideDuration);
        }
    }
    
    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }
    
    // Initialize first slide
    showSlide(0);
    startAutoSlide();
    
    // Event listeners for navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }
    
    // Event listeners for dots
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoSlide();
                showSlide(index);
                startAutoSlide();
            });
        });
    }
    
    // Pause auto-slide on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', stopAutoSlide);
        testimonialSlider.addEventListener('mouseleave', startAutoSlide);
        
        // Also pause on touch devices
        testimonialSlider.addEventListener('touchstart', stopAutoSlide);
        testimonialSlider.addEventListener('touchend', startAutoSlide);
    }
    
    console.log('Testimonials carousel initialized successfully');
}

// ============================
// ENHANCED CONTACT FORM WITH FORMSPREE
// ============================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.log('Contact form not found - skipping form initialization');
        return;
    }

    console.log('Initializing enhanced contact form with Formspree...');

    // Form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const investmentSelect = document.getElementById('investmentAmount');
    const submitBtn = contactForm.querySelector('.btn-submit');
    const btnText = contactForm.querySelector('.btn-text');
    const btnLoader = contactForm.querySelector('.btn-loader');
    const formMessage = document.getElementById('formMessage');

    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Real-time validation for required fields
    if (nameInput && emailInput && messageInput && investmentSelect) {
        [nameInput, emailInput, messageInput, investmentSelect].forEach(input => {
            input.addEventListener('input', function() {
                validateField(this);
                updateSubmitButton();
            });
            
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }

    // Field validation with success state
    function validateField(field) {
        const value = field.value.trim();
        const errorElement = document.getElementById(field.id + 'Error');
        const formGroup = field.closest('.form-group');
        
        if (errorElement && formGroup) {
            // Reset states
            field.classList.remove('error');
            formGroup.classList.remove('success');
            errorElement.textContent = '';

            if (field.required && !value) {
                field.classList.add('error');
                errorElement.textContent = 'This field is required';
                return false;
            }

            if (field.type === 'email' && value && !emailPattern.test(value)) {
                field.classList.add('error');
                errorElement.textContent = 'Please enter a valid email address';
                return false;
            }

            if (field.id === 'message' && value && value.length < 20) {
                field.classList.add('error');
                errorElement.textContent = 'Please provide more details (at least 20 characters)';
                return false;
            }

            // If field is valid and has value, add success state
            if (value) {
                formGroup.classList.add('success');
            }
        }

        return true;
    }

    // Update submit button state
    function updateSubmitButton() {
        if (!nameInput || !emailInput || !messageInput || !investmentSelect || !submitBtn) return;
        
        const isFormValid = 
            nameInput.value.trim() && 
            emailInput.value.trim() && 
            emailPattern.test(emailInput.value.trim()) && 
            messageInput.value.trim().length >= 20 &&
            investmentSelect.value.trim();
        
        submitBtn.disabled = !isFormValid;
    }

    // Form submission with Formspree
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        console.log('Form submission started...');
        
        // Validate all required fields
        const isNameValid = validateField(nameInput);
        const isEmailValid = validateField(emailInput);
        const isMessageValid = validateField(messageInput);
        const isInvestmentValid = validateField(investmentSelect);
        
        if (!isNameValid || !isEmailValid || !isMessageValid || !isInvestmentValid) {
            showMessage('Please fill in all required fields correctly.', 'error');
            return;
        }

        // Show loading state
        if (btnText && btnLoader) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
        }
        if (submitBtn) submitBtn.disabled = true;

        try {
            console.log('Submitting to Formspree...');
            
            // Submit to Formspree using FormData
            const formData = new FormData(contactForm);
            
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                showMessage('✅ Thank you! Your consultation request has been sent. Our investment advisor will contact you within 24 hours.', 'success');
                console.log('Form submitted successfully to Formspree');
                
                // Show toast notification
                showNotification('✅ Consultation request sent successfully!', 'success');
                
                // Reset form
                contactForm.reset();
                updateSubmitButton();
                
                // Remove success states
                document.querySelectorAll('.form-group.success').forEach(group => {
                    group.classList.remove('success');
                });
                
            } else {
                // Formspree error
                console.error('Formspree error response:', response.status);
                showMessage('⚠️ Something went wrong with the submission. Please try again or contact us directly.', 'error');
                showNotification('⚠️ Submission failed. Please try again.', 'error');
            }
            
        } catch (error) {
            console.error('Network error:', error);
            showMessage('❌ Network error. Please check your connection and try again.', 'error');
            showNotification('❌ Network error. Please check your connection.', 'error');
            
        } finally {
            // Reset button state
            if (btnText && btnLoader) {
                btnText.style.display = 'inline-block';
                btnLoader.style.display = 'none';
            }
            if (submitBtn) submitBtn.disabled = false;
        }
    });

    // Show message
    function showMessage(text, type) {
        if (!formMessage) return;
        
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        // Hide message after 8 seconds for success, 10 for error
        const hideTime = type === 'success' ? 8000 : 10000;
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, hideTime);
    }

    // Initialize button state
    updateSubmitButton();
    console.log('Contact form with Formspree initialized successfully');
}

// ============================
// TOOLTIP FUNCTIONALITY
// ============================
function initTooltips() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltipText = this.querySelector('.tooltip-text');
            if (tooltipText) {
                tooltipText.style.visibility = 'visible';
                tooltipText.style.opacity = '1';
            }
        });
        
        tooltip.addEventListener('mouseleave', function() {
            const tooltipText = this.querySelector('.tooltip-text');
            if (tooltipText) {
                tooltipText.style.visibility = 'hidden';
                tooltipText.style.opacity = '0';
            }
        });
        
        // For touch devices
        tooltip.addEventListener('click', function(e) {
            if (window.innerWidth < 768) {
                e.preventDefault();
                const tooltipText = this.querySelector('.tooltip-text');
                if (tooltipText) {
                    const isVisible = tooltipText.style.visibility === 'visible';
                    tooltipText.style.visibility = isVisible ? 'hidden' : 'visible';
                    tooltipText.style.opacity = isVisible ? '0' : '1';
                }
            }
        });
    });
}

// ============================
// INITIALIZE ALL FEATURES
// ============================
function initializeAllFeatures() {
    console.log('Vaultaris Website - Initializing all features...');
    
    // Initialize features in order
    updateActiveNavLink(); // Initial active nav link
    initDashboard();
    initInvestmentLaunchpad(); // NEW: Investment launchpad
    initFAQAccordion();
    initTestimonialsCarousel();
    initContactForm();
    initTooltips();
    initInvestmentCalculator();
    
    console.log('All features initialized successfully!');
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAllFeatures);
} else {
    // DOM already loaded
    initializeAllFeatures();
    }
