// Get the movie title from the URL
const urlParams = new URLSearchParams(window.location.search);
const movieTitle = urlParams.get('title');

// Movie data (you can expand this with more movies)
const movieDetails = {
    "Fantastic Beasts": {
        poster: "Images/fb.png",
        description: "Fantastic Beasts is a fantasy film set in the Wizarding World, decades before Harry Potter...",
        rating: "8.5/10",
        genre: "Fantasy, Action",
        releaseYear: "2024"
    },
    "Harry Potter": {
        poster: "Images/Harrypotter.png",
        description: "The iconic story of a young wizard's journey to defeat dark forces...",
        rating: "9.0/10",
        genre: "Fantasy, Adventure",
        releaseYear: "2001"
    },
    "Lord Of The Rings": {
        poster: "Images/lotr.png",
        description: "The iconic story of a young wizard's journey to defeat dark forces...",
        rating: "9.0/10",
        genre: "Fantasy, Adventure",
        releaseYear: "2001"
    }
};

// Display movie details if available
if (movieTitle) {
    const movie = movieDetails[movieTitle];
    if (movie) {
        // Update the HTML with movie details
        document.querySelector('.movie-title').textContent = movieTitle;
        document.querySelector('.movie-poster').src = movie.poster;
        document.querySelector('.movie-description-text').textContent = movie.description;
        document.querySelector('.movie-rating-value').textContent = movie.rating;
        document.querySelector('.movie-genre').textContent = movie.genre;
        document.querySelector('.movie-release-year').textContent = movie.releaseYear;
    } else {
        document.querySelector('.movie-description-text').textContent = "Details not available.";
    }
}
