var links = document.querySelectorAll('a');

for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('mouseenter', function() {
        this.style.setProperty("--underline-width", "100%");
        console.log(this);
    });
    links[i].addEventListener('mouseleave', function() {
        console.log("leave");
        this.style.setProperty("--underline-width", "0%");
    });    
}