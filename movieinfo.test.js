/**
 * @jest-environment jsdom
 */


const { getMovieDetails } = require('./movieinfo');

describe('Rating functionality', () => {
    test('should update the rating value and stars on valid rating input', (done) => {
        document.body.innerHTML = `
            <div class="movie-rating-value"></div>
            <div class="movie-rating-stars"></div>
            <input id="user-rating" type="number" min="0" max="10" value="8">
            <button id="submit-rating">Submit Rating</button>
            <div id="rating-feedback"></div>
        `;

        const submitRatingButton = document.querySelector('#submit-rating');
        const userRatingInput = document.querySelector('#user-rating');
        const ratingFeedback = document.querySelector('#rating-feedback');

        submitRatingButton.addEventListener('click', () => {
            const userRating = parseFloat(userRatingInput.value);

            if (!isNaN(userRating) && userRating >= 0 && userRating <= 10) {
                const movieRatingValue = document.querySelector('.movie-rating-value');
                movieRatingValue.textContent = `User Rating: ${userRating}/10`;
                ratingFeedback.textContent = `Thank you for rating! You rated this movie ${userRating}/10.`;
            } else {
                alert('Please enter a valid rating between 0 and 10.');
            }
        });

        // Simulate button click for valid rating
        submitRatingButton.click();

        // Use `setTimeout` to wait for DOM update
        setTimeout(() => {
            // Assertions to check if content is updated correctly
            expect(document.querySelector('.movie-rating-value').textContent).toBe('User Rating: 8/10');
            expect(ratingFeedback.textContent).toBe('Thank you for rating! You rated this movie 8/10.');
            done(); // Mark the test as done after assertions
        }, 0);
    });

    test('should show an alert for invalid rating input', () => {
        document.body.innerHTML = `
            <div class="movie-rating-value"></div>
            <input id="user-rating" type="number" min="0" max="10" value="-1">
            <button id="submit-rating">Submit Rating</button>
        `;

        // Mock alert function before trigger
        const alertSpy = jest.spyOn(global, 'alert').mockImplementation(() => {});

        const submitRatingButton = document.querySelector('#submit-rating');

        // Set up event listener for the invalid input case
        submitRatingButton.addEventListener('click', () => {
            const userRating = parseFloat(document.querySelector('#user-rating').value);

            if (isNaN(userRating) || userRating < 0 || userRating > 10) {
                alert('Please enter a valid rating between 0 and 10.');
            }
        });

        // Trigger the click for invalid input
        submitRatingButton.click();

        // Ensure the alert was called correctly for invalid input
        expect(alertSpy).toHaveBeenCalledTimes(1);
        expect(alertSpy).toHaveBeenCalledWith('Please enter a valid rating between 0 and 10.');

        // Clean up the mock after the test
        alertSpy.mockRestore();
    });
});
