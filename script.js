const langBtn = document.getElementById('lang-toggle');

langBtn.addEventListener('click', () => {
  const currentLang = langBtn.getAttribute('data-lang');

  if (currentLang === 'es') {
    langBtn.setAttribute('data-lang', 'en');
    langBtn.textContent = 'ES'; // Muestra "ES" para volver a español
    // Aquí ejecutas tu función de traducción a Inglés
  } else {
    langBtn.setAttribute('data-lang', 'es');
    langBtn.textContent = 'EN'; // Muestra "EN" para cambiar a inglés
    // Aquí ejecutas tu función de traducción a Español
  }
});

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
      
      // Ancho visible real descontando el menú lateral (250px)
      const viewportWidth = window.innerWidth - 250; 
      
      // Distancia total que necesita desplazarse para mostrar el final
      const totalMovement = carousel.scrollWidth - viewportWidth + 150; // +150px de margen extra
      
      carousel.style.transform = `translateX(-${percentage * totalMovement}px)`;
    }
  }
});