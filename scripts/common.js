jQuery(window).load(function () {
  document.querySelector('#button_scroll_down').addEventListener('click', function () {
    document.querySelector('#section_services').scrollIntoView({
      behavior: 'smooth'
    });
  })
});
