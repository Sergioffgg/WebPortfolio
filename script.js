
window.addEventListener('scroll', () => {
  const profileContainer = document.querySelector('.profile-container');
  
  if (profileContainer) {
    if (window.scrollY > 40) {
      profileContainer.classList.add('is-scrolled');
    } else {
      profileContainer.classList.remove('is-scrolled');
    }
  }
});

window.addEventListener('scroll', () => {
  const wrapper = document.querySelector('.projects-wrapper');
  const carousel = document.querySelector('.projects-carousel');

  if (wrapper && carousel) {
    const wrapperTop = wrapper.offsetTop;
    const wrapperHeight = wrapper.offsetHeight;
    const windowHeight = window.innerHeight;

    const maxScrollDistance = wrapperHeight - windowHeight;
    const currentScroll = window.scrollY - wrapperTop;

    if (currentScroll >= 0 && currentScroll <= maxScrollDistance) {
      const percentage = currentScroll / maxScrollDistance;
      
      const viewportWidth = window.innerWidth - 250; 
      
      const totalMovement = carousel.scrollWidth - viewportWidth + 150;
      
      carousel.style.transform = `translateX(-${percentage * totalMovement}px)`;
    }
  }
});

let toastTimeout;

function showToast(message, duration = 2500) {
  const toast = document.getElementById('custom-toast');
  const toastText = document.getElementById('toast-text');
  const borderRect = toast.querySelector('.toast-border-rect');

  if (!toast || !toastText) return;

  clearTimeout(toastTimeout);
  toast.classList.remove('show');
  
  borderRect.style.animation = 'none';
  borderRect.offsetHeight;
  borderRect.style.animation = '';

  toastText.textContent = message;
  toast.classList.add('show');

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}



let currentLang = localStorage.getItem('preferredLang') || 'es';
let translations = {};
async function loadTranslations() {
  try {
    const response = await fetch('lang.json');
    translations = await response.json();
    applyLanguage(currentLang);
  } catch (error) {
    console.error('Error cargando las traducciones:', error);
    showToast("Error");
  }
}
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('preferredLang', lang);

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.setAttribute('data-lang', lang);
    langBtn.textContent = lang === 'es' ? 'EN' : 'ES';
  }
}
document.addEventListener('DOMContentLoaded', () => {
  loadTranslations();

  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const newLang = currentLang === 'es' ? 'en' : 'es';
      applyLanguage(newLang);
    });
  }
});