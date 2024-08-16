
// ! This lets the script access all the nav link and the ID of each page's body element.

let links = document.querySelectorAll(".nav-links a");
let bodyId = document.querySelector("body").id;

// ! Loops through all links and does a check
for (let link of links) {
    // ? If a link's data-active value is equal to the body ID, it then adds the active class to the link
    if (link.dataset.active == bodyId) {
        link.classList.add("active");
    }
}




// ! This is for the HAMBURGER MENU

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinksContainer = document.querySelector('.nav-links-container');

    hamburgerMenu.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });
});





// ? Script to handle toggling of the lists and changing the icons therein

document.addEventListener('DOMContentLoaded', () => {
    const toggleContainers = document.querySelectorAll('.toggle-container');

    toggleContainers.forEach(container => {
        container.addEventListener('click', () => {
            const showList = container.nextElementSibling;
            const toggleIcon = container.querySelector('.toggle-icon');
            if (showList.classList.contains('expanded')) {
                showList.classList.remove('expanded');
                toggleIcon.textContent = '+';
            } else {
                showList.classList.add('expanded');
                toggleIcon.textContent = '-';
            }
        });
    });

    const recommendForm = document.getElementById('recommend-form');
    const recommendInput = document.getElementById('recommend-input');
    const recommendedList = document.querySelector('.show-recommended .show-list');

    recommendForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newShow = recommendInput.value.trim();
        if (newShow) {
            const newListItem = document.createElement('li');
            newListItem.textContent = newShow;
            recommendedList.insertBefore(newListItem, recommendedList.firstChild);
            recommendInput.value = '';
        }
    });
});







