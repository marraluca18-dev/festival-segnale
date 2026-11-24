const contenitore = document.getElementById("eventi");
Promise.all([
  fetch("dati/eventi.json").then(risposta => {
    if (!risposta.ok) {
      throw new Error("Errore nel caricamento degli eventi");
    }
    return risposta.json();
  }),

  fetch("dati/sedi.json").then(risposta => {
    if (!risposta.ok) {
      throw new Error("Errore nel caricamento delle sedi");
    }
    return risposta.json();
  })
])
.then(([eventi, sedi]) => {
    contenitore.innerHTML = "";
    if (eventi.length === 0) {
  contenitore.innerHTML = "<p>Nessun evento disponibile.</p>";
  return;
}
 eventi.forEach(evento => {
  const sede = sedi.find(sede => sede.id === evento.sede_id);
  const dataFormattata = new Date(evento.data + "T00:00:00")
  .toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  contenitore.innerHTML += `
  <article class="event-card">
    <img src="${evento.immagine}" alt="${evento.immagine_alt}" width="900" height="600">
    <div class="event-body">
      <p class="event-meta">${dataFormattata.charAt(0).toUpperCase() + dataFormattata.slice(1)} · ${evento.orario} · ${evento.categoria}</p>
      <h3>${evento.titolo}</h3>
      <p>${evento.descrizione}</p>
      <p class="event-place"><strong>Sede:</strong> ${sede?.nome ?? "Sede da definire"}</p>
    </div>
  </article>
`;
  });
})
.catch(errore => {
  contenitore.innerHTML = "<p>Impossibile caricare il programma. Riprova più tardi.</p>";
  console.error(errore);
});