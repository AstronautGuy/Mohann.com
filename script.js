document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");

    const catalogSection = document.querySelector('.catalog');

    // Create an intersection observer to add .show class when the element is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add 'show' class when the section enters the viewport
                catalogSection.classList.add('show');
                // Stop observing after the animation triggers
                observer.unobserve(catalogSection);
            }
        });
    }, { threshold: 0.1 }); // Adjust threshold as needed

    // Start observing the .catalog section
    if (catalogSection) {
        observer.observe(catalogSection);
    } else {
        console.warn("Catalog section (.catalog) not found!");
    }

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

    // ===============================
    // Scroll-triggered Animation for Catalog Section
    // ===============================
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
        setInterval(updateSlider, 2000);
    }

    // ===============================
    // Fetch External HTML Components
    // ===============================
    const components = [
        { id: "topBar-placeholder", file: "/topBar.html" },
        { id: "preloader", file: "/preloader.html" },
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
