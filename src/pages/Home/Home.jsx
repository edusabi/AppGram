import { NavLink } from "react-router-dom";
import Style from "./Home.module.css";

const Home = () => {
  return (
    <div>

      <div className={Style.titlesHome}>
        <h1>Seja bem vindo(a)!</h1>
        <h3>Espero que aproveite!</h3>
      </div>

        <img src="aaaa-Photoroom.png" className={Style.imagemHome}/>

        <div className={Style.buttonsHome}>
          <NavLink to="/registro"><button>Criar conta</button></NavLink>
          <NavLink to="/login"><button>Fazer login</button></NavLink>
        </div>

    </div>
  )
}

export default Home