// Accordion toggle for FAQ items
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const isOpen = item.classList.contains('open');

    // Close all open items
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

    // Open clicked item if it was closed
    if (!isOpen) item.classList.add('open');
  });
});