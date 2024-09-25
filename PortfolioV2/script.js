
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
    const navLinks = document.querySelector(".nav-links");
    const navLinksContainer = document.querySelector('.nav-links-container');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle("active");
        navLinksContainer.classList.toggle('active');
    });
});





// ? Script to handle toggling of the lists and changing the icons therein - Will user LocalStorage to save user inputs

document.addEventListener('DOMContentLoaded', () => {
    const toggleContainers = document.querySelectorAll('.toggle-container');

    // ? Toggle funcitonality for the show lists
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

    // ? Access the form, input and recommended list elements
    const recommendForm = document.getElementById('recommend-form');
    const recommendInput = document.getElementById('recommend-input');
    const recommendedList = document.querySelector('.show-section.recomm .show-list');


    // ? Check if recommendedList exists before proceeding
    if (!recommendedList) {
        console.error("The recommended list element could not be found.")
        return; //! Exist early to avoid errors
    }

    // ? Load recommended shows from LocalStorage on page load
    loadRecommendedShows();

    // ? Form submit event handler
    recommendForm.addEventListener('submit', (event) => {
        // * Prevent page refresh
        event.preventDefault();
        console.log("Form submitted!");

        const newShow = recommendInput.value.trim();

        if (newShow) {
            if (!isDuplicate(newShow)) {
                addRecommendedShow(newShow);
                recommendInput.value = '';
            }
            else {
                alert("This show is already in the recommended list.");
            }
        }
    });

    // * Function to check if the show is already in the list
    function isDuplicate(show) {
        let isDuplicate = false;
        recommendedList.querySelectorAll("li").forEach(item => {
            if (item.textContent.replace("Delete", "").trim().toLowerCase() === show.toLowerCase()) {
                isDuplicate = true;
            }
        });
        return isDuplicate;
    }

    // * Function to add a new recommended show to the list and localStorage
    function addRecommendedShow(show) {

        // * Check if the show already exists
        // * Standardises the text to lowercase to compare if the input is already in the list
        const existingShows = Array.from(recommendedList.querySelectorAll('li')).map(item => item.textContent.trim().toLocaleLowerCase());
        if (existingShows.includes(show.toLowerCase())) {
            alert("This show is already in the list.");
            return;
        }

        const newListItem = document.createElement('li');
        newListItem.textContent = show;
        newListItem.classList.add('recomm'); // ? Adds the "recomm" class to the new items


        // * Create and append delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => {
            newListItem.remove();
            saveRecommendedShows(); // ? Saves the changes to localStorage
        });

        newListItem.appendChild(deleteButton);
        recommendedList.appendChild(newListItem);

        // ? Save new list to localStorage
        saveRecommendedShows();
    }

    // * Funciton to save the recommended shows to localStorage
    function saveRecommendedShows() {

        const shows = [];
        recommendedList.querySelectorAll('li').forEach(item => {
            shows.push(item.textContent.replace("Delete", "").trim());
        });
        localStorage.setItem('recommendedShows', JSON.stringify(shows));
    }

    // * Function to load the recommended shows from localStorage
    function loadRecommendedShows() {

        // ! Clears existing list items
        recommendedList.innerHTML = '';

        const savedShows = JSON.parse(localStorage.getItem('recommendedShows')) || [];
        savedShows.forEach(show => {
            const listItem = document.createElement('li');
            listItem.textContent = show;
            listItem.classList.add("recomm");

            // * Create and append delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-button");
            deleteButton.addEventListener("click", () => {
                listItem.remove();
                saveRecommendedShows(); // ? Saves the changes to localStorage
            });

            listItem.appendChild(deleteButton);
            recommendedList.appendChild(listItem);
        });
    }
});




// ! Script for "My Projects" page. Click to expand

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("active");
    });
});


