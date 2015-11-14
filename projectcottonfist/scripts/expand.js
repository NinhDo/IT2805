/*
 * FILE NAME: expand.js
 * WRITTEN BY: Ninh Do and Nithun Manoharan
 * WHEN: October/November 2016
 * PURPOSE: Listen for clicks and run the appropriate expand function if the target is valid
 * */

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("click", isExpandable);
    window.addEventListener("hashchange", expandBoxFromDropdown);
    // Runs in case the ID was targeted externally (not from puppets.php)
    expandBoxFromDropdown();
});

// Function to check if the target or targets parent element has the "puppetDiv" class for browse.php or "box" for puppets.php
function isExpandable(event) {
    if(event.target.classList.contains("puppetDiv") || event.target.parentNode.classList.contains("puppetDiv")) {
        expand(event);
    } else if (event.target.classList.contains("box") || event.target.parentNode.classList.contains("box")) {
        expandBox(event);
    }
}

// Function to expand the products divs in browse.php
function expand(event) {
    // sets the variable to the appropriate parent div
    var pDiv = (event.target.classList.contains("puppetDiv"))?event.target: event.target.parentNode;

    pDiv.classList.toggle(pDiv.classList[0] + "Loaded");
    for (var i = 0; i < pDiv.children.length; i++) {
        pDiv.children[i].classList.toggle(pDiv.children[i].classList[0] + "Loaded");
    }
}

// Function to expand the puppet info divs in puppets.php
function expandBox(event) {
    var box = (event.target.classList.contains("box")) ? event.target : event.target.parentNode;
    if (!box.children[0].classList.contains("hidden")) {
        box.children[0].classList.toggle("hidden");
    }
    else {
        // Delays showing the text inside to prevent overflowing
        setTimeout(function () {
            box.children[0].classList.toggle("hidden");
        }, 300);
    }
    box.classList.toggle("bigBox");
}
// To expand the puppet info divs in puppets.php when the divs are targeted through links (hash change)
// Pretty similar to expandBox but gets the element with the ID from the location.hash instead of from
// the event.
function expandBoxFromDropdown() {
    // In case it fails (hash is blank), then ignore the error
    try {
        // Drops the hash symbol in front of the id
        var id = location.hash.slice(1);
        var box = document.getElementById(id).parentNode.parentNode.parentNode;
        if (box.classList.contains("box")) {
            setTimeout(function () {
                box.children[0].classList.toggle("hidden");
            }, 300);
            box.classList.toggle("bigBox");
            box.scrollIntoView({block: "start", behaviour: "smooth"});
        }
    } catch (e) {
    }
}