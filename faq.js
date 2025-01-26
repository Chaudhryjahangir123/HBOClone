document.addEventListener('DOMContentLoaded', () => {
    const faqContainer = document.getElementById('faq-container');

    // Fetch FAQs from the server
    fetch('http://localhost:3000/api/faqs')
        .then(response => response.json())
        .then(faqs => {
            faqs.forEach(faq => {
                const faqItem = document.createElement('div');
                faqItem.classList.add('faq-item');
                faqItem.innerHTML = `
                    <div class="question">${faq.question}</div>
                    <div class="answer">${faq.answer}</div>
                `;
                faqContainer.appendChild(faqItem);

                // Toggle answer display on click
                faqItem.addEventListener('click', () => {
                    const answer = faqItem.querySelector('.answer');
                    answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
                });
            });
        })
        .catch(error => console.error('Error fetching FAQs:', error));
});
