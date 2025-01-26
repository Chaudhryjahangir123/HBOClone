// ----- First Carousel (container2) -----
let currentIndex = 0; // Track the current slide for the first carousel
const itemsToShow = 2.5; // Adjust this value to show 3 or 4 items as needed
const containerw = document.querySelector('.container2'); // First carousel container
const movieItems = document.querySelectorAll('.movie2-box'); // All items in the first carousel
const totalMovies = movieItems.length;



// ----- Second Carousel (container3) -----
let currentIndex2 = 0; // Track the current slide for the second carousel
const itemsToShow2 = 6; // Number of items to show in the second carousel
const container2 = document.querySelector('.container3'); // Second carousel container
const movieItems2 = document.querySelectorAll('.movie-box3'); // All items in the second carousel
const totalMovies2 = movieItems2.length; // Initial total number of items

// Clone the first 2 items and append them to the second carousel
const cloneItems2 = () => {
    for (let i = 0; i < 2; i++) {
        const clonedItem = movieItems2[i].cloneNode(true); // Clone the first 2 items
        container2.appendChild(clonedItem); // Append the cloned item to the end
    }
};
cloneItems2(); // Call cloneItems2 once to add the duplicates

// Move slide for the second carousel
function moveSlide2(direction) {
    currentIndex2 += direction;

    // Loop back to the start or end if out of bounds
    if (currentIndex2 < 0) {
        currentIndex2 = totalMovies2 - 1; // Wrap to last item
    } else if (currentIndex2 >= totalMovies2) {
        currentIndex2 = 0; // Wrap to first item
    }

    // Calculate the offset to slide (200px is the width of each item, plus 20px gap)
    const offset = currentIndex2 * (200 + 20); // Adjust based on width + margin
    container2.style.transform = `translateX(-${offset}px)`;

    // Check if we are at the last duplicated item and reset the position
    if (currentIndex2 === totalMovies2 - 2) {
        setTimeout(() => {
            container2.style.transition = 'none'; // Disable transition for reset
            currentIndex2 = 0; // Reset to the first item
            container2.style.transform = `translateX(0)`; // Go back to the start
            // Re-enable transition after the reset
            setTimeout(() => {
                container2.style.transition = 'transform 0.5s ease'; // Re-enable transition
            }, 20);
        }, 500); // Delay for the last scroll to complete
    }
}

// Auto-scroll for the second carousel (every 3 seconds)
setInterval(() => {
    moveSlide2(1);  // Move right (next slide)
}, 3000); // Adjust the interval for how fast you want the carousel to move
// ----- Third Carousel (container3) -----
let currentIndex3 = 0; // Track the current slide for the third carousel
const itemsToShow3 = 4; // Number of items to show in the third carousel
const container3 = document.querySelector('.container3'); // Third carousel container
const movieItems3 = document.querySelectorAll('.movie4-box'); // All items in the third carousel
const totalMovies3 = movieItems3.length; // Initial total number of items

// Clone the first 2 items and append them to the third carousel for smooth infinite loop
const cloneItems3 = () => {
    for (let i = 0; i < 2; i++) {
        const clonedItem = movieItems3[i].cloneNode(true); // Clone the first 2 items
        container3.appendChild(clonedItem); // Append the cloned item to the end
    }
};
cloneItems3(); // Call cloneItems3 once to add the duplicates

// Move slide for the third carousel
//function moveSlide3(direction) {
    currentIndex3 += direction;

    // Loop back to the start or end if out of bounds
    if (currentIndex3 < 0) {
        currentIndex3 = totalMovies3 - 1; // Wrap to last item
    } else if (currentIndex3 >= totalMovies3) {
        currentIndex3 = 0; // Wrap to first item
    }

    // Calculate the offset to slide (200px is the width of each item, plus 20px gap)
    const offset = currentIndex3 * (200 + 20); // Adjust based on width + margin
    container3.style.transform = `translateX(-${offset}px)`;

     //Check if we are at the last duplicated item and reset the position
    //if (currentIndex3 === totalMovies3 - 2) {
        //setTimeout(() => {
           // container3.style.transition = 'none'; // Disable transition for reset
           // currentIndex3 = 0; // Reset to the first item
           // container3.style.transform = `translateX(0)`; // Go back to the start
            // Re-enable transition after the reset
           // setTimeout(() => {
               // container3.style.transition = 'transform 0.5s ease'; // Re-enable transition
           // }, 20);
      //  }, 500); // Delay for the last scroll to complete
    //}
//}

// Auto-scroll for the third carousel (every 3 seconds)
//setInterval(() => {
  //  moveSlide3(1);  // Move right (next slide)
//}, 3000); // Adjust the interval for how fast you want the carousel to move
// Function to toggle sidebar visibility
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const currentLeft = sidebar.style.left;

    if (currentLeft === '0px') {
        sidebar.style.left = '-250px'; // Slide out
    } else {
        sidebar.style.left = '0px'; // Slide in
    }
}
function filterMovies() {
    const input = document.querySelector('#search-input').value.trim().toLowerCase();
    const dropdown = document.getElementById('dropdown-results');
    const movies = document.querySelectorAll('.movie2-box');
    
    // Clear the previous dropdown results
    dropdown.innerHTML = '';

    if (input === '') {
        dropdown.style.display = 'none'; // Hide dropdown if no input
        return;
    }

    let resultsFound = false;

    movies.forEach(movie => {
        const title = movie.getAttribute('data-title');
        const poster = movie.getAttribute('data-poster'); // Get movie poster URL
        
        // Check if the movie title matches the input
        if (title.includes(input)) {
            const dropdownItem = document.createElement('div');
            dropdownItem.classList.add('dropdown-item');
            
            // Create image element for poster
            const img = document.createElement('img');
            img.src = poster; // Set image source to movie's poster URL
            img.alt = title; // Set alt text for accessibility
            
            // Create text element for movie title
            const text = document.createElement('span');
            text.textContent = title;

            // Append image and text to dropdown item
            dropdownItem.appendChild(img);
            dropdownItem.appendChild(text);

            // Optional: Add an event listener to open the movie page or take action on click
            dropdownItem.onclick = () => {
                alert('Movie clicked: ' + title);
                dropdown.style.display = 'none'; // Hide dropdown after selection
                document.querySelector('#search-input').value = title; // Fill the input with selected title
            };
            
            dropdown.appendChild(dropdownItem);
            resultsFound = true;
        }
    });

    // Show or hide the dropdown based on whether results were found
    dropdown.style.display = resultsFound ? 'block' : 'none';
}



function toggleSearchBar() {
    console.log("Search button clicked");  // Check if the function is triggered
    const searchBar = document.getElementById('search-bar');
    searchBar.classList.toggle('visible'); // Toggle the visibility by adding/removing the 'visible' class
    
    // Focus the input field when the search bar is visible
    if (searchBar.classList.contains('visible')) {
        document.querySelector('#search-bar input').focus();
    }
}



function closeSearchBar() {
    const searchBar = document.getElementById('search-bar');
    searchBar.classList.add('hidden');
}

function navigateToMovieInfo(movieTitle) {
    // Encode the movie title to make it URL-safe
    const encodedTitle = encodeURIComponent(movieTitle);
    // Redirect to movieinfo.html with the title as a query parameter
    window.location.href = `movieinfo.html?title=${encodedTitle}`;
}
document.addEventListener('DOMContentLoaded', () => {
    const profileSidebarBtn = document.getElementById('profile-sidebar-btn');
    const profileSidebar = document.getElementById('profile-sidebar');

    // Toggle profile sidebar when profile button is clicked
    profileSidebarBtn.addEventListener('click', () => {
        // Check if the sidebar is currently open
        if (profileSidebar.style.right === '0px') {
            // Hide sidebar (move it off-screen)
            profileSidebar.style.right = '-300px';
        } else {
            // Open sidebar (slide it in from the right)
            profileSidebar.style.right = '0px';
        }
    });
});
