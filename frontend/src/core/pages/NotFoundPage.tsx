import ErrorLayout from "../layouts/ErrorLayout";

const NotFoundPage = () => (
  <ErrorLayout
    code="404"
    title="Pagina Non Trovata"
    message="Sembra che la risorsa che stai cercando si sia persa tra i corridoi del nostro hotel. Permettici di riaccompagnarti all'ingresso principale."
    buttonText="Ritorna al Felix Hotel"
  />
);

export default NotFoundPage;
