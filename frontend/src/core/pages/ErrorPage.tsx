import ErrorLayout from "../layouts/ErrorLayout";

const ServerDownPage = () => (
  <ErrorLayout
    code="500"
    title="Server a Riposo"
    message="Stiamo effettuando una manutenzione straordinaria o il server ha avuto un piccolo intoppo. Il team del Felix Hotel sta già risolvendo."
    buttonText="Riprova più tardi"
    isMainError={true}
  />
);

export default ServerDownPage;
