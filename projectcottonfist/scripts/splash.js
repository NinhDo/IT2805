/*
 * FILE NAME: splash.js
 * WRITTEN BY: Ninh Do
 * WHEN: October/November 2016
 * PURPOSE: Detect when the visitor last visited and display a splash screen
 * if the threshold was met (1 second for the purpose of this project)
 * Makes the splash screen into the page's header and navbar after the user scrolls
 * */


// Variables needed in drawInitial and draw
var canvas,
    ctx,
    dy = 0;

document.addEventListener("DOMContentLoaded", function() {
    var date = new Date().getTime();
    var lastDateVisited = null;
    // Saves the current time locally
    if(typeof (Storage) !== "undefined") {
        if (localStorage.getItem("lastDateVisited") != null) {
            lastDateVisited = localStorage.getItem("lastDateVisited");
        }
    }
    // Checks if the last time the site was visited is less than 1 second (for testing purposes. Obviously longer if not testing)
    if (lastDateVisited == null || date - lastDateVisited > 1000 || isNaN(lastDateVisited)) {
        if (localStorage !== undefined) {
            localStorage.setItem("lastDateVisited", date);
        }
        makeBig();
        document.addEventListener("wheel", resize);
        window.addEventListener("keydown", keyScroll);
        drawInitial();
    }
});

function keyScroll(event) {
    console.log(event);
    if (event.key == "ArrowDown") {
        resize();
    }
}

// Creates a canvas and draws an arrow on it. Then calls the draw function on the frame update
function drawInitial() {
    var header = document.getElementById("header");
    var cvs = document.createElement("canvas");
    cvs.id = "splashArrow";
    header.appendChild(cvs);
    canvas = document.getElementById("splashArrow");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgb(34, 79, 120)";
    ctx.globalAlpha = 0;
    ctx.moveTo(canvas.width / 4, canvas.height / 3);
    ctx.lineTo(canvas.width / 2, canvas.height / 3 * 2);
    ctx.lineTo(canvas.width / 4 * 3, canvas.height / 3);
    ctx.stroke();
    ctx.closePath();
    canvas.addEventListener("click", resize);
    window.requestAnimationFrame(draw);
}

// Continues to draw the arrow, but animates it to increase the opacity and move it  downwards
// Calls itself each frame
function draw() {
    dy++;
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "rgb(34, 79, 120)";
    ctx.globalAlpha = (dy % canvas.height + 10) / canvas.height * 2;
    ctx.moveTo(0, dy % canvas.height + 10);
    ctx.lineTo(canvas.width / 2, canvas.height / 5 * 2 + (dy % canvas.height + 10));
    ctx.lineTo(canvas.width, dy % canvas.height + 10);
    ctx.stroke();
    ctx.closePath();
    window.requestAnimationFrame(draw);
}

// Makes the header big for the splash screen
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

// Removes the wheel event listener and stops drawing. Sets the size of the header back to normal
function resize() {
    document.removeEventListener("wheel", resize);
    window.removeEventListener("keypress", keyScroll);
    window.cancelAnimationFrame(draw());

    var html = document.getElementsByTagName("html");
    var header = document.getElementById("header");
    var logo = document.getElementById("logo");
    var navbar = document.getElementById("navbar");
    var wrapper = document.getElementById("wrapper");
    var footer = document.getElementById("footer");
    var canvas = document.getElementById("splashArrow");
    header.removeChild(canvas);

    html[0].style.position = "fixed";

    // Allows the resizing to finish so the site can properly show
    // the transition without cutting off the top part of the header
    setTimeout(function() {
        html[0].style.removeProperty("position");
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