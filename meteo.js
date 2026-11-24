const contenitoreMeteo = document.getElementById("meteo");
fetch("https://api.open-meteo.com/v1/forecast?latitude=45.0703&longitude=7.6869&current=temperature_2m,wind_speed_10m&timezone=Europe%2FRome")
  .then(risposta => {
  if (!risposta.ok) {
    throw new Error("Errore nel caricamento del meteo");
  }
  return risposta.json();
})
  .then(dati => {
    const temperatura = dati.current.temperature_2m;
const vento = dati.current.wind_speed_10m;
const ora = dati.current.time;

contenitoreMeteo.innerHTML = `
  <p><strong>Temperatura:</strong> ${temperatura} °C</p>
  <p><strong>Vento:</strong> ${vento} km/h</p>
  <p><strong>Ora del dato:</strong> ${ora.slice(11, 16)}</p>
`;
})
.catch(errore => {
  contenitoreMeteo.innerHTML = "<p>Dati meteo momentaneamente non disponibili.</p>";
  console.error(errore);
});