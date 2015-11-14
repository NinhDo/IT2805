/*
 * FILE NAME: filter.js
 * WRITTEN BY: Mathias Flått
 * WHEN: October/November 2016
 * PURPOSE: Search through the products and filter out the unwanted ones
 * */

// Fetches the parameter sent from one of the forms in puppets.php
addEventListener('DOMContentLoaded', function () {
    var url = document.location.href;
    try {
        var params = url.split('?')[1].split('&'),
            data = {}, tmp;
        for (var i = 0, l = params.length; i < l; i++) {
            tmp = params[i].split('=');
            data[tmp[0]] = tmp[1];
        }
        document.getElementById(data.checkbox).checked = true;
    } catch (err) {
    }
});

// Function to search either the name, type, summary, or description
function search() {
    var text = document.getElementById("searchField").value,
        p = document.getElementById("searchBar").children[1],
        typesWanted = [],
        content = document.getElementById("content");

    // Checks if any of the checkboxes are checked
    for (var i = 0; i < p.children.length; i++) {
        if (p.children[i].children[0].checked) {
            typesWanted.push(p.children[i].children[0].id);
        }
    }

    // If there are only checked boxes and no text
    if (typesWanted.length != 0 && text.length == 0) {
        hideAll(content);
        // Goes through each id in the div containing the name and the type and
        // checks the one of the checked boxes matches the class (type)
        for (i = 0; i < content.childElementCount; i++) {
            if (typesWanted.indexOf(content.children[i].children[1].children[1].classList[1]) >= 0) {
                content.children[i].classList.toggle("hidden");
            }
        }

        // If there are only text and no checked boxes
    } else if (text.length != 0 && typesWanted.length == 0) {
        hideAll(content);
        // Goes through each child and checks if any of the text in the childs contain the text requested.
        // Because it uses innerHTML, a third for loop checks the content of a div inside the child to avoid
        // searching through text that is inside the elements (class = "someClass")
        for (i = 0; i < content.childElementCount; i++) {
            for (var x = 0; x < content.children[i].childElementCount; x++) {
                if (x == 1) {
                    for (var y = 0; y < content.children[i].children[1].childElementCount; y++) {
                        if (content.children[i].children[1].children[y].innerHTML.toLowerCase().indexOf(text.toLowerCase()) >= 0) {
                            content.children[i].classList.toggle("hidden");
                            break;
                        }
                    }
                } else if (content.children[i].children[x].innerHTML.toLowerCase().indexOf(text.toLowerCase()) >= 0) {
                    content.children[i].classList.toggle("hidden");
                    break;
                }
            }
        }

        // If there are both checked boxes and text. Combines the first two if statements
    } else if (typesWanted.length != 0 && text.length != 0) {
        hideAll(content);
        for (i = 0; i < content.childElementCount; i++) {
            if (typesWanted.indexOf(content.children[i].children[1].children[1].classList[1]) >= 0) {
                for (x = 0; x < content.children[i].childElementCount; x++) {
                    if (x == 1) {
                        for (var y = 0; y < content.children[i].children[1].childElementCount; y++) {
                            if (content.children[i].children[1].children[y].innerHTML.toLowerCase().indexOf(text.toLowerCase()) >= 0) {
                                content.children[i].classList.toggle("hidden");
                                break;
                            }
                        }
                    } else if (content.children[i].children[x].innerHTML.toLowerCase().indexOf(text.toLowerCase()) >= 0) {
                        content.children[i].classList.toggle("hidden");
                        break;
                    }
                }
            }
        }

        // If nothing, show all
    } else {
        showAll(content);
    }
}
// Hides everything to make searching easier using the .toggle function to the classList
function hideAll(content) {
    for (var i = 0; i < content.childElementCount; i++) {
        if (!content.children[i].classList.contains("hidden")) {
            content.children[i].classList.toggle("hidden");
        }
    }
}

// Shows everything
function showAll(content) {
    for (var i = 0; i < content.childElementCount; i++) {
        if (content.children[i].classList.contains("hidden")) {
            content.children[i].classList.toggle("hidden");
        }
    }
}