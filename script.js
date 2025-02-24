document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");

    // ===============================
    // Preloader (only if exists)
    // ===============================
    const preloader = document.getElementById('preloader');

    // Function to hide the preloader with fade-out transition
    function hidePreloader() {
        if (!preloader) {
            console.warn("Preloader element not found in hidePreloader!");
            return;
        }
        console.log("Hiding preloader...");
        preloader.style.transition = "opacity 0.5s ease";
        preloader.style.opacity = '0';
        // Remove ripple event listener from preloader so ripple stops once hidden
        preloader.removeEventListener("mousemove", preloaderMousemove);
        setTimeout(() => {
            preloader.style.display = 'none';
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.style.display = 'block';
                console.log("Main content is now visible.");
            } else {
                console.warn("Main content element (#main-content) not found!");
            }
        }, 500);
    }

    // Initialize preloader animation after the window loads
    function initPreloader() {
        if (preloader) {
            console.log("Preloader element found, starting preloader timer.");
            // Attach ripple effect event listener ONLY to the preloader
            preloader.addEventListener("mousemove", preloaderMousemove);
            setTimeout(hidePreloader, 5000);
        } else {
            console.warn("Preloader element (#preloader) not found on this page.");
        }
    }

    // Use window load event to ensure all assets are loaded before starting the preloader timer
    if (document.readyState === "complete") {
        initPreloader();
    } else {
        window.addEventListener('load', initPreloader);
    }

    // Preloader Ripple Effect: add ripple element at mouse position within preloader
    function preloaderMousemove(e) {
        let ripple = document.createElement("div");
        ripple.className = "cursor-ripple";
        // Position relative to the preloader container
        const rect = preloader.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        preloader.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 600); // Match the duration in CSS keyframes
    }

    // ===============================
    // Hero Slider (only if elements exist)
    // ===============================
    const slider = document.querySelector(".hero-slider");
    const slides = document.querySelectorAll(".hero-slide");
    const texts = document.querySelectorAll(".hero-text");
    if (slider && slides.length > 0) {
        let index = 0;
        function updateSlider() {
            slider.style.transform = `translateX(-${index * 100}%)`;
            texts.forEach(text => text.classList.remove("active"));
            if (texts[index]) texts[index].classList.add("active");
            index = (index + 1) % slides.length;
        }
        if (texts.length > 0) texts[0].classList.add("active");
        setInterval(updateSlider, 10000);
    }

    // ===============================
    // Fetch External HTML Components
    // ===============================
    const components = [
        { id: "topBar-placeholder", file: "/topBar.html" },
        { id: "header-placeholder", file: "/header.html" },
        { id: "footer-placeholder", file: "/footer.html" },
        { id: "bottomBar-placeholder", file: "/bottomBar.html" },
        { id: "whatsapp-placeholder", file: "/whatsapp.html" },
        { id: "subscribe-placeholder", file: "/subscribe.html" },
        { id: "contact-form-placeholder", file: "/contact-form.html" },
        { id: "logo-placeholder", file: "/logoScroller.html" }
    ];

    let headerLoaded = false;

    components.forEach(({ id, file }) => {
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${file}`);
                return response.text();
            })
            .then(data => {
                const element = document.getElementById(id);
                if (element) {
                    element.innerHTML = data;
                } else {
                    console.warn(`Element with id "${id}" not found.`);
                }
                // When header loads, highlight active menu item
                if (file === "/header.html") {
                    headerLoaded = true;
                    highlightActiveMenu();
                }
            })
            .catch(error => console.error(`Error loading ${file}:`, error));
    });

    // ===============================
    // Active Page Menu Highlight
    // ===============================
    function highlightActiveMenu() {
        const currentLocation = window.location.pathname.split("/").pop().toLowerCase() || "index.html";
        const menuItems = document.querySelectorAll(".header-nav ul li a");

        console.log("Current Page:", currentLocation);

        if (menuItems.length === 0) {
            console.warn("Menu items not found! Waiting for header to load...");
            setTimeout(() => {
                if (!headerLoaded) highlightActiveMenu(); // Retry if header isn’t loaded yet
            }, 100);
            return;
        }

        menuItems.forEach(item => {
            const itemHref = item.getAttribute("href").split("/").pop().toLowerCase();
            console.log("Comparing:", itemHref, "with", currentLocation);
            if (itemHref === currentLocation) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }

    // ===============================
    // (Optional) Advanced Cursor Effects for Background
    // ===============================
    // (If you have a grid-wrapper or similar using CSS variables, include your mousemove listener here.)
    document.addEventListener("mousemove", function(e) {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        const rotateX = mouseY * 10; // adjust as desired
        const rotateY = -mouseX * 10;
        document.documentElement.style.setProperty('--mouseX', mouseX);
        document.documentElement.style.setProperty('--mouseY', mouseY);
        document.documentElement.style.setProperty('--rotateX', rotateX + "deg");
        document.documentElement.style.setProperty('--rotateY', rotateY + "deg");
    });
});
