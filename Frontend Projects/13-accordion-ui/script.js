const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', function () {
    const activeItem = document.querySelector('.accordion-item.active');
    if (activeItem && activeItem !== this.parentElement) {
      activeItem.classList.remove('active');
    }

    this.parentElement.classList.toggle('active');
  });
});