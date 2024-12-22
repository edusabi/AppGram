import { useParams, NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

////img
import Imagem from "../assets/avatar2.png";

import Style from "./PerfilOutros.module.css";

///icons
import { FaChevronLeft } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";


import {
  FaTiktok,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";

const PerfilOutros = () => {
  const navigate = useNavigate();

  const [dados, setDados] = useState([]);
  console.log(dados)
  const { id } = useParams();
  

  const fetchDadosBusca = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/dadosUser/buscarDadosOutrosPerfils/${id}`
      );
  
      if (response.status === 200) {
        const usuario = response.data.userWithBase64; // Extraia a propriedade 'user'
        setDados([usuario]); // Envolva em um array
      }
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };
  
  useEffect(() => {
    fetchDadosBusca();
  }, [id]);

  ///enviar para mensagens
  const messagesPage =()=>{
    navigate(`/messages/${id}`)
  };

  return (
    <div>
        <NavLink to="/pageInitial" className={Style.spanPerfilOutros}>
          <span><FaChevronLeft/> Voltar</span>
        </NavLink>

      <div>

        <div className={Style.divPerfilOutros}>
      
          {dados.map((dados)=>(
          
          <div key={dados.id}>
          <div className={Style.divPerfilOutros}>
  
            <div className={Style.divPerfilInfo}>
              <div>
                {/* Exibe a foto se existir, caso contrário, usa a imagem padrão */}
                <img
                  src={dados.foto ? dados.foto : Imagem}
                  alt="Foto do perfil"
                  className={Style.perfilOutrosImg}
                />


              </div>
  
              <div className={Style.divNomeApelido}>
                  <h4>{dados.frase}</h4>
                  <h2>{dados.nome}</h2>
                  <h3>{dados.apelido}</h3>
                  <h3>{dados.genero === "undefined" ? "" : dados.genero}</h3>
                  <h3>{dados.idade}</h3>
              </div>
  
              <div className={Style.divIconsPerfil}>
                {!dados.instagram ? (
                  ""
                ) : (
                  <NavLink to={dados.instagram} className={Style.instagramIcon}>
                    <FaInstagram />
                  </NavLink>
                )}
                {!dados.whats ? (
                  ""
                ) : (
                  <NavLink
                    to={`https://wa.me/55${dados.whats.replace(/\D/g, "")}`}
                    className={Style.whatsappIcon}
                  >
                    <FaWhatsapp />
                  </NavLink>
                )}
                {!dados.tiktok ? (
                  ""
                ) : (
                  <NavLink to={dados.tiktok} className={Style.tiktokIcon}>
                    <FaTiktok />
                  </NavLink>
                  
                )}
                {!dados.linkedin ? (
                  ""
                ) : (
                  <NavLink to={dados.linkedin} className={Style.linkedinIcon}>
                    <FaLinkedin />
                  </NavLink>
                )}
                <TiMessages className={Style.iconMessagePerfilOutros} onClick={messagesPage}/>
              </div>
            </div>
          </div>
        </div>

          ))}
          
        </div>

      </div>
      



    </div>
  );
};

export default PerfilOutros;
