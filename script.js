document.addEventListener("DOMContentLoaded", function () {
    console.log("JS Loaded"); // Debugging

    // **Hero Slider**
    const slides = document.querySelectorAll(".hero-slide");
    const texts = document.querySelectorAll(".hero-text");
    const slider = document.querySelector(".hero-slider");
    let index = 0;

    function updateSlider() {
        if (!slider || slides.length === 0) return;
        slider.style.transform = `translateX(-${index * 100}%)`;

        texts.forEach(text => text.classList.remove("active"));
        if (texts[index]) texts[index].classList.add("active");
        index = (index + 1) % slides.length;
    }

    if (texts.length > 0) texts[0].classList.add("active");
    if (slides.length > 0) setInterval(updateSlider, 10000);

    // **Fetch External HTML Components**
    const components = [
        { id: "topBar-placeholder", file: "topBar.html" },
        { id: "header-placeholder", file: "header.html" }, // Important!
        { id: "footer-placeholder", file: "footer.html" },
        { id: "bottomBar-placeholder", file: "bottomBar.html" },
        { id: "whatsapp-placeholder", file: "whatsapp.html" },
        { id: "subscribe-placeholder", file: "subscribe.html" },
        { id: "contact-form-placeholder", file: "contact-form.html" },
        { id: "logo-placeholder", file: "logoScroller.html" }
    ];

    let headerLoaded = false;

    components.forEach(({ id, file }) => {
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${file}`);
                return response.text();
            })
            .then(data => {
                let element = document.getElementById(id);
                if (element) element.innerHTML = data;

                // When header loads, highlight active menu item
                if (file === "header.html") {
                    headerLoaded = true;
                    highlightActiveMenu();
                }
            })
            .catch(error => console.error(`Error loading ${file}:`, error));
    });

    // **Active Page Menu Highlight**
    function highlightActiveMenu() {
        let currentLocation = window.location.pathname.split("/").pop().toLowerCase() || "index.html";
        let menuItems = document.querySelectorAll(".header-nav ul li a");

        console.log("Current Page:", currentLocation); // Debugging

        if (menuItems.length === 0) {
            console.warn("Menu items not found! Waiting for header to load...");
            setTimeout(() => {
                if (!headerLoaded) highlightActiveMenu(); // Retry once
            }, 100);
            return;
        }

        menuItems.forEach(item => {
            let itemHref = item.getAttribute("href").split("/").pop().toLowerCase();
            console.log("Comparing:", itemHref, "with", currentLocation); // Debugging

            if (itemHref === currentLocation) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }
});
