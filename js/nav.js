
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// const dropdown = document.querySelector('.nav-links li.dropdown > a');
// const menu = document.querySelector('.dropdown-menu');

// dropdown.addEventListener('click', (e) => {
//     e.preventDefault(); // Prevent page jump
//     // menu.classList.toggle('show');
//     if (menu.classList.contains('show')) {
//         menu.classList.remove('show');
//     } else {
//         menu.classList.add('show');
//     }
// });
// Select all dropdown toggle links
const dropdowns = document.querySelectorAll('.nav-links li.dropdown > a');

dropdowns.forEach(dropdown => {
    const menu = dropdown.nextElementSibling; // the corresponding <ul> dropdown-menu
    dropdown.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent page jump

        // Close any other open dropdowns
        document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
            if (openMenu !== menu) {
                openMenu.classList.remove('show');
            }
        });

        // Toggle the clicked dropdown
        menu.classList.toggle('show');
    });
});