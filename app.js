/* ===================================================
   LUMINA LIBRARY – JavaScript
   =================================================== */

// ─── Navbar scroll effect ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ─── Hamburger menu ───
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
// close on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ─── Active nav link on scroll ───
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 90;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinkEls.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// ─── Section filter ───
const filterBtns = document.querySelectorAll('.filter-btn');
const sectionCards = document.querySelectorAll('.section-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    sectionCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = 'fadeInUp 0.4s ease both';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ─── Live clock ───
function updateClock() {
  const now = new Date();
  const hrs  = now.getHours();
  const mins = now.getMinutes();
  const secs = now.getSeconds();

  // Analog hands
  const hourDeg = (hrs % 12) * 30 + mins * 0.5;
  const minDeg  = mins * 6 + secs * 0.1;
  const secDeg  = secs * 6;

  const hourHand = document.getElementById('hourHand');
  const minHand  = document.getElementById('minHand');
  const secHand  = document.getElementById('secHand');
  if (hourHand) hourHand.style.transform = `rotate(${hourDeg}deg)`;
  if (minHand)  minHand.style.transform  = `rotate(${minDeg}deg)`;
  if (secHand)  secHand.style.transform  = `rotate(${secDeg}deg)`;

  // Digital time
  const pad = n => String(n).padStart(2, '0');
  const ampm = hrs >= 12 ? 'PM' : 'AM';
  const h12  = hrs % 12 || 12;
  const digitalTime = document.getElementById('digitalTime');
  if (digitalTime) digitalTime.textContent = `${pad(h12)}:${pad(mins)}:${pad(secs)} ${ampm}`;

  // Date
  const days  = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const digitalDate = document.getElementById('digitalDate');
  if (digitalDate) {
    digitalDate.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  }
}
updateClock();
setInterval(updateClock, 1000);

// ─── Intersection Observer (scroll animations) ───
const animEls = document.querySelectorAll(
  '.section-card, .facility-item, .timing-card, .rule-item, .contact-item'
);
animEls.forEach(el => el.classList.add('animate-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (Array.from(animEls).indexOf(entry.target) % 4));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animEls.forEach(el => observer.observe(el));

// ─── Contact form ───
function handleContact(e) {
  e.preventDefault();
  const name = document.getElementById('inputName').value.trim();
  const email = document.getElementById('inputEmail').value.trim();
  const msg   = document.getElementById('inputMessage').value.trim();
  const feedback = document.getElementById('msgFeedback');

  if (!name || !email || !msg) {
    feedback.style.display = 'block';
    feedback.style.background = 'rgba(239,68,68,0.1)';
    feedback.style.borderColor = 'rgba(239,68,68,0.25)';
    feedback.style.color = '#fca5a5';
    feedback.textContent = '⚠️ Please fill in all fields before sending.';
    return;
  }
  feedback.style.display = 'block';
  feedback.style.background = 'rgba(16,185,129,0.1)';
  feedback.style.borderColor = 'rgba(16,185,129,0.25)';
  feedback.style.color = '#6ee7b7';
  feedback.textContent = `✅ Thank you, ${name}! We'll get back to you at ${email} shortly.`;
  document.getElementById('inputName').value = '';
  document.getElementById('inputEmail').value = '';
  document.getElementById('inputMessage').value = '';
}

// ─── Smooth hero badge breathing glow ───
const heroBadge = document.querySelector('.hero-badge');
if (heroBadge) {
  setInterval(() => {
    heroBadge.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px rgba(139,92,246,0.3)`;
  }, 1500);
}

// ─── Scroll reveal for section header ───
const sectionHeaders = document.querySelectorAll('.section-header');
const headerObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.7s ease both';
      headerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
sectionHeaders.forEach(h => headerObserver.observe(h));

// ─── Easter egg: Konami code ───
let konamiIndex = 0;
const konamiCode = [38,38,40,40,37,39,37,39,66,65]; // ↑↑↓↓←→←→BA
document.addEventListener('keydown', e => {
  if (e.keyCode === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      konamiIndex = 0;
      document.body.style.transition = 'filter 0.5s';
      document.body.style.filter = 'hue-rotate(120deg)';
      setTimeout(() => { document.body.style.filter = ''; }, 3000);
    }
  } else {
    konamiIndex = 0;
  }
});

console.log(
  '%c📚 Lumina Library ',
  'background: linear-gradient(135deg, #8b5cf6, #ec4899); color: white; font-size: 16px; font-weight: bold; padding: 8px 16px; border-radius: 8px;'
);
console.log('%c Welcome, knowledge seeker! Try the Konami Code: ↑↑↓↓←→←→BA 🎉', 'color: #a78bfa; font-size: 12px;');
