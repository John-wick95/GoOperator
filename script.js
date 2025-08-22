document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove 'active' class from all items
            navItems.forEach(i => i.classList.remove('active'));

            // Add 'active' class to the clicked item
            item.classList.add('active');
        });
    });
});
