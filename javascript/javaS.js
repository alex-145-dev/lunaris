/*---=====menu hamburger=====---*/
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
  }

/*---===== slide (//1)=====---*/

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider');
  const images = document.querySelectorAll('.slider img');
  const totalImages = images.length;

  let currentIndex = 0;
  let isAnimating = false;

  function moveSlider() {
    if (isAnimating) return;
    isAnimating = true;

    // Incrementa l'indice
    currentIndex++;
    
    // Aggiunge una transizione fluida
    slider.style.transition = 'transform 1s ease-in-out';
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Quando raggiunge l'ultimo elemento, resetta senza transizione
    if (currentIndex === totalImages - 1) {
      setTimeout(() => {
        slider.style.transition = 'none';
        slider.style.transform = `translateX(0)`;
        currentIndex = 0;
        isAnimating = false;
      }, 1000); // Aspetta il completamento della transizione
    } else {
      isAnimating = false;
    }
  }

  // Avvia lo slider con un intervallo di 3 secondi
  setInterval(moveSlider, 3000);
});

/*---============================JS DATA / ORA / TEMPO E LOCALITA---===================================*/
document.addEventListener("DOMContentLoaded", function() {
  // Funzione per aggiornare la data
  function aggiornaData() {
      const oggi = new Date();
      const opzioniData = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      document.getElementById("data").innerText = oggi.toLocaleDateString('it-IT', opzioniData);
  }
  
  // Funzione per aggiornare l'ora
  function aggiornaOra() {
      const oggi = new Date();
      const opzioniOra = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
      document.getElementById("ora").innerText = oggi.toLocaleTimeString('it-IT', opzioniOra);
  }

  // Funzione per ottenere il tempo e la località
  async function aggiornaTempoLocalita() {
      const apiKey = 'YOUR_API_KEY'; // Sostituisci con la tua chiave API
      const lat = '41.9028'; // Latitudine di Roma
      const lon = '12.4964'; // Longitudine di Roma

      try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=it&units=metric`);
          if (!response.ok) {
              throw new Error(`Errore nella risposta: ${response.status}`);
          }
          const data = await response.json();

          // Estrai la località e il tempo
          const localita = `${data.name}, ${data.sys.country}`;
          const tempo = `${data.weather[0].description}, ${data.main.temp}°C`;

          // Aggiorna la località e il tempo
          document.getElementById("tempo").innerText = `${localita} - ${tempo}`;
      } catch (error) {
          console.error("Errore nel recupero delle informazioni meteo:", error);
          document.getElementById("tempo").innerText = "Impossibile recuperare le informazioni meteo.";
      }
  }

  // Aggiorna la data e l'ora all'avvio
  aggiornaData();
  aggiornaOra();
  
  // Aggiorna l'ora ogni secondo
  setInterval(aggiornaOra, 1000);

  // Aggiorna la località e il tempo all'avvio e poi ogni ora
  aggiornaTempoLocalita();
  setInterval(aggiornaTempoLocalita, 3600000); // Ogni ora
});

/*=====---javascript contatti---=====*/
function showOverlay(title, details) {
  const overlay = document.getElementById('overlay');
  document.getElementById('overlay-title').textContent = title;
  document.getElementById('overlay-details').textContent = details;
  overlay.classList.remove('hidden');
}

function hideOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.classList.add('hidden');
}