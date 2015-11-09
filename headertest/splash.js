document.addEventListener("DOMContentLoaded", function() {
    console.log(event);
    document.addEventListener("mousewheel", resize);
});

function resize() {
    document.removeEventListener("mousewheel", resize);
    var header = document.getElementById("header");
    var logo = document.getElementById("logo");
    var navbar = document.getElementById("navbar");

    header.classList.add("headerLoaded");
    logo.classList.add("logoLoaded");
    navbar.classList.add("navbarLoaded");
}