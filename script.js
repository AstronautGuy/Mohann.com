document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".hero-slide");
    const texts = document.querySelectorAll(".hero-text");
    const slider = document.querySelector(".hero-slider");
    let index = 0;

    function updateSlider() {
        slider.style.transform = `translateX(-${index * 100}%)`;

        // Remove active class from all text elements
        texts.forEach(text => text.classList.remove("active"));

        // Add active class to the current one
        texts[index].classList.add("active");

        // Move to the next slide or loop back
        index = (index + 1) % slides.length;
    }

    // Initial activation
    texts[0].classList.add("active");

    // Change slides every 15 seconds
    setInterval(updateSlider, 10000);
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("topBar.html")
        .then(response => response.text())
        .then(data => document.getElementById("topBar-placeholder").innerHTML = data);
    fetch("header.html")
        .then(response => response.text())
        .then(data => document.getElementById("header-placeholder").innerHTML = data);

    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer-placeholder").innerHTML = data);

    fetch("bottomBar.html")
        .then(response => response.text())
        .then(data => document.getElementById("bottomBar-placeholder").innerHTML = data);

    fetch("whatsapp.html")
        .then(response => response.text())
        .then(data=> document.getElementById("whatsapp-placeholder").innerHTML =data);

    fetch("subscribe.html")
        .then(response => response.text())
        .then(data=> document.getElementById("subscribe-placeholder").innerHTML =data);
    fetch("contact-form.html")
        .then(response => response.text())
        .then(data=> document.getElementById("contact-form-placeholder").innerHTML =data);

});

