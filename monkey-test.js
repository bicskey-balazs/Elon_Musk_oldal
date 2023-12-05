// csimpánz teszt
let ctestGrid = document.querySelector(".ctestGrid");
let squareIndex = 0;
let szamDb = 3;
let melyikSzam = 1;
let szamLista = [];
let pontSzam = 0;
let kattintasok = 0;
let hibak = 0;
let vesztese = false;
let elso = true;
let joszam = 1;
const startGame = document.querySelector(".startGame");

function kivalaszt() {
    for(let i = 0; i < szamDb; i++) {
        let rnd = Math.floor(Math.random() * 40);
        while(szamLista.includes(rnd)) {
            rnd = Math.floor(Math.random() * 40);
        }
        szamLista.push(rnd);
    }
}

function korVegeCheck() {
    if(kattintasok == szamDb) {
        joszam = 1;
        elso = true;
        kattintasok = 0;
        szamDb++;
        szamLista = [];
        melyikSzam = 1;
        ctestGrid.innerHTML = "";
        squareIndex = 0;

        if(szamDb == 40) document.querySelector('.pontSzam').textContent = "Nyertél!";
        else general();
    }
}

function vesztes() {
    document.querySelector('.pontSzam').textContent = "3 hiba, vesztettél!";
    ctestGrid.innerHTML = "";
    vesztese = true;
}

function general() {
    kivalaszt();

    while(squareIndex < 40) {
        if(vesztese) {
            ctestGrid.innerHTML = "";
            break;
        }
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
                        if(square.innerHTML == joszam) {
                            if(elso) {
                                elso = false;
                                document.querySelectorAll('.ctestSzam').forEach(s => {
                                    s.style.backgroundColor = "#fff";
                                    s.style.color = "#fff";
                                });
                            }
                            pontSzam++;
                            kattintasok++;
                            joszam++;
                            document.querySelector('.pontSzam').textContent = `Pontszám:${pontSzam} Hibák:${hibak}`;
                            square.classList.remove('ctestSzam');
                            square.innerHTML = "";
                            korVegeCheck();
                        }
                        else {
                            hibak++;
                            document.querySelector('.pontSzam').textContent = `Pontszám:${pontSzam} Hibák:${hibak}`;
                            if(hibak == 3) vesztes();
                        }
                    }
                });
                melyikSzam++;
            }
        });
        if(seged) {
            square.classList.add('lathatatlan');
            square.addEventListener("mouseup", () => {
                kattintasok++;
                hibak++;
                document.querySelector('.pontSzam').textContent = `Pontszám:${pontSzam} Hibák:${hibak}`;
                if(hibak == 3) vesztes();
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