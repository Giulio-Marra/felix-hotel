import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("felix_token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
  
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 400: 
        error.message = data.message || "Dati non validi";
        break;
        case 401:
          localStorage.removeItem("felix_token");
         error.message = data.message || "Sessione scaduta. Effettua nuovamente il login.";
         window.location.href = "/login";
          break;
        case 403:
          localStorage.removeItem("felix_token");
          error.message = data.message || "Accesso negato. Non hai i permessi necessari.";
          break;
        case 404:
          error.message = data.message || "Risorsa non trovata";
          break;
        case 500:
          error.message = "Errore interno del server Felix Hotel";
          window.location.href = '/server-down';
          break;
        default:
          error.message = data.message || "Qualcosa è andato storto";
      }
    } else if (error.request) {
      error.message = "Nessuna risposta dal server. Verifica la tua connessione o riprova più tardi.";
      window.location.href = '/server-down';
    } else {
      error.message = "Errore nella configurazione della richiesta. Contatta l'assistenza.";
      window.location.href = '/server-down';
    }
    return Promise.reject(error);
  }
);

