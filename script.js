
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

    });

