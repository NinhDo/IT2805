document.addEventListener("DOMContentLoaded", function() {
    loadXMLDoc();
});

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

function readFile(xml) {
    var xmlDoc = xml.responseXML;
    var textFromXML="";
    var x = xmlDoc.getElementsByTagName("puppets")[0].getElementsByTagName("puppet");
    var id;
    var type;
    for (var i = 0; i < x.length; i++) {
        id = x[i].children[0].innerHTML;
        type = x[i].getAttribute("type");
        for (var c = 0; c < type.length; c++) {
            if (type[c] == type[c].toUpperCase()) {
                console.log(type[c]);
                console.log(type.slice(c));
                type[c] = " " + type[c];
                break;
            }
        }
        textFromXML += "<div class=\"puppetDiv\" id=\"" + id + "\">" +
            "<img class=\"puppetImage\"" +
            "src=\"/ninhqd/projectcottonfist/images/xmlImages/" +
            x[i].children[1].innerHTML +
            '" alt="' + id + "\">" +
            "<div class = \"nameAndType\"><h3 class=\"puppetName\">" +
            x[i].children[2].innerHTML +
            "</h3>" +
            "<p class=\"puppetType " + x[i].getAttribute("type") + "\">" +
            type +
            "</p></div>" +
            "<p class=\"puppetPrice\">" +
            x[i].children[4].innerHTML +
            "</p>" +
            "<p class=\"puppetSummary\">" +
            x[i].children[5].innerHTML +
            "</p>" +
                "<p class=\"puppetDescription\">" +
            x[i].children[6].innerHTML +
            "</p>" +
            "<button class=\"puppetButton\" type = \"button\" onclick=\"expand\">See more!</button></div>";
    }
    document.getElementById("content").innerHTML = textFromXML;
    console.log("done fetching");
    search();
}