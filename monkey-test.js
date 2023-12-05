// csimpánz teszt
let ctestGrid = document.querySelector(".ctestGrid");
let squareIndex = 0;
let szamDb = 3;
let melyikSzam = 1;
let szamLista = [];
let pontSzam = 0;
let kattintasok = 0;
const startGame = document.querySelector(".startGame");

function kivalaszt() {
    for(let i = 0; i < szamDb; i++) {
        let rnd = Math.floor(Math.random() * 40);
        szamLista.push(rnd);
    }
}

function korVegeCheck() {
    if(kattintasok == szamDb) {
        kattintasok = 0;
        szamDb++;
        szamLista = [];
        melyikSzam = 1;
        ctestGrid.innerHTML = "";
        squareIndex = 0;
        general();
    }
}

function general() {
    kivalaszt();

    while(squareIndex < 40) {
        let square = document.createElement('div');
        square.classList.add('ctestSquare');
        square.id = `s${squareIndex}`;
        ctestGrid.appendChild(square);
        let seged = true;
        
        szamLista.forEach(szam => {
            if(szam == squareIndex) {
                seged = false;
                square.innerHTML = melyikSzam;
                square.classList.add('ctestSzam');
                square.addEventListener("mouseup", () => {
                    if(square.classList.contains('ctestSzam')) {
                        pontSzam++;
                        kattintasok++;
                        document.querySelector('.pontSzam').textContent = pontSzam;
                        square.classList.remove('ctestSzam');
                        square.innerHTML = "";
                        korVegeCheck();
                    }
                });
                melyikSzam++;
            }
        });
        if(seged) {
            square.classList.add('lathatatlan');
            square.addEventListener("mouseup", () => {
                kattintasok++;
                korVegeCheck();
            });
        }
        squareIndex++;
    }
}

startGame.addEventListener("mouseup", () => {
    general();
    startGame.style.display = "none";
});