var cursor;

var lastX;
var lastY;

cursorHideElements = ["body", "a"];

const moveCursor = (e) => {
    
    if (e.clientX != undefined) lastX = e.clientX;
    if (e.clientY != undefined) lastY = e.clientY;

    const mouseY = lastY + window.scrollY;
    const mouseX = lastX + window.scrollX;
    
    cursor.style.top = mouseY + 'px';
    cursor.style.left = mouseX + 'px';
}

onload = () => {
    cursor = document.createElement('div');
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.border = '2px solid #fff';
    cursor.style.borderRadius = '10% 50% 50% 50%';
    cursor.style.position = 'absolute';
    cursor.style.top = '0';
    cursor.style.left = '0';
    cursor.style.pointerEvents = 'none';
    cursor.id = 'cursor';
    document.body.appendChild(cursor);

    for (var i = 0; i < cursorHideElements.length; i++) {
        for(var j = 0; j < document.querySelectorAll(cursorHideElements[i]).length; j++) {
            document.querySelectorAll(cursorHideElements[i])[j].classList.add("hidden-cursor");
        }
    }

};

window.addEventListener('mousemove', moveCursor);
window.addEventListener('scroll', moveCursor);