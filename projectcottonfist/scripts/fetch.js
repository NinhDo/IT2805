/*
 * FILE NAME: fetch.js
 * WRITTEN BY: Mathias Flått
 * WHEN: October/November 2016
 * PURPOSE: Fetch and scan the XML document productListing.xml and create a div for each product to view on the page
 * */

document.addEventListener("DOMContentLoaded", function() {
    loadXMLDoc();
});

// Fetches the XML document and sends it to the next function if the file is ready
function loadXMLDoc() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/ninhqd/projectcottonfist/assets/productListing.xml", true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                readFile(xhr);
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.send(null);
}

// Reads the XML file and creates the divs containing the information and puts it inside the content div
// try catches are used in case the user uses ie that reads responseXML a bit different
function readFile(xml) {
    var xmlDoc = xml.responseXML;
    var textFromXML="";
    var x = xmlDoc.getElementsByTagName("puppets")[0].getElementsByTagName("puppet");
    var id, type, img, name, price, summary, description;
    for (var i = 0; i < x.length; i++) {
        try {
            id = x[i].children[0].innerHTML;
        }
        catch (e) {
            id = x[i].childNodes[1].textContent;
        }
        type = x[i].getAttribute("type");
        if (type == "undefined") type = x[i].getAttribute("id");
        try {
            img = x[i].children[1].innerHTML;
        }
        catch (e) {
            img = x[i].childNodes[3].textContent;
        }
        try {
            name = x[i].children[2].innerHTML;
        }
        catch (e) {
            name = x[i].childNodes[5].textContent;
        }
        try {
            price = x[i].children[4].innerHTML;
        }
        catch (e) {
            price = x[i].childNodes[9].textContent;
        }
        try {
            summary = x[i].children[5].innerHTML;
        }
        catch (e) {
            summary = x[i].childNodes[11].textContent;
        }
        try {
            description = x[i].children[6].innerHTML;
        }
        catch (e) {
            description = x[i].childNodes[13].textContent;
        }

        for (var c = 0; c < type.length; c++) {
            if (type[c] == type[c].toUpperCase()) {
                type = type.slice(0, c) + " " + type.slice(c);
                break;
            }
        }
        textFromXML += "<div class=\"puppetDiv\" id=\"" + id + "\">" +
            "<img class=\"puppetImage\"" +
            "src=\"/ninhqd/projectcottonfist/images/xmlImages/" +
            img +
            '" alt="' + id + "\">" +
            "<div class = \"nameAndType\"><h3 class=\"puppetName\">" +
            name +
            "</h3>" +
            "<p class=\"puppetType " + x[i].getAttribute("type") + "\">" +
            type +
            "</p></div>" +
            "<p class=\"puppetPrice\">" +
            price +
            "</p>" +
            "<p class=\"puppetSummary\">" +
            summary +
            "</p>" +
                "<p class=\"puppetDescription\">" +
            description +
            "</p>" +
            "<button class=\"puppetButton\" type = \"button\" onclick=\"expand\">See more!</button></div>";
    }
    document.getElementById("content").innerHTML = textFromXML;
    // Because this file is always accompanied by filter.js and is loaded later, it can call on the search function inside filter.js
    // This is used in case the form submission from puppets.php was used and sent some parameters
    search();
}