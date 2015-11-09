document.addEventListener("DOMContentLoaded", function() {
    var date = new Date();
    var lastDateVisited = null;
    if(typeof (Storage) !== "undefined") {
        if (localStorage.getItem("lastDateVisited") != null) {
            lastDateVisited = localStorage.getItem("lastDateVisited");
        }
    }
    if(lastDateVisited == null || date - lastDateVisited > 5*60*1000)
        document.addEventListener("mousewheel", resize);
    else
        resize();
});

function resize() {
    try {
        document.removeEventListener("mousewheel", resize);
    } catch (e) {
        console.log("catch");
    }
    var header = document.getElementById("header");
    var logo = document.getElementById("logo");
    var navbar = document.getElementById("navbar");

    header.classList.add("headerLoaded");
    logo.classList.add("logoLoaded");
    navbar.classList.add("navbarLoaded");
}