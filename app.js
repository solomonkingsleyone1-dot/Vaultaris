// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.background = 'white';
    navLinks.style.padding = '1rem';
    navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
});

// Form submission
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input').value;
    alert(`Thank you! We'll contact you at ${email} soon.`);
    form.reset();
});

// Smooth scroll for navigation links
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
            if(window.innerWidth < 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});
// ============================
// BACK TO TOP BUTTON FUNCTIONALITY
// ============================

// Get the button
const backToTopBtn = document.getElementById('backToTopBtn');

// Show the button when user scrolls down 300px
window.addEventListener('scroll', function() {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'flex';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

// Smooth scroll to top when clicked
backToTopBtn.addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
// ============================
// MOBILE MENU TOGGLE
// ============================
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

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
// ============================================
// MESSAGE DEEPSEEK FUNCTIONALITY
// ============================================

// Message DeepSeek Widget
const messageBtn = document.getElementById('messageBtn');
const messageModal = document.getElementById('messageModal');
const closeModal = document.querySelector('.close-modal');
const messageForm = document.getElementById('messageForm');

// Open modal
if (messageBtn) {
  messageBtn.addEventListener('click', () => {
    messageModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  });
}

// Close modal
if (closeModal) {
  closeModal.addEventListener('click', () => {
    messageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
}

// Close if click outside modal
window.addEventListener('click', (e) => {
  if (e.target === messageModal) {
    messageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Handle form submit
if (messageForm) {
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const textarea = messageForm.querySelector('textarea');
    const message = textarea.value.trim();
    
    if (message) {
      // In a real app, you would send this to a server
      console.log('Message to DeepSeek:', message);
      
      // Show success message
      alert('✅ Message sent to DeepSeek! We\'ll respond soon.');
      
      // Clear form and close modal
      textarea.value = '';
      messageModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    } else {
      alert('Please type a message first.');
    }
  });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && messageModal.style.display === 'flex') {
    messageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});
// ============================================
// DEEPTHINK SEARCH FUNCTIONALITY
// ============================================

// Search Elements
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const closeSearch = document.querySelector('.close-search');
const searchInput = document.getElementById('searchInput');
const searchSubmit = document.getElementById('searchSubmit');
const searchResults = document.getElementById('searchResults');
const suggestionTags = document.querySelectorAll('.suggestion-tag');

// Sample search data (based on your website content)
const searchDatabase = [
  {
    title: "Portfolio Management",
    description: "Customized investment strategies tailored to your financial goals and risk tolerance.",
    category: "Services",
    keywords: ["portfolio", "management", "investment", "strategies", "customized"]
  },
  {
    title: "Market Research",
    description: "Data-driven insights and market trend analysis to inform investment decisions.",
    category: "Services",
    keywords: ["market", "research", "data", "analysis", "trends", "insights"]
  },
  {
    title: "Risk Analysis",
    description: "Advanced risk assessment tools for secure investment decisions and portfolio protection.",
    category: "Services",
    keywords: ["risk", "analysis", "security", "assessment", "protection", "safe"]
  },
  {
    title: "Investment Performance",
    description: "Average annual returns of +24% with consistent growth across market conditions.",
    category: "Performance",
    keywords: ["returns", "performance", "growth", "profit", "earnings", "24%"]
  },
  {
    title: "Client Success",
    description: "Over 1500+ satisfied clients with personalized investment solutions.",
    category: "About",
    keywords: ["clients", "success", "satisfied", "1500", "personalized", "solutions"]
  },
  {
    title: "Security & Uptime",
    description: "99.8% security uptime with advanced encryption and monitoring systems.",
    category: "Security",
    keywords: ["security", "uptime", "99.8%", "encryption", "monitoring", "safe"]
  },
  {
    title: "Getting Started",
    description: "Begin your investment journey with a free consultation and personalized plan.",
    category: "Contact",
    keywords: ["start", "begin", "consultation", "free", "journey", "plan"]
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
    closeSearchModal();
  });
}

function closeSearchModal() {
  searchModal.style.display = 'none';
  document.body.style.overflow = 'auto';
  searchInput.value = '';
  showInitialMessage();
}

// Close modal on outside click
window.addEventListener('click', (e) => {
  if (e.target === searchModal) {
    closeSearchModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && searchModal.style.display === 'flex') {
    closeSearchModal();
  }
});

// Perform search
function performSearch(query) {
  if (!query.trim()) {
    showInitialMessage();
    return;
  }
  
  const searchTerms = query.toLowerCase().split(' ');
  const results = [];
  
  // Search through database
  searchDatabase.forEach(item => {
    let relevance = 0;
    const title = item.title.toLowerCase();
    const description = item.description.toLowerCase();
    const keywords = item.keywords.map(k => k.toLowerCase());
    
    searchTerms.forEach(term => {
      if (title.includes(term)) relevance += 3;
      if (description.includes(term)) relevance += 2;
      if (keywords.includes(term)) relevance += 4;
    });
    
    if (relevance > 0) {
      results.push({...item, relevance});
    }
  });
  
  // Sort by relevance
  results.sort((a, b) => b.relevance - a.relevance);
  
  // Display results
  displayResults(results, query);
}

// Display search results
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
  
  let html = '';
  results.forEach(result => {
    html += `
      <div class="result-item">
        <h4>${result.title}</h4>
        <p>${result.description}</p>
        <span class="result-category">${result.category}</span>
      </div>
    `;
  });
  
  // Add result count
  html = `<div class="result-count">Found ${results.length} result${results.length !== 1 ? 's' : ''}</div>` + html;
  
  searchResults.innerHTML = html;
}

// Show initial message
function showInitialMessage() {
  searchResults.innerHTML = `
    <div class="initial-message">
      <p><i class="fas fa-lightbulb"></i> Try searching for: <span class="search-tags" onclick="searchFromTag('portfolio management')">"portfolio management"</span>, <span class="search-tags" onclick="searchFromTag('market research')">"market research"</span>, <span class="search-tags" onclick="searchFromTag('investment returns')">"investment returns"</span></p>
    </div>
  `;
}

// Search from tag click
window.searchFromTag = function(searchTerm) {
  searchInput.value = searchTerm;
  performSearch(searchTerm);
};

// Event listeners
if (searchSubmit) {
  searchSubmit.addEventListener('click', () => {
    performSearch(searchInput.value);
  });
}

if (searchInput) {
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch(searchInput.value);
    }
  });
  
  // Real-time search (optional)
  searchInput.addEventListener('input', (e) => {
    if (e.target.value.length >= 3) {
      performSearch(e.target.value);
    } else if (e.target.value.length === 0) {
      showInitialMessage();
    }
  });
}

// Suggestion tags
suggestionTags.forEach(tag => {
  tag.addEventListener('click', () => {
    const searchTerm = tag.getAttribute('data-search');
    searchInput.value = searchTerm;
    performSearch(searchTerm);
  });
});
