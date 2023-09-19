const pytanie = document.querySelector('#pytanie'),
odp_1 = document.querySelector("#odp_1"),
odp_2 = document.querySelector("#odp_2"),
odp_3 = document.querySelector("#odp_3"),
odp_4 = document.querySelector("#odp_4"),
answerArr = [odp_1, odp_2, odp_3, odp_4],
przyciski = document.querySelectorAll("button"),
plansza = document.querySelector("#plansza"),
p = document.querySelector('p'),
podsumowanie = document.querySelector('#podsumowanie');

function uzupelnijPytanie(dane) {
    if(dane.wygrana === true) {
        plansza.style.display = 'none';
        p.style.display = 'none';
        podsumowanie.innerText = "Wygrana"
        podsumowanie.classList.add('wygrana');
        return;
    }

    if(dane.przegrana === true) {
        plansza.style.display = 'none';
        p.style.display = 'none';
        podsumowanie.innerText = 'Niestety to bledna odpoiwiedz. Sprobuj jeszcze raz';
        podsumowanie.classList.add('przegrana');
        return;
    }

    pytanie.innerText = dane.pytanie;
    odp_1.innerText = dane.odpowiedz[0];
    odp_2.innerText = dane.odpowiedz[1];
    odp_3.innerText = dane.odpowiedz[2];
    odp_4.innerText = dane.odpowiedz[3];
}

const liczbaOdpowiedzi = document.querySelector('#poprawna');

function odpZwrotna(dane) {
    liczbaOdpowiedzi.innerText = dane.przekazanePytanie;
    pokazNastepnePytanie();
}

function wyslijOdp(nrOdp) {
    fetch('/quiz_odpowiedz/' + nrOdp, {
        method: 'POST',
    }).then(odp => odp.json())
        .then(dane => {
            console.log(dane);
            odpZwrotna(dane);
        });
}

for(const przycisk of przyciski) {
    przycisk.addEventListener('click', function () {
        const nrOdp = this.dataset.odp;
        wyslijOdp(nrOdp);
    })
}

function pokazNastepnePytanie() {
    fetch('/quiz_pytanie').then(odp => odp.json())
        .then(dane => {
            uzupelnijPytanie(dane);
        });
}

pokazNastepnePytanie();
const promise = new Promise((res, rej) => {
    const wylosowanaLiczba = Math.random().toFixed(2);
    if(wylosowanaLiczba > 0.5) {
        res(wylosowanaLiczba);
    }
    else {
        rej(wylosowanaLiczba);
    }
});

promise.then(wylosowanaLiczba => {
    console.log(`Wylosowana liczba to ${wylosowanaLiczba}, obietnica spelniona`);
}).catch(wylosowanaLiczba => {console.log(`Wylosowana liczba to: ${wylosowanaLiczba}, obietnica nie spelniona`)});
/*
answerArr.forEach(el => {
    el.addEventListener('click', function() {
        const nrOdp = this.dataset.odp;
        wyslijOdp(nrOdp);
    });
}); */

