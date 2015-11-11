document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("click", isExpandable);
});

function isExpandable() {
    if(event.target.classList.contains("puppetDiv") || event.target.parentNode.classList.contains("puppetDiv")) {
        expand();
    } else if (event.target.classList.contains("box") || event.target.parentNode.classList.contains("box")) {
        expandBox();
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
    setTimeout(function () {
        box.children[0].classList.toggle("hidden");
    }, 300);
    box.classList.toggle("bigBox");
}