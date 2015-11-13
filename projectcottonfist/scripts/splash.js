/*
 * FILE NAME: splash.js
 * WRITTEN BY: Ninh Do
 * WHEN: October/November 2016
 * PURPOSE: Detect when the visitor last visited and display a splash screen
 * if the threshold was met (1 second for the purpose of this project)
 * Makes the splash screen into the page's header and navbar after the user scrolls
 * */

var canvas,
    ctx,
    dy = 0;

document.addEventListener("DOMContentLoaded", function() {
    var date = new Date().getTime();
    var lastDateVisited = null;
    if(typeof (Storage) !== "undefined") {
        if (localStorage.getItem("lastDateVisited") != null) {
            lastDateVisited = localStorage.getItem("lastDateVisited");
        }
    }

    if (lastDateVisited == null || date - lastDateVisited > 1000 || isNaN(lastDateVisited)) {
        if (localStorage !== undefined) {
            localStorage.setItem("lastDateVisited", date);
        }
        makeBig();
        document.addEventListener("wheel", resize);
        drawInitial();
    }
});

function drawInitial() {
    var header = document.getElementById("header");
    var cvs = document.createElement("canvas");
    cvs.id = "splashArrow";
    header.appendChild(cvs);
    canvas = document.getElementById("splashArrow");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.moveTo(canvas.width / 4, canvas.height / 3);
    ctx.lineTo(canvas.width / 2, canvas.height / 3 * 2);
    ctx.lineTo(canvas.width / 4 * 3, canvas.height / 3);
    ctx.stroke();
    ctx.closePath();
    canvas.addEventListener("click", resize);
    window.requestAnimationFrame(draw);
}

function draw() {
    dy++;
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.globalAlpha = (dy % canvas.height + 10) / canvas.height;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.moveTo(0, dy % canvas.height + 10);
    ctx.lineTo(canvas.width / 2, canvas.height / 5 * 2 + (dy % canvas.height + 10));
    ctx.lineTo(canvas.width, dy % canvas.height + 10);
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
    document.removeEventListener("wheel", resize);
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