/*
 * FILE NAME: expand.js
 * WRITTEN BY: Ninh Do and Nithun Manoharan
 * WHEN: October/November 2016
 * PURPOSE: Listen for clicks and run the appropriate expand function if the target is valid
 * */

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("click", isExpandable);
    window.addEventListener("hashchange", expandBoxFromDropdown);
    expandBoxFromDropdown();
});

function isExpandable(event) {
    if(event.target.classList.contains("puppetDiv") || event.target.parentNode.classList.contains("puppetDiv")) {
        expand(event);
    } else if (event.target.classList.contains("box") || event.target.parentNode.classList.contains("box")) {
        expandBox(event);
    }
}

function expand(event) {
    var pDiv = (event.target.classList.contains("puppetDiv"))?event.target: event.target.parentNode;

    pDiv.classList.toggle(pDiv.classList[0] + "Loaded");
    for (var i = 0; i < pDiv.children.length; i++) {
        pDiv.children[i].classList.toggle(pDiv.children[i].classList[0] + "Loaded");
    }
}

function expandBox(event) {
    var box = (event.target.classList.contains("box")) ? event.target : event.target.parentNode;
    if (!box.children[0].classList.contains("hidden")) {
        box.children[0].classList.toggle("hidden");
    }
    else {
        setTimeout(function () {
            box.children[0].classList.toggle("hidden");
        }, 300);
    }
    box.classList.toggle("bigBox");
}

function expandBoxFromDropdown() {
    try {
        var id = location.hash.slice(1);
        var box = document.getElementById(id).parentNode.parentNode.parentNode;
        if (box.classList.contains("box")) {
            setTimeout(function () {
                box.children[0].classList.toggle("hidden");
            }, 300);
            box.classList.toggle("bigBox");
        }
    } catch (e) {
        console.log(e);
    }
}