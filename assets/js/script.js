const MENU = [
  { nimi: 'Cappuccino', hinta: 3.8, kategoria: 'Kahvi' },
  { nimi: 'Latte',      hinta: 4.2, kategoria: 'Kahvi' },
  { nimi: 'Tee',        hinta: 2.5, kategoria: 'Juoma' },
  { nimi: 'Sämpylä',    hinta: 3.0, kategoria: 'Suolainen' },
  { nimi: 'Korvapuusti',hinta: 2.8, kategoria: 'Makea' }
];

let ostoskori = []; 

// --- Render menu ---
function renderMenu(data) {
  const tbody = document.getElementById('menuTableBody');
  if (!tbody) return;

  tbody.innerHTML = data
    .map((item, index) => `
      <tr>
        <td>${item.nimi}</td>
        <td>${item.hinta.toFixed(2)} €</td>
        <td>${item.kategoria}</td>
        <td><button class="add-to-cart" data-index="${index}">Lisää koriin</button></td>
      </tr>
    `).join('');

  // Add button event listeners
  tbody.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.index);
      addToCart(data[i]);
    });
  });

  console.log(`renderMenu(): ${data.length} tuotteita`);
}

// --- Add to cart ---
function addToCart(product) {
  const existing = ostoskori.find(item => item.nimi === product.nimi);
  if (existing) {
    existing.kpl += 1;
  } else {
    ostoskori.push({ nimi: product.nimi, hinta: product.hinta, kpl: 1 });
  }
  renderCart();
}

// --- Render cart ---
function renderCart() {
  const tbody = document.getElementById('cartBody');
  const totalEl = document.getElementById('cartTotal');
  if (!tbody || !totalEl) return;

  tbody.innerHTML = ostoskori
    .map(item => `
      <tr>
        <td>${item.nimi}</td>
        <td>${item.kpl}</td>
        <td>${(item.hinta * item.kpl).toFixed(2)} €</td>
      </tr>
    `).join('');

  const total = ostoskori.reduce((sum, item) => sum + item.hinta * item.kpl, 0);
  totalEl.textContent = total.toFixed(2) + ' €';
}

// --- Initialize menu on page load ---
if (document.getElementById('menuTableBody')) {
  renderMenu(MENU);
}

// --- Search ---
const searchInput = document.getElementById('search');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = query
      ? MENU.filter(item => item.nimi.toLowerCase().includes(query))
      : MENU;

    const highlighted = filtered.map(item => ({
      ...item,
      nimi: query
        ? item.nimi.replace(new RegExp(`(${query})`, 'gi'), '<mark>$1</mark>')
        : item.nimi
    }));

    renderMenu(highlighted);
  });
}

// --- Sort --- //
const sortSelect = document.getElementById('sort');

if (sortSelect) {
  sortSelect.addEventListener('change', () => {
    const sortType = sortSelect.value;
    let sorted = [...MENU];

    if (sortType === 'nimi') {
      sorted.sort((a, b) => a.nimi.localeCompare(b.nimi, 'fi'));
    } else if (sortType === 'hinta') {
      sorted.sort((a, b) => a.hinta - b.hinta);
    }

    renderMenu(sorted);
  });
}

// --- Report generation --- //
function generateReport(menuArray) {
  
  const lines = menuArray.map(item =>
    `${item.nimi};${item.hinta.toFixed(2)};${item.kategoria}`
  );
  return lines.join('\n');
}

const printBtn = document.getElementById('printReport');
const reportPre = document.getElementById('reportOutput');

if (printBtn && reportPre) {
  printBtn.addEventListener('click', () => {
    const report = generateReport(MENU);

    // 1) show in console
    console.log('MENU-raportti:\n' + report);

    // 2) show in the page inside <pre>
    reportPre.textContent = report;
    });
}


// --- CSV add ---
const csvInput = document.getElementById('csvInput');
const addBtn = document.getElementById('addCsvButton');
const msg = document.getElementById('csvMessage');

if (csvInput && addBtn && msg) {
  addBtn.addEventListener('click', () => {
    const parts = csvInput.value.trim().split(';').map(p => p.trim());
    if (parts.length !== 3) {
      msg.textContent = 'Syötä muodossa: nimi;hinta;kategoria';
      return;
    }

    const [nimi, hintaStr, kategoria] = parts;
    const hinta = parseFloat(hintaStr.replace(',', '.'));
    if (nimi.length < 2 || isNaN(hinta) || hinta <= 0 || !kategoria) {
      msg.textContent = 'Virheellinen syöte';
      return;
    }

    MENU.push({ nimi, hinta, kategoria });
    renderMenu(MENU);

    msg.textContent = `Tuote "${nimi}" lisätty!`;
    csvInput.value = '';
  });
}
