document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("click", isPuppetDiv);
});

function isPuppetDiv() {
    if(event.target.classList.contains("puppetDiv") || event.target.parentNode.classList.contains("puppetDiv")) {
        expand();
    }

}

function expand() {
    var pDiv = (event.target.classList.contains("puppetDiv"))?event.target: event.target.parentNode;

    pDiv.classList.toggle(pDiv.classList[0] + "Loaded");
    for (var i = 0; i < pDiv.children.length; i++) {
        pDiv.children[i].classList.toggle(pDiv.children[i].classList[0] + "Loaded");
    }
}