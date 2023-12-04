const cursorRounded = document.querySelector('.rounded');

var lastX;
var lastY;

const moveCursor = (e) => {
    
    if (e.clientX != undefined) lastX = e.clientX;
    if (e.clientY != undefined) lastY = e.clientY;

    const mouseY = lastY + window.scrollY;
    const mouseX = lastX + window.scrollX;
    
    cursorRounded.style.top = mouseY + 'px';
    cursorRounded.style.left = mouseX + 'px';
}

window.addEventListener('mousemove', moveCursor);
window.addEventListener('scroll', moveCursor);