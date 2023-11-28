const cursorRounded = document.querySelector('.rounded');

const moveCursor = (e) => {
    
    const mouseY = e.clientY + window.scrollY;
    const mouseX = e.clientX + window.scrollX;

    cursorRounded.style.top = mouseY + 'px';
    cursorRounded.style.left = mouseX + 'px';
}

window.addEventListener('mousemove', moveCursor)