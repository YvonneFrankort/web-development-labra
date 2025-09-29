console.log('Hei! Warm autumn greetings from our cafe!');
const arvo1 = 'Pumpkin Latte';
const price1= 6.50;

const arvo2 = 'Pumpkin pie';
const price2= 4.80;

function teeYhteenveto(arvo, price){ 
    return `${arvo} – ${price}`; }

console.log(teeYhteenveto(arvo1, price1));
console.log(teeYhteenveto(arvo2, price2));

const otsikko = document.querySelector('h1'); 
if (otsikko) { otsikko.textContent = otsikko.textContent + ' – ' + new Date().toLocaleDateString('fi-FI'); }

const dateHeading = document.getElementById('todays-date');
if (dateHeading) {
  dateHeading.textContent = new Date().toLocaleDateString('fi-FI');
}

document.querySelectorAll('.card').forEach((el, i) => {
  const title = el.querySelector('h3');
  if (title) title.textContent = `${i + 1}. ` + title.textContent;
});

const p = document.createElement('p');
p.textContent = 'Tervetuloa kahvilamme! Meillä on tarjolla herkkullisia syysuutuuksia';
document.querySelector('main')?.appendChild(p);


document.querySelectorAll('#toggle-specials').forEach(btn => {
  btn.addEventListener('click', () => {
    const kohde = document.querySelector('[aria-label="Päivän-erikoiset"]');
    if (kohde) kohde.hidden = !kohde.hidden;
  });
});

document.getElementById('highlight-specials')?.addEventListener('click', () => {
  const kohde = document.querySelector('[aria-label="Päivän-erikoiset"]');
  kohde?.classList.toggle('highlight');
});


const form = document.querySelector('form'); // rajaa esim. form#tilaus
if (form) {
  const msg = document.createElement('p');
  form.prepend(msg);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const virheet = [];
    const nimi = form.querySelector('input[name="name"]')?.value.trim();
    const sahkoposti = form.querySelector('input[name="email"]')?.value.trim();
    const puhelin = form.querySelector('input[name="phone"]')?.value.trim();
    const koko = form.querySelector('input[name="size"]:checked')?.value;
    if (!nimi) virheet.push('Nimi puuttuu');
    if (!sahkoposti) virheet.push('Sähköposti puuttuu');
    if (!puhelin) virheet.push('Puhelinnumero puuttuu');
    if (!koko) virheet.push('Koko puuttuu');

    if (virheet.length) {
      msg.textContent = 'Tarkista lomake: ' + virheet.join(', ');
      msg.className = 'alert';
    } else {
      msg.textContent = 'Kiitos!';
      msg.className = 'success';
      form.reset();
    }
  });
}
