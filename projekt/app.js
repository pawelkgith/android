const express = require('express');
const app = express();

const host = '127.0.0.1';
const port = 5555;
const www = __dirname + '\\www';

app.listen(port, () => {
    console.log("serwer jest podpiety pod adresem " + host + ":" + port);
});

app.use(express.static(www));

let przekazanePytanie = 0;
let koniecGry = false;

const pytania = [
    {
        pytanie: 'Wartość i typ zmiennej w języku PHP sprawdzisz za pomocą funkcji?',
        odpowiedz: ['readfile()', 'var_dump()', 'implode()', 'strlen()'],
        poprawnaOdpowiedz: 1, 
    },
    {
        pytanie: 'Instrukcja for moze byc zastapiana instrukcja',
        odpowiedz: ['foreach', 'switch', 'break', 'case'],
        poprawnaOdpowiedz: 0,
    },
    {
        pytanie: 'Prosta animacja może być zapisana w formacie?',
        odpowiedz: ['GIF', 'PNG', 'BMP', 'JPG'],
        poprawnaOdpowiedz: 0,
    },
    {
        pytanie: 'Użytkownik wprowadził adres zasobu, ktorego nie ma na serwerze. Próba polaczenia wygeneruje blad?',
        odpowiedz: ['400', '503', '500', '404'],
        poprawnaOdpowiedz: 3,
    }
]

app.get('/quiz_pytanie', (req, res) => {
    if(przekazanePytanie === pytania.length) {
        res.json({
            wygrana: true,
        });
        console.log("Koniec gry. Wygrana");
    }
    else {
        if(koniecGry) {
            res.json({
                przegrana: true,
            });
        }
        else {
            let pytanie = pytania[przekazanePytanie].pytanie;
            let odpowiedz = pytania[przekazanePytanie].odpowiedz;
            res.json({
                pytanie, odpowiedz,
            });
            console.log(pytanie, odpowiedz);
        }
    }
});

app.post('/quiz_odpowiedz/:i', (req, res) => {
    if(koniecGry) {
        res.json({
            przegrana: true,
        });
    }
    const { i } = req.params;
    const biezacePytanie = pytania[przekazanePytanie];
    console.log(`Otrzymana odpowiedź: ${i}`);
    console.log(`Status odpowiedzi:  ${biezacePytanie.poprawnaOdpowiedz === Number(i)}`);
    if(biezacePytanie.poprawnaOdpowiedz === Number(i)) {
        przekazanePytanie++;
        res.json({
            wygrana : true,
            przekazanePytanie,
        });
    }
    else {
        res.json({
            wygrana: false,
        });
        koniecGry = true;
    }
})