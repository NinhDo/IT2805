/*
 * FILE NAME: filter.js
 * WRITTEN BY: Mathias Flått
 * WHEN: October/November 2016
 * PURPOSE: Search through the products and filter out the unwanted ones
 * */


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

function search() {
    var text = document.getElementById("searchField").value,
        p = document.getElementById("searchBar").children[1],
        typesWanted = [],
        content = document.getElementById("content");
    for (var i = 0; i < p.children.length; i++) {
        if (p.children[i].children[0].checked) {
            typesWanted.push(p.children[i].children[0].id);
        }
    }
    if (typesWanted.length != 0 && text.length == 0) {
        hideAll(content);
        for (i = 0; i < content.childElementCount; i++) {
            if (typesWanted.indexOf(content.children[i].children[1].children[1].classList[1]) >= 0) {
                content.children[i].classList.toggle("hidden");
            }
        }

    } else if (text.length != 0 && typesWanted.length == 0) {
        hideAll(content);
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
    } else {
        showAll(content);
    }
}

function hideAll(content) {
    for (var i = 0; i < content.childElementCount; i++) {
        if (!content.children[i].classList.contains("hidden")) {
            content.children[i].classList.toggle("hidden");
        }
    }
}

function showAll(content) {
    for (var i = 0; i < content.childElementCount; i++) {
        if (content.children[i].classList.contains("hidden")) {
            content.children[i].classList.toggle("hidden");
        }
    }
}