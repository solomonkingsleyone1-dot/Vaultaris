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
