// csimpánz teszt
let ctestGrid = document.querySelector(".ctestGrid")
let squareIndex = 0;
let szamDb = 3;
let melyikSzam = 1;
let szamLista = [];
let pontSzam = 0

function kivalaszt() {
    for(let i = 0; i < szamDb; i++) {
        let rnd = Math.floor(Math.random() * 40);
        szamLista.push(rnd);
    }
}

function general() {
    kivalaszt();

    while(squareIndex < 40) {
        let square = document.createElement('div');
        square.classList.add('ctestSquare');
        square.id = `s${squareIndex}`;
        ctestGrid.appendChild(square);
        
        szamLista.forEach(szam => {
            if(szam == squareIndex) {
                square.innerHTML = melyikSzam;
                square.classList.add('ctestSzam');
                square.addEventListener("mouseup", () => {
                    pontSzam++;
                    document.querySelector('.pontSzam').innerHTML = pontSzam;
                });
                melyikSzam++;
            }
        });
        squareIndex++;
    }
}

general();