var canvas, ctx;

document.addEventListener("DOMContentLoaded", function() {
    console.log(event);
    var date = new Date().getTime();
    var lastDateVisited = null;
    canvas = document.getElementById("splashArrow");
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
        window.requestAnimationFrame(draw);
    }
});

function draw() {
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.moveTo(50, 100);
    ctx.lineTo(100, 125);
    ctx.lineTo(150, 100);
    ctx.stroke();
    ctx.closePath();
    window.requestAnimationFrame(draw);
}


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
    window.cancelAnimationFrame(draw);
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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