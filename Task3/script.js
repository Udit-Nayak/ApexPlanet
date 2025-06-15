document.addEventListener('DOMContentLoaded', () => {
    // Image Carousel Logic
    let slideIndex = 0;
    showSlides(slideIndex);

    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');

    if (prevBtn) prevBtn.addEventListener('click', () => plusSlides(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => plusSlides(1));
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => currentSlide(index));
    });

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("carousel-slide");
        let dots = document.getElementsByClassName("dot");
        if (slides.length === 0) return; // Exit if no slides found

        if (n >= slides.length) { slideIndex = 0 }
        if (n < 0) { slideIndex = slides.length - 1 }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex].style.display = "block";
        dots[slideIndex].className += " active";
    }

    // API Data Fetcher Logic
    const fetchDataBtn = document.getElementById('fetchDataBtn');
    const dataDisplay = document.getElementById('data-display');

    if (fetchDataBtn) fetchDataBtn.addEventListener('click', fetchJoke);

    async function fetchJoke() {
        dataDisplay.textContent = 'Fetching data...';
        try {
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            dataDisplay.innerHTML = `<p><strong>Joke:</strong> ${data.joke}</p>`;
        } catch (error) {
            dataDisplay.innerHTML = `<p style="color: red;">Error fetching data: ${error.message}</p>`;
            console.error('Error:', error);
        }
    }
}); 