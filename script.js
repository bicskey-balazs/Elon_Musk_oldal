function UnderLineSetup(){
    var links = document.querySelectorAll('.topnav a');

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

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function quickNav(){
    const contentWindow = document.querySelector(".cnt");
    const contentChild = document.querySelectorAll(".cnt section");
    const navElements = document.querySelectorAll(".quickNav li");

    contentWindow.addEventListener("scroll", (e)=>{
        for(let i = 0; i < contentChild.length; i++){
            var height = contentChild[i].offsetHeight;
            var scroll = contentWindow.scrollTop;

            var current = Math.floor(scroll/height);

            for(let j = 0; j < navElements.length; j++){  
                if (j == current) navElements[j].setAttribute("aria-label", "selected");
                else navElements[j].removeAttribute("aria-label");
            }
        }
    });
}

function Rotate360() {
    const handles = document.querySelectorAll(".handle");

    var target = null;

    handles.forEach(handle => {
        handle.addEventListener("mousedown", (e)=>{
            target = e.target;
        }); 
    });

    window.addEventListener("mousemove", (e) => {
        if(target == null){ return; }

        RotateTesla(e.clientX, target);
    });

    window.addEventListener("mouseup", ()=>{
        target = null;  
    });
}


function RotateTesla(cursorX, handle) {
    var slider = handle.parentElement;
    var image = slider.previousElementSibling;
    var model = handle.parentElement.parentElement.parentElement.id;
    var picNum = 50;

    let midHandle = handle.offsetWidth/2;
    let newPos = (cursorX - slider.offsetLeft - midHandle);
    
    newPos = clamp(newPos, 0, slider.offsetWidth - midHandle);
    
    let divider = slider.offsetWidth / picNum;
    let snappedPos = Math.round(newPos / divider) * divider;
    
    let currentPic = snappedPos / divider;
    
    handle.style.left = snappedPos + "px";
    image.src = "képek/Model"+ model +"/"+ currentPic + ".png";
}