import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
    'Content-Type': 'application/json',
  },
})

// Intercettore per le risposte
axiosInstance.interceptors.response.use(
  (response) => {
    // Se la risposta ha successo (status 2xx), la restituiamo così com'è
    return response;
  },
  (error) => {
    // Se qualcosa va storto, entriamo qui
    if (error.response) {
      // Il server ha risposto con un errore (es. 400, 401, 404, 500)
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 401:
          console.error("Sessione scaduta o non autorizzata");
          // Qui potresti reindirizzare l'utente al login
          break;
        case 403:
          console.error("Non hai i permessi per questa azione (ADMIN richiesto)");
          break;
        case 404:
          console.error("Risorsa non trovata");
          break;
        case 500:
          console.error("Errore interno del server Felix Hotel");
          window.location.href = '/server-down';
          break;
        default:
          console.error("Errore API:", data.message || "Qualcosa è andato storto");
      }
    } else if (error.request) {
      // La richiesta è stata inviata ma non è arrivata risposta (es. Server offline)
      console.error("Il server non risponde. Controlla se Spring Boot è attivo .");
      window.location.href = '/server-down';
    } else {
      // Errore durante il setup della richiesta
      console.error("Errore critico:", error.message);
      window.location.href = '/server-down';
    }

    // Molto importante: rilanciamo l'errore per poterlo gestire (opzionalmente) 
    // anche nel componente specifico (es. per mostrare un alert all'utente)
    return Promise.reject(error);
  }
);