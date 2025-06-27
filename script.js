document.querySelector('.liquid-glass-button').addEventListener('click', function(e) {
    const button = this;
    button.classList.add('ripple');
    setTimeout(() => {
        button.classList.remove('ripple');
    }, 600); // Matches ripple animation duration
});