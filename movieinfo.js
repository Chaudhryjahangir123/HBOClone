document.addEventListener('DOMContentLoaded', () => {
    // Movie details
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('title');

    const movieDetails = {
        "Fantastic Beasts": {
            poster: "Images/fb.png",
            description: "Fantastic Beasts is a fantasy film set in the Wizarding World, decades before Harry Potter...",
            rating: "8.5/10",
            genre: "Fantasy, Action",
            releaseYear: "2024",
            trailer: "https://www.youtube.com/embed/ViuDsy7yb8M"
        },
        "Harry Potter": {
            poster: "Images/Harrypotter.png",
            description: "The iconic story of a young wizard's journey to defeat dark forces...",
            rating: "9.0/10",
            genre: "Fantasy, Adventure",
            releaseYear: "2001",
            trailer: "https://www.youtube.com/embed/PbdM1db3JbY"
        },
        "Lord Of The Rings": {
            poster: "Images/lotr.png",
            description: "An epic journey to destroy the One Ring and save Middle-earth...",
            rating: "9.0/10",
            genre: "Fantasy, Adventure",
            releaseYear: "2001",
            trailer: "https://www.youtube.com/embed/V75dMMIW2B4"
        },
        "WestWorld": {
            poster: "Images/Card Medium (3).png",
            description: "A dark odyssey about the dawn of artificial consciousness and the future of sin...",
            rating: "9.0/10",
            genre: "Sci-Fi, Western",
            releaseYear: "2016",
            trailer: "https://www.youtube.com/embed/eX3u0IlBBO4"
        }
    };

    if (movieTitle) {
        const movie = movieDetails[movieTitle];
        if (movie) {
            document.querySelector('.movie-title').textContent = movieTitle;
            document.querySelector('.movie-poster').src = movie.poster;
            document.querySelector('.movie-description-text').textContent = movie.description;
            document.querySelector('.movie-rating-value').textContent = movie.rating;
            document.querySelector('.movie-genre').textContent = movie.genre;
            document.querySelector('.movie-release-year').textContent = movie.releaseYear;
            document.querySelector('.movie-trailer-video').src = movie.trailer;
        } else {
            document.querySelector('.movie-description-text').textContent = "Details not available.";
        }
    }

    // Rating submission (real-time feedback and user interaction)
    const submitRatingButton = document.querySelector('#submit-rating');
    const userRatingInput = document.querySelector('#user-rating');
    const ratingFeedback = document.querySelector('#rating-feedback'); // Feedback element
    const starsContainer = document.querySelector('.movie-rating-stars'); // To show dynamic stars

    if (submitRatingButton) {
        submitRatingButton.addEventListener('click', () => {
            const userRating = parseFloat(userRatingInput.value);

            if (!isNaN(userRating) && userRating >= 0 && userRating <= 10) {
                // Update displayed rating
                const movieRatingValue = document.querySelector('.movie-rating-value');
                movieRatingValue.textContent = `User Rating: ${userRating}/10`;

                // Update stars based on the user rating
                updateStars(userRating);

                // Display user feedback
                ratingFeedback.textContent = `Thank you for rating! You rated this movie ${userRating}/10.`;
                userRatingInput.value = '';  // Clear the input field
            } else {
                alert('Please enter a valid rating between 0 and 10.');
            }
        });
    }

    // Function to update stars dynamically (real-time feedback)
    userRatingInput.addEventListener('input', () => {
        const rating = parseFloat(userRatingInput.value);
        if (!isNaN(rating) && rating >= 0 && rating <= 10) {
            updateStars(rating);  // Update stars on input change
        }
    });

    function updateStars(rating) {
        starsContainer.innerHTML = ''; // Clear previous stars

        // Handle full stars, half stars, and empty stars
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;

        // Add filled stars
        for (let i = 0; i < fullStars; i++) {
            starsContainer.innerHTML += '★'; // Or use an icon here
        }

        // Add half star if needed
        if (halfStar) {
            starsContainer.innerHTML += '☆'; // Or use an icon for half star
        }

        // Add empty stars to make a total of 5
        for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
            starsContainer.innerHTML += '☆';  // Or use an icon for empty stars
        }
    }

    // Comments functionality
    const commentsList = document.querySelector('#comments-list');
    const newCommentInput = document.querySelector('#new-comment');
    const submitCommentButton = document.querySelector('#submit-comment');

    submitCommentButton.addEventListener('click', () => {
        const commentText = newCommentInput.value.trim();
        if (commentText) {
            const newComment = document.createElement('li');
            newComment.textContent = commentText;
            commentsList.appendChild(newComment);
            newCommentInput.value = '';
        } else {
            alert('Please enter a comment before submitting.');
        }
    });
});
