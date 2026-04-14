


const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

 
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}


document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();
    
    if (name && email && message) {
      console.log('Form submitted:', { name, email, message });
      alert('شكراً لك! تم إرسال رسالتك بنجاح. سنرد عليك قريباً.\n\nThank you! Your message has been sent. We\'ll reply soon.');
      contactForm.reset();
    } else {
      alert('يرجى ملء جميع الحقول / Please fill all fields.');
    }
  });
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('gallery-img')) {
    const imgSrc = e.target.src;
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
      background: rgba(0,0,0,0.9); z-index: 2000; 
      display: flex; align-items: center; justify-content: center;
    `;
    modal.innerHTML = `<img src="${imgSrc}" style="max-width: 90%; max-height: 90%; border-radius: 10px;">`;
    modal.onclick = () => document.body.removeChild(modal);
    document.body.appendChild(modal);
    modal.focus();
  }
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.card, section').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

const video = document.querySelector('video');
if (video) {
  video.muted = true;
  video.play().catch(e => console.log('Autoplay prevented'));
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const nav = document.querySelector('.nav-links');
    if (nav && nav.classList.contains('active')) {
      nav.classList.remove('active');
    }
    const settingsItem = document.querySelector('.settings-item');
    if (settingsItem && settingsItem.classList.contains('active')) {
      settingsItem.classList.remove('active');
    }
  }
});

const settingsBtn = document.getElementById('settingsBtn');
const settingsItem = document.querySelector('.settings-item');
if (settingsBtn && settingsItem) {
  settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsItem.classList.toggle('active');
    settingsBtn.setAttribute('aria-expanded', settingsItem.classList.contains('active'));
  });
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.settings-item')) {
    settingsItem?.classList.remove('active');
    settingsBtn?.setAttribute('aria-expanded', 'false');
  }
});

const langSelect = document.getElementById('langSelect');
function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-ar]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.textContent = text;
  });

  const title = document.querySelector('title[data-ar]');
  if (title) document.title = title.getAttribute(`data-${lang}`);

  localStorage.setItem('language', lang);
}
if (langSelect) {
  langSelect.value = localStorage.getItem('language') || 'ar';
  langSelect.addEventListener('change', (e) => setLanguage(e.target.value));
  setLanguage(langSelect.value); // Init
}


const darkToggle = document.getElementById('darkModeToggle');
const isDark = localStorage.getItem('darkMode') === 'true';
if (darkToggle) {
  darkToggle.checked = isDark;
  if (isDark) {
    document.documentElement.classList.add('dark-theme');
  }
  darkToggle.addEventListener('change', (e) => {
    document.documentElement.classList.toggle('dark-theme', e.target.checked);
    localStorage.setItem('darkMode', e.target.checked);
  });
}

console.log('Loving Homes JS loaded successfully!');

