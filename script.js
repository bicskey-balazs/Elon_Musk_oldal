function UnderLineSetup(){
    var links = document.querySelectorAll('a');

    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('mouseenter', function() {
            this.style.setProperty("--underline-width", "100%");
        });
        links[i].addEventListener('mouseleave', function() {
            this.style.setProperty("--underline-width", "0%");
        });    
    }
}

UnderLineSetup();