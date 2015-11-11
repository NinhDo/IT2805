document.addEventListener("DOMContentLoaded", function() {
    console.log(event);
    var date = new Date().getTime();
    var lastDateVisited = null;
    if(typeof (Storage) !== "undefined") {
        if (localStorage.getItem("lastDateVisited") != null) {
            lastDateVisited = localStorage.getItem("lastDateVisited");
        }
    }

    if (lastDateVisited == null || date - lastDateVisited > 1000 || isNaN(lastDateVisited)) {
        if (localStorage !== "undefined") {
            localStorage.setItem("lastDateVisited", date);
        }
        makeBig();
        document.addEventListener("mousewheel", resize);
    }
});

function makeBig() {
    var header = document.getElementById("header");
    var logo = document.getElementById("logo");
    var navbar = document.getElementById("navbar");
    var wrapper = document.getElementById("wrapper");
    var footer = document.getElementById("footer");

    header.classList.add("headerBig");
    logo.classList.add("logoBig");
    navbar.classList.add("navbarBig");
    wrapper.style.display = "none";
    footer.style.display = "none";
}

function resize() {
    document.removeEventListener("mousewheel", resize);

    var html = document.getElementsByTagName("html");
    var header = document.getElementById("header");
    var logo = document.getElementById("logo");
    var navbar = document.getElementById("navbar");
    var wrapper = document.getElementById("wrapper");
    var footer = document.getElementById("footer");

    html[0].style.position = "fixed";

    setTimeout(function() {
        html[0].style.position = null;
    }, 1000);

    makeBig();

    wrapper.style.display = "block";
    footer.style.display = "block";

    header.classList.add("headerResize");
    logo.classList.add("logoResize");
    navbar.classList.add("navbarResize");

    header.classList.remove("headerBig");
    logo.classList.remove("logoBig");
    navbar.classList.remove("navbarBig");
}