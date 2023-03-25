// jQuery(window).load(function () {
new Swiper('.hero-swiper', {
  loop: true,
  loopAdditionalSlides: 5,
  centeredSlides: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
  }
})

new Swiper('.partners-swiper', {
  loop: false,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    600: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    900: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
  }
})

new Swiper('.directors-swiper', {
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    600: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    900: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  }
})
// })
