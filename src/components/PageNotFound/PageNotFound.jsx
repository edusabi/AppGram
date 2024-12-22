import { NavLink } from "react-router-dom"
import { FaChevronLeft } from "react-icons/fa";

import Style from './PageNotFound.module.css';


///foto
import notFound from "../../assets/notFound.webp";

const PageNotFound = () => {
  return (
    <div>
        <NavLink to="/pageInitial" className={Style.spanPageNotfound}>
            <span>
                <FaChevronLeft /> Voltar
            </span>
        </NavLink>

        <h2 className={Style.h2NotFound}>Por favor, volte a página inicial!</h2>

        <img src={notFound} alt="Notfound" className={Style.notFoundImg} />

    </div>
  )
}

export default PageNotFound