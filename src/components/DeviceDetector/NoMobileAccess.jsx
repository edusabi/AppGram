///Style
import Style from "./NoMobileAccess.module.css";

const NoMobileAccess = () => {
  return (
    <div className={Style.divPrincNoMobile}>
      <h1>Acesso restrito a dispositivos móveis</h1>
      <p>Por favor, acesse este site de um notebook ou computador.</p>
    </div>
  );
};

export default NoMobileAccess;
