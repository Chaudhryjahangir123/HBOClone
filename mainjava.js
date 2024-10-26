let currentIndex = 0; // Track the current slide
const itemsToShow = 2.5; // Adjust this value to show 3 or 4 items as needed
const container = document.querySelector('.container2');
const totalMovies = document.querySelectorAll('.movie2-box').length;

function moveSlide(direction) {
    currentIndex += direction;
    
    // Loop back to the start or end if out of bounds
    if (currentIndex < 0) {
        currentIndex = Math.ceil(totalMovies / itemsToShow) - 1;
    } else if (currentIndex >= Math.ceil(totalMovies / itemsToShow)) {
        currentIndex = 0;
    }

    // Calculate the offset to slide
    const offset = currentIndex * (548 * itemsToShow + 20); 
    container.style.transform = `translateX(-${offset}px)`;
}
let currentIndex2 = 0; // Track the current slide for slider2
const itemsToShow2 = 6; // Number of items to show in the slider
const container2 = document.querySelector('.container3');
const totalMovies2 = document.querySelectorAll('.movie-box3').length;

function moveSlide2(direction) {
    currentIndex2 += direction;

    // Loop back to the start or end if out of bounds
    if (currentIndex2 < 0) {
        currentIndex2 = 0;
    } else if (currentIndex2 >= Math.ceil(totalMovies2 / itemsToShow2)) {
        currentIndex2 = Math.ceil(totalMovies2 / itemsToShow2) - 1;
    }

    // Calculate the offset to slide
    const offset = currentIndex2 * (200 + 20); // 200 is the width of each box + 20 for margin
    container2.style.transform = `translateX(-${offset}px)`;
}
