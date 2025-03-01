document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");

    const valuesContent = {
        partnerships: {
            title: 'Creating Client Partnerships',
            description: `Core to our business is a deep belief that we work collaboratively as a team and in partnership with our clients. We develop strong relationships based on mutual trust and respect every step of the way. We aim to work like an extended arm of their company providing the expertise and value that helps them become more successful in their business, which in turn helps us become successful at ours.`
        },
        excellence: {
            title: 'Excellence',
            description: `While we work towards providing high quality products & services, we know it’s important to be challenging “status-quo” for every internal process. We strive to set new benchmarks and raise the bar. It means we always look for better ways of doing things on behalf of our projects, our clients and our organisation.`
        },
        commitment: {
            title: 'Commitment',
            description: `We truly believe that unless there is commitment, there are only promises and hopes, but not results. If you are committed there is always a way! We are committed to deliver to the customer, ‘what’ we say we will deliver, exactly ‘when’ we say we will deliver. We also guarantee the process performance parameters of our equipment, to ensure our clients get exactly what we agreed to deliver.`
        },
        integrity: {
            title: 'Integrity',
            description: `Integrity is fundamental to our business. Our commitment to integrity means we always do what is right, not what is easy. We think straight, talk straight and act straight.`
        },
        development: {
            title: 'Product Development',
            description: `Our business is not about the money we make; but the Value we add to our clients’ businesses. We strive to be giving higher value and compete to be a better version of ourselves always. As such, we shall strive to bring new improved solutions to our clients by way of investing our best talent and time on product development.`
        },
        authority: {
            title: 'Authority, Responsibility & Accountability',
            description: `As humans we do learn the most from making mistakes. But with mistakes there is a tendency to lay blame or justify. There is a thin line which separates responsibility and blame. At Neologic, we train ourselves consciously to ensure we that we do not slip below the line. We aim to remain always above the line with taking the authority given to execute work proactively; take responsibility for the duty assigned to the position we hold and always remain accountable to our superiors and clients.`
        },
        fun: {
            title: 'Fun',
            description: `We don’t believe fun at work takes away from productivity, we believe it increases it. We love to celebrate our successes. We come to work through choice not necessity. We are genuinely friendly and up-beat.`
        }
    };

    const icons = document.querySelectorAll('.value-icon');
    const titleEl = document.getElementById('value-title');
    const descriptionEl = document.getElementById('value-description');

// The container for the divider
    const dividerContainer = document.querySelector('.divider-container');
// The highlight element we'll move around
    const highlight = document.querySelector('.divider-highlight');

    /**
     * Positions the highlight bar under the given icon.
     * @param {HTMLElement} icon - The icon element that is active.
     */
    function positionHighlight(icon) {
        const iconRect = icon.getBoundingClientRect();
        const containerRect = dividerContainer.getBoundingClientRect();

        // The left position is how far the icon is from the container's left edge
        const leftPos = iconRect.left - containerRect.left;

        // Match the highlight width to the icon's width
        highlight.style.width = iconRect.width + 'px';

        // Move the highlight to that left position
        highlight.style.left = leftPos + 'px';
    }

    /**
     * Switches the active value content and moves the highlight.
     * @param {HTMLElement} icon - The clicked icon.
     */
    function activateValue(icon) {
        // Remove active class from all icons
        icons.forEach(i => i.classList.remove('active'));
        // Add active class to the clicked icon
        icon.classList.add('active');

        // Update the text based on the icon's data-value
        const valueKey = icon.getAttribute('data-value');
        const content = valuesContent[valueKey];
        titleEl.textContent = content.title;
        descriptionEl.textContent = content.description;

        // Position the highlight under this icon
        positionHighlight(icon);
    }

// Add click listeners
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            activateValue(icon);
        });
    });

// On page load, position highlight under the icon that starts active
    window.addEventListener('load', () => {
        const activeIcon = document.querySelector('.value-icon.active');
        if (activeIcon) {
            positionHighlight(activeIcon);
        }
    });

// If user resizes the window, re-position the highlight under the active icon
    window.addEventListener('resize', () => {
        const activeIcon = document.querySelector('.value-icon.active');
        if (activeIcon) {
            positionHighlight(activeIcon);
        }
    });

    const counters = document.querySelectorAll('.number');
    const speed = 200; // lower number = faster counting

    // Function to update each counter
    const updateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if(count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => updateCounter(counter), 20);
        } else {
            counter.innerText = target;
        }
    };

    // Animate only when the element is in view using IntersectionObserver
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                updateCounter(entry.target);
                observer.unobserve(entry.target); // Animate only once per counter
            }
        });
    }, { threshold: 0.5 }); // Adjust threshold as needed

    // Observe each counter
    counters.forEach(counter => {
        observer.observe(counter);
    });

    const testimonials = document.querySelectorAll(".testimonial");
    let currentTestimonial = 0;
    let autoScroll;

    // Function to show a specific testimonial
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle("active", i === index);
        });
    }

    // Function to go to the next testimonial
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Function to go to the previous testimonial
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Function to attach navigation button event listeners
    function attachNavListeners() {
        const prevBtn = document.querySelector(".prev-btn");
        const nextBtn = document.querySelector(".next-btn");

        if (prevBtn && nextBtn) {
            console.log("Navigation buttons found. Adding event listeners...");
            prevBtn.addEventListener("click", prevTestimonial);
            nextBtn.addEventListener("click", nextTestimonial);
        } else {
            console.warn("Navigation buttons NOT found! Retrying in 1 second...");
            setTimeout(attachNavListeners, 1000); // Retry after 1 second
        }
    }

    // Auto-scroll every 5 seconds
    function startAutoScroll() {
        autoScroll = setInterval(nextTestimonial, 5000);
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
    }

    document.querySelector(".testimonial-container")?.addEventListener("mouseenter", stopAutoScroll);
    document.querySelector(".testimonial-container")?.addEventListener("mouseleave", startAutoScroll);

    // Show the first testimonial by default
    showTestimonial(currentTestimonial);
    attachNavListeners(); // Attach event listeners after DOM is ready
    startAutoScroll();

    // ===============================
    // Scroll-triggered Animation for Catalog Section
    // ===============================
    const catalogSection = document.querySelector(".catalog");

    if (catalogSection) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        catalogSection.classList.add("show");
                        observer.unobserve(catalogSection);
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(catalogSection);
    } else {
        console.warn("Catalog section (.catalog) not found!");
    }

    // ===============================
    // Preloader Handling
    // ===============================
    const preloader = document.getElementById("preloader");

    function hidePreloader() {
        if (!preloader) return;
        preloader.style.transition = "opacity 0.5s ease";
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
            const mainContent = document.getElementById("main-content");
            if (mainContent) mainContent.style.display = "block";
        }, 500);
    }

    function initPreloader() {
        if (preloader) setTimeout(hidePreloader, 2000);
    }

    if (document.readyState === "complete") {
        initPreloader();
    } else {
        window.addEventListener("load", initPreloader);
    }

    // ===============================
    // Hero Slider (if exists)
    // ===============================
    const slider = document.querySelector(".hero-slider");
    const slides = document.querySelectorAll(".hero-slide");
    const texts = document.querySelectorAll(".hero-text");
    let index = 0;

    if (slider && slides.length > 0) {
        function updateSlider() {
            slider.style.transform = `translateX(-${index * 100}%)`;
            texts.forEach((text) => text.classList.remove("active"));
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
        { id: "topBar-placeholder", file: "/components/topBar.html" },
        { id: "preloader", file: "/components/preloader.html" },
        { id: "header-placeholder", file: "/components/header.html" },
        { id: "footer-placeholder", file: "/components/footer.html" },
        { id: "bottomBar-placeholder", file: "/components/bottomBar.html" },
        { id: "whatsapp-placeholder", file: "/components/whatsapp.html" },
        { id: "subscribe-placeholder", file: "/components/subscribe.html" },
        { id: "contact-form-placeholder", file: "/components/contact-form.html" },
        { id: "logo-placeholder", file: "/components/logoScroller.html" },
    ];

    let headerLoaded = false;

    components.forEach(({ id, file }) => {
        fetch(file)
            .then((response) => {
                if (!response.ok) throw new Error(`Failed to load ${file}`);
                return response.text();
            })
            .then((data) => {
                const element = document.getElementById(id);
                if (element) element.innerHTML = data;
                else console.warn(`Element with id "${id}" not found.`);
                if (file === "/header.html") {
                    headerLoaded = true;
                }
            })
            .catch((error) => console.error(`Error loading ${file}:`, error));
    });

    // ===============================
    // Active Page Menu Highlight
    // ===============================
    function highlightActiveMenu() {
        // Use the current URL from window.location.href
        const currentUrl = new URL(window.location.href);
        const currentPath = currentUrl.pathname.toLowerCase();
        console.log("Current URL path:", currentPath);

        // Get all the menu links
        const menuItems = document.querySelectorAll(".header-nav ul li a");
        if (!menuItems.length) {
            console.warn("Menu items not found!");
            return;
        }

        menuItems.forEach((item) => {
            // Resolve the link using document.baseURI so relative URLs are resolved relative to the document
            const href = item.getAttribute("href");
            const linkUrl = new URL(href, document.baseURI);
            const linkPath = linkUrl.pathname.toLowerCase();
            console.log("Menu link path:", linkPath);

            // Compare the file names (or modify the comparison as needed)
            const currentFile = currentPath.split("/").pop() || "index.html";
            const linkFile = linkPath.split("/").pop() || "index.html";
            console.log("Comparing files:", currentFile, "vs", linkFile);

            // If the file names match, mark the link as active
            if (currentFile === linkFile) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }

// Use window.load to ensure all content (including async header) is loaded
    window.addEventListener("load", highlightActiveMenu);



    // ===============================
    // Advanced Cursor Effects for Background
    // ===============================
    document.addEventListener("mousemove", function (e) {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        const rotateX = mouseY * 10;
        const rotateY = -mouseX * 10;
        document.documentElement.style.setProperty("--mouseX", mouseX);
        document.documentElement.style.setProperty("--mouseY", mouseY);
        document.documentElement.style.setProperty("--rotateX", rotateX + "deg");
        document.documentElement.style.setProperty("--rotateY", rotateY + "deg");
    });

    // ===============================
    // Cleanup on Page Unload
    // ===============================
    window.addEventListener("beforeunload", () => {
        clearInterval(autoScroll);
    });
});