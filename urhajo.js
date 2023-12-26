let urhajo = [document.querySelector('.urhajoResz1'), document.querySelector('.urhajoResz2'), document.querySelector('.urhajoResz3')];

document.querySelector('.urhajoResz1').style.left = "562px";
document.querySelector('.urhajoResz2').style.left = "600px";
document.querySelector('.urhajoResz3').style.left = "640px";

document.addEventListener('keydown', function(e) {
    if (e.key == 'ArrowLeft') {
        if (parseInt(document.querySelector('.urhajoResz1').style.left) > 350) mozgas(-10);
    }
    else if (e.key == 'ArrowRight') {
        if (parseInt(document.querySelector('.urhajoResz1').style.left) < 845) mozgas(10);
    }
});

function mozgas(irany) {
    urhajo.forEach(resz => {
        resz.style.left = `${parseInt(resz.style.left) + irany}px`;
    });
}