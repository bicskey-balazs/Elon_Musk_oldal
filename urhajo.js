//km számláló
let kmKiiras = document.querySelector('.kmSzamlalo');
let kmCelKiiras = document.querySelector('.kmCel');
function delay(mennyi) {
    return new Promise(resolve => setTimeout(resolve, mennyi));
}
let holdVmars = 0;
let sebesseg = 2000;
let jatekvege = false;
let aktKM = 0;
let kmCel = 384000;
async function kmSzamlalo(cel) {
    while (!jatekvege) {
        if(aktKM >= cel) {
            aktKM = 0;
            boost.style.display = "none";
            document.querySelector('#urhajo').style.display = "none";
            kmKiiras.style.display = "none";
            meteorok.forEach(m => {
                m.style.display = "none";
            });
            kmCelKiiras.style.display = "none";
            hatter.style.backgroundImage = "";
            if (holdVmars == 0) document.querySelector('.holdVege').style.display = "inline";
            else document.querySelector('.marsVege').style.display = "inline";
            document.querySelector('.jatekVegeGomb').style.display = "inline";
            jatekvege = true;
        }
        await delay(1000);
        aktKM += sebesseg;
        kmKiiras.innerHTML = `km: ${aktKM}`
    }
}
//
// űrhajó irányítása
let urhajo = [document.querySelector('.urhajoResz1'), document.querySelector('.urhajoResz2'), document.querySelector('.urhajoResz3')];

document.querySelector('.urhajoResz1').style.left = "562px";
document.querySelector('.urhajoResz2').style.left = "600px";
document.querySelector('.urhajoResz3').style.left = "640px";

let mozgase = false;
let lenyomva = false;

document.addEventListener('keydown', function(e) {
    if (e.key == 'ArrowLeft') {
        mozgase = true;
        if(!lenyomva) mozgas(-5);
    }
    else if (e.key == 'ArrowRight') {
        mozgase = true;
        if(!lenyomva) mozgas(5);
    }
});

document.addEventListener('keyup', function(e) {
    mozgase = false;
});

async function mozgas(irany) {
    lenyomva = true;
    while(mozgase) {
        await delay(10);
        if (parseInt(document.querySelector('.urhajoResz1').style.left) > 350 && irany == -5) {
            urhajo.forEach(resz => {
                resz.style.left = `${parseInt(resz.style.left) + irany}px`;
            });
        }
        else if(parseInt(document.querySelector('.urhajoResz1').style.left) < 845 && irany == 5) {
            urhajo.forEach(resz => {
                resz.style.left = `${parseInt(resz.style.left) + irany}px`;
            });
        }
        else break;
    }
    lenyomva = false;
}
//
// meteorok
let meteor1 = document.querySelector('.meteor1');
let meteor2 = document.querySelector('.meteor2');
let meteor3 = document.querySelector('.meteor3');
let meteorok = [meteor1, meteor2, meteor3];
let meteorSeged = [false, false, false];
let aktMeteor = 0;

meteorok.forEach(m => {
    m.style.top = "0";
    m.style.left = "0";
    m.style.display = "none";
});

async function meteorCsinal() {
    if(!jatekvege) {
        rnd = Math.floor(Math.random() * 495) + 350;
        meteorok[aktMeteor].style.top = "0";
        meteorok[aktMeteor].style.left = `${rnd}px`;
        meteorok[aktMeteor].style.display = "inline";
        meteorSeged[aktMeteor] = true;
        meteorMozgas(aktMeteor);
        if(aktMeteor != 2) aktMeteor++;
        else aktMeteor = 0;
    }
}

async function meteorMozgas(melyik) {
    while(meteorSeged[melyik]) {
        await delay(10);
        if(parseInt(meteorok[melyik].style.top) < 520 && parseInt(meteorok[melyik].style.top) > 320) {
            utkozes(melyik);
        }
        if(parseInt(meteorok[melyik].style.top) < 580) {
            meteorok[melyik].style.top = `${parseInt(meteorok[melyik].style.top) + 3}px`
        }
        else {
            meteorok[melyik].style.display = "none";
            meteorok[melyik].style.top = "0";
            meteorSeged[melyik] = false;
        }
    }
}
//
//boost
let boost = document.querySelector('.boost');
boost.style.display = "none";
boost.style.top = "0";
let boostSeged = 0;
let boostSeged2 = true;
let boostSeged3 = true;
async function boostCsinal() {
    if (boostSeged == 3 && boostSeged2) {
        boostSeged2 = false
        rnd = Math.floor(Math.random() * 495) + 350;
        boost.style.top = "0";
        boost.style.left = `${rnd}px`;
        boost.style.display = "inline";

        while(boostSeged != 0) {
            await delay(10);
            if(parseInt(boost.style.top) < 560 && parseInt(boost.style.top) > 360) {
                utkozesBoost();
            }
            if(parseInt(boost.style.top) < 650) {
                boost.style.top = `${parseInt(boost.style.top) + 3}px`
            }
            else {
                boost.style.display = "none";
                boost.style.top = "0";
                boostSeged2 = true;
                boostSeged = 0;
            }
        }
    }
    else boostSeged++;
}
//
// ütközés
document.querySelector('.jatekVege').style.display = "none";
document.querySelector('.jatekVegeGomb').style.display = "none";
document.querySelector('.jatekVegeGomb').addEventListener("mouseup", bolygoValasztas)
function utkozes(melyik) {
    if(Math.abs(parseInt(meteorok[melyik].style.left) - parseInt(urhajo[0].style.left)) < 50) {
        jatekvege = true;
        boost.style.display = "none";
        document.querySelector('#urhajo').style.display = "none";
        kmKiiras.style.display = "none";
        meteorok.forEach(m => {
            m.style.display = "none";
        });
        kmCelKiiras.style.display = "none";
        hatter.style.backgroundImage = "";
        document.querySelector('.jatekVege').style.display = "inline";
        document.querySelector('.jatekVegeGomb').style.display = "inline";
    }
}
async function utkozesBoost() {
    if(Math.abs(parseInt(boost.style.left) - parseInt(urhajo[0].style.left)) < 35 && boostSeged3) {
        boostSeged3 = false;
        boost.style.display = "none";
        sebesseg = sebesseg * 5;
        kmKiiras.style.color = "skyblue";
        await delay(4000);
        sebesseg = sebesseg / 5;
        kmKiiras.style.color = "white";
        boostSeged3 = true;
    }
}
//
//játék
document.querySelector('.holdVege').style.display = "none";
document.querySelector('.marsVege').style.display = "none";
let holdGomb = document.querySelector('.holdGomb');
let marsGomb = document.querySelector('.marsGomb');
holdGomb.addEventListener("mouseup", jatekHold);
marsGomb.addEventListener("mouseup", jatekMars);

let hatter = document.querySelector('#urHatter');
let startGomb = document.querySelector('.startGomb');
startGomb.addEventListener("mouseup", bolygoValasztas);

document.querySelector('#urhajo').style.display = "none";
kmKiiras.style.display = "none";
kmCelKiiras.style.display = "none";

document.querySelector('.bolygoValasztas').style.display = "none";
function bolygoValasztas() {
    document.querySelector('.holdVege').style.display = "none";
    document.querySelector('.marsVege').style.display = "none";
    document.querySelector('.jatekVege').style.display = "none";
    document.querySelector('.jatekVegeGomb').style.display = "none";
    startGomb.style.display = "none";
    document.querySelector('.tippek').style.display = "none";
    document.querySelector('.bolygoValasztas').style.display = "inline";
}

async function jatekHold() {
    holdVmars = 0;
    aktKM = 0;
    jatekvege = false;
    sebesseg = 2000;
    kmCel = 384000;
    kmCelKiiras.innerHTML = `Cél: ${kmCel}km`;
    hatter.style.backgroundImage = "url(képek/csillagok8.gif)";
    startGomb.style.display = "none";
    document.querySelector('.tippek').style.display = "none";
    document.querySelector('.bolygoValasztas').style.display = "none";
    document.querySelector('#urhajo').style.display = "inline";
    kmKiiras.style.display = "inline";
    kmCelKiiras.style.display = "inline";
    kmSzamlalo(kmCel);
    while(!jatekvege) {
        await delay(1200);
        boostCsinal();
        meteorCsinal();
    }
}

async function jatekMars() {
    holdVmars = 1;
    aktKM = 0;
    jatekvege = false;
    sebesseg = 50000;
    kmCel = 100;
    kmCelKiiras.innerHTML = `Cél: ${kmCel}millió km`;
    hatter.style.backgroundImage = "url(képek/csillagok8.gif)";
    startGomb.style.display = "none";
    document.querySelector('.tippek').style.display = "none";
    document.querySelector('.bolygoValasztas').style.display = "none";
    document.querySelector('#urhajo').style.display = "inline";
    kmKiiras.style.display = "inline";
    kmCelKiiras.style.display = "inline";
    kmSzamlalo(kmCel*100000);
    while(!jatekvege) {
        await delay(1200);
        boostCsinal();
        meteorCsinal();
    }
}