function modifyRadius(radius) {
  const circle = document.getElementById('circle');
  circle.style.width = radius + "px";
  circle.style.height = radius + "px";
  circle.textContent = "Radius: " + radius + "px";
}

modifyRadius(document.getElementById("slider").value);

// Formularz

let sumaObjetosci = 0;

function dodajPaczke() {
    // Pobieranie wartości z formularza
    const nazwa = document.getElementById("nazwa").value;
    const szerokosc = parseFloat(document.getElementById("szerokosc").value);
    const wysokosc = parseFloat(document.getElementById("wysokosc").value);
    const glebokosc = parseFloat(document.getElementById("glebokosc").value);

    // Obliczanie objętości paczki
    const objetosc = szerokosc * wysokosc * glebokosc;

    // Tworzenie nowego wiersza w tabeli
    const nowyWiersz = `
        <tr>
            <td>${nazwa}</td>
            <td>${szerokosc} cm</td>
            <td>${wysokosc} cm</td>
            <td>${glebokosc} cm</td>
            <td>${objetosc} cm³</td>
        </tr>
    `;
    document.getElementById("paczkaTableBody").insertAdjacentHTML('beforeend', nowyWiersz);

    // Aktualizacja sumarycznej objętości
    sumaObjetosci += objetosc;
    document.getElementById("sumaObjetosci").textContent = `${sumaObjetosci} cm³`;

    // Resetowanie formularza
    document.getElementById("paczkaForm").reset();
}

function clearForm() {
  document.getElementById("paczkaForm").reset();
}

// Notatnik

// Przechowywanie aktualnie edytowanej notatki (null - nowa notatka)
let edytowanaNotatkaId = null;

// localStorage
function zaladujNotatki() {
  const notatkiLista = document.getElementById("notatkiLista");
  notatkiLista.innerHTML = ""; // Wyczyść listę
  const notatki = JSON.parse(localStorage.getItem("notatki")) || [];

  notatki.forEach((notatka, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item list-group-item-action";
      li.textContent = notatka.tytul;
      li.onclick = () => edytujNotatke(index); 
      notatkiLista.appendChild(li);
  });
}

// Funkcja do zapisywania nowej lub edytowanej notatki
function zapiszNotatke() {
  const tytul = document.getElementById("tytul").value;
  const tresc = document.getElementById("tresc").value;

  if (!tytul) return; // Sprawdzenie, czy tytuł jest wypełniony

  let notatki = JSON.parse(localStorage.getItem("notatki")) || [];

  if (edytowanaNotatkaId !== null) {
      // Aktualizacja istniejącej notatki
      notatki[edytowanaNotatkaId] = { tytul, tresc };
  } else {
      // Dodawanie nowej notatki
      notatki.push({ tytul, tresc });
  }

  localStorage.setItem("notatki", JSON.stringify(notatki)); 
            wyczyscFormularz(); 
            zaladujNotatki(); 
        }

// Funkcja do edycji notatki
function edytujNotatke(index) {
  const notatki = JSON.parse(localStorage.getItem("notatki"));
  const notatka = notatki[index];
  edytowanaNotatkaId = index; // Ustawienie aktualnie edytowanej notatki
  document.getElementById("tytul").value = notatka.tytul;
  document.getElementById("tresc").value = notatka.tresc;
}

// Funkcja do czyszczenia formularza
function wyczyscFormularz() {
  document.getElementById("notatkaForm").reset();
  edytowanaNotatkaId = null;
}

// Ładowanie notatek przy pierwszym uruchomieniu
window.onload = zaladujNotatki;