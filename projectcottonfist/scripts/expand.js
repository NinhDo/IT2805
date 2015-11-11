document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("click", isExpandable);
    expandBoxFromDropdown();
});

function isExpandable() {
    if(event.target.classList.contains("puppetDiv") || event.target.parentNode.classList.contains("puppetDiv")) {
        expand();
    } else if (event.target.classList.contains("box") || event.target.parentNode.classList.contains("box")) {
        expandBox();
    } else if (event.target.parentNode.parentNode.id == "dropdown") {
        expandBoxFromDropdown();
    }

}

function expand() {
    var pDiv = (event.target.classList.contains("puppetDiv"))?event.target: event.target.parentNode;

    pDiv.classList.toggle(pDiv.classList[0] + "Loaded");
    for (var i = 0; i < pDiv.children.length; i++) {
        pDiv.children[i].classList.toggle(pDiv.children[i].classList[0] + "Loaded");
    }
}

function expandBox() {
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
        var box = document.getElementById(id);
        setTimeout(function () {
            box.children[0].classList.toggle("hidden");
        }, 300);
        box.classList.toggle("bigBox");
    } catch (e) {
        console.log(e.message);
    }
}