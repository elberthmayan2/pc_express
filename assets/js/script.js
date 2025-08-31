'use strict';

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
// Usamos o optional chaining (?) para evitar erros caso o elemento não exista na página.
modalCloseOverlay?.addEventListener('click', modalCloseFunc);
modalCloseBtn?.addEventListener('click', modalCloseFunc);


// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn?.addEventListener('click', function () { // Usamos optional chaining (?)
  notificationToast.classList.add('closed');
});


// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

// Refatorado para garantir que sempre referenciamos o único menu e overlay, mesmo com múltiplos botões de abertura
const mainMobileMenuElement = mobileMenu[0]; // Pega a referência do primeiro (e único) menu mobile
const mainOverlayElement = overlay;       // Pega a referência do overlay

// Função para fechar o menu mobile e o overlay
const mobileMenuCloseFunc = function () {
  if (mainMobileMenuElement) {
    mainMobileMenuElement.classList.remove('active');
  }
  if (mainOverlayElement) {
    mainOverlayElement.classList.remove('active');
  }
};

// Adiciona event listeners a todos os botões que abrem o menu mobile
for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
  mobileMenuOpenBtn[i].addEventListener('click', function () {
    if (mainMobileMenuElement) {
      mainMobileMenuElement.classList.add('active');
    }
    if (mainOverlayElement) {
      mainOverlayElement.classList.add('active');
    }
  });
}

// Adiciona event listeners aos botões de fechamento do menu mobile
for (let i = 0; i < mobileMenuCloseBtn.length; i++) {
  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
}

// Adiciona event listener ao overlay para fechar o menu
if (mainOverlayElement) { // Garante que o overlay existe antes de adicionar o listener
  mainOverlayElement.addEventListener('click', mobileMenuCloseFunc);
}


// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
// A lógica do accordion já foi melhorada no sobre.html, replicando para cá.

for (let i = 0; i < accordionBtn.length; i++) {
  accordionBtn[i].addEventListener('click', function () {
    const submenu = this.nextElementSibling;
    const isActive = submenu.classList.contains('active');

    const parentUl = this.closest('ul');
    if (parentUl) {
      const activeMenus = parentUl.querySelectorAll('.submenu-category-list.active');
      for (let j = 0; j < activeMenus.length; j++) {
        if (activeMenus[j] !== submenu) {
          activeMenus[j].classList.remove('active');
          const siblingBtn = activeMenus[j].previousElementSibling;
          if (siblingBtn && siblingBtn.classList.contains('accordion-menu')) {
            siblingBtn.classList.remove('active');
          }
        }
      }
    }

    submenu.classList.toggle('active');
    this.classList.toggle('active');
  });
}