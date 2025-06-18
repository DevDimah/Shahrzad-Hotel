


var copy = document.querySelector(".partner-slide").cloneNode(true);
document.querySelector('.partners').appendChild(copy);

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: true, 
            });
        });
    });
});
