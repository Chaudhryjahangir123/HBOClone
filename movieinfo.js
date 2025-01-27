console.log("initializeMovieInfo function called");

//function initializeMovieInfo() {
    function initializeMovieInfo() {
        // Your initialization logic here
    document.addEventListener('DOMContentLoaded', () => {
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
            "Batman": {
                poster: "Images/Rectangle 1 (1).png",
                description: "A dark and brooding tale of a masked vigilante who fights crime and corruption in Gotham City. With unparalleled detective skills and an arsenal of high-tech gadgets, Batman confronts his inner demons while protecting the city from notorious villains.",
                rating: "8.5/10",
                genre: "Action",
                releaseYear: "2018",
                trailer: "https://www.youtube.com/embed/mqqft2x_Aa4?si=jOHOb_b1IKxZMQjQ"
            },
            "Friends": {
                poster: "Images/Rectangle 1.png",
                description: "A heartwarming and humorous sitcom that follows the lives of six friends navigating the ups and downs of life, love, and career in New York City. With unforgettable moments and strong camaraderie, it captures the essence of friendship and laughter.",
                rating: "9.0/10",
                genre: "Fantasy, Adventure",
                releaseYear: "2001",
                trailer: "https://www.youtube.com/embed/PFcCyf39Ozs?si=Ef0cHNUIYzFkYF7J"
            },
            "Watchmen": {
                poster: "Images/m4.png",
                description: "Set in an alternate reality, Watchmen explores the complex lives of masked vigilantes and the moral ambiguities of their actions. As tensions rise during the Cold War, the story unravels secrets, conspiracies, and the blurred line between heroism and villainy.",
                rating: "8.0/10",
                genre: "Fantasy, Adventure",
                releaseYear: "2001",
                trailer: "https://www.youtube.com/embed/wglmbroElU0?si=Q4weyMCrSd-K9YDX"
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
                trailer: "https://www.youtube.com/embed/9BqKiZhEFFw?si=jj9spAIK7CnxGUF6"
            }
        };

        if (movieTitle && movieDetails[movieTitle]) {
            const movie = movieDetails[movieTitle];

            // Populate movie info
            document.querySelector('.movie-title').textContent = movieTitle;
            document.querySelector('.movie-description-text').textContent = movie.description;
            document.querySelector('.movie-rating-value').textContent = movie.rating;
            document.querySelector('.movie-genre').textContent = movie.genre;
            document.querySelector('.movie-release-year').textContent = movie.releaseYear;

            // Set the movie poster
            const moviePosterElement = document.querySelector('.movie-poster');
            if (moviePosterElement) {
                moviePosterElement.src = movie.poster;
                moviePosterElement.alt = `${movieTitle} Poster`;
            } else {
                console.error('Element with class .movie-poster not found.');
            }

            // Set the movie trailer
            const movieTrailerElement = document.querySelector('.movie-trailer-video');
            if (movieTrailerElement && movieTrailerElement.tagName === 'IFRAME') {
                movieTrailerElement.src = movie.trailer;
            } else {
                console.error('Element with class .movie-trailer-video not found or is not an <iframe>.');
            }
        } else {
            console.warn('Movie details not found for the given title.');
            document.querySelector('.movie-description-text').textContent = "Details not available.";
        }

        // Rating submission logic
        const submitRatingButton = document.querySelector('#submit-rating');
        const userRatingInput = document.querySelector('#user-rating');
        const ratingFeedback = document.querySelector('#rating-feedback');

        if (submitRatingButton) {
            submitRatingButton.addEventListener('click', () => {
                const userRating = parseFloat(userRatingInput.value);
                if (!isNaN(userRating) && userRating >= 0 && userRating <= 10) {
                    const movieRatingValue = document.querySelector('.movie-rating-value');
                    movieRatingValue.textContent = `User Rating: ${userRating}/10`;

                    ratingFeedback.textContent = `Thank you for rating! You rated this movie ${userRating}/10.`;
                    userRatingInput.value = '';
                } else {
                    alert('Please enter a valid rating between 0 and 10.');
                }
            });
        }

        // Comments section initialization
        const preloadedComments = [
            "Amazing movie, loved the plot and visuals!",
            "The acting was top-notch, especially the lead actor!",
            "A bit slow in the middle, but overall a great watch."
        ];

        const commentsList = document.querySelector('#comments-list');
        const newCommentInput = document.querySelector('#new-comment');
        const submitCommentButton = document.querySelector('#submit-comment');

        if (!commentsList || !newCommentInput || !submitCommentButton) {
            console.error("One or more elements (commentsList, newCommentInput, submitCommentButton) not found.");
            return;
        }

        console.log("Comments section initialized.");

        function renderComments(comments) {
            commentsList.innerHTML = ''; // Clear existing comments
            comments.forEach(comment => {
                const li = document.createElement('li');
                li.textContent = comment;
                commentsList.appendChild(li);
            });
        }

        renderComments(preloadedComments); // Populate initial comments

        submitCommentButton.addEventListener('click', () => {
            const newComment = newCommentInput.value.trim();
            if (newComment) {
                preloadedComments.push(newComment); // Add the new comment
                renderComments(preloadedComments); // Refresh comments list
                newCommentInput.value = ''; // Clear input field
            } else {
                alert('Please enter a valid comment!');
            }
        });

        // Watch button logic for fullscreen video
        const watchButton = document.getElementById('watch-button');
        if (watchButton) {
            watchButton.addEventListener('click', () => {
                const video = document.getElementById('fullscreen-video');
                if (video) {
                    video.classList.remove('hidden'); // Show the video

                    // Request fullscreen
                    if (video.requestFullscreen) {
                        video.requestFullscreen();
                    } else if (video.webkitRequestFullscreen) { // Safari compatibility
                        video.webkitRequestFullscreen();
                    } else if (video.msRequestFullscreen) { // IE/Edge compatibility
                        video.msRequestFullscreen();
                    }

                    // Play the video
                    video.play();
                } else {
                    console.error("Video element not found.");
                }
            });
        } else {
            console.error("Watch button not found.");
        }
        });
    }

// Initialize the movie info when the script is loaded
initializeMovieInfo();

// Export for testing
module.exports = { initializeMovieInfo };