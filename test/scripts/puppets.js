window.addEventListener("DOMContentLoaded", load, false);
var wrapper, info, handP, rodP, shadowP, marionette, ventriloquist, animatronic, box;
function load() {
    wrapper = document.getElementById("wrapper");

    info = document.getElementById("info");

    handP = document.getElementById("handPuppet");
    rodP = document.getElementById("rodPuppet");
    shadowP = document.getElementById("shadowPuppet");
    marionette = document.getElementById("marionette");
    ventriloquist = document.getElementById("ventriloquist");
    animatronic = document.getElementById("animatronic");
    box = document.getElementsByClassName("box");
}
function endreDiverse(id) {
    id.children[0].classList.toggle("hidden");
    id.classList.toggle("bigBox");

    if (id.style.width == "100%") {
        id.style.width = "45%"
        id.style.height = "65px";
        id.style.color = "black";
        id.style.backgroundColor = "#4089CB";
        id.style.position = "relative";
        id.style.zIndex = 1;
        info.innerHTML = "Click the boxes for more information";

    }
    else {
        id.style.zIndex = 10;
        id.style.position = "absolute";
        id.style.color = "#183045";
        id.style.backgroundColor = "#5AA9EF";
        id.style.width = "100%";
        id.style.height = "400px";
        info.innerHTML = "Click the box again to go back";
    }
}

function handPuppet() {
    endreDiverse(handP);
}
function rodPuppet() {
    endreDiverse(rodP);
}
function shadowPuppet() {
    endreDiverse(shadowP);
}
function marionette() {
    endreDiverse(marionette);
}
function ventriloquist() {
    endreDiverse(ventriloquist);
}
function animatronic() {
    endreDiverse(animatronic);
}