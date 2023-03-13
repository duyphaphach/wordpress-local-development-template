jQuery(window).load(function () {
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
});
