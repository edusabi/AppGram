import axios from "axios";
import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

///icons
import {
  FaChevronLeft,
  FaTiktok,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";

///Style
import Style from "./Perfil.module.css";

const Perfil = () => {
  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [idade, setIdade] = useState("");
  const [genero, setGenero] = useState("");
  const [foto, setFoto] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [frase, setFrase] = useState("");
  const [whats, setWhats] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user", {
        withCredentials: true, 
      });
      const data = response.data;
      setNome(data.nome);
      setFoto(data.foto);
      setIdade(data.idade);
      setApelido(data.apelido);
      setFrase(data.frase);
      setGenero(data.genero);
      setInstagram(data.instagram);
      setWhats(data.whats);
      setTiktok(data.tiktok);
      setLinkedin(data.linkedin);
    } catch (error) {
      console.error("Erro:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Chama a função apenas uma vez ao carregar o componente

  return (
    <div>

      <img
          src="aaaa-Photoroom.png"
          className={Style.imagemPerfilLogo}
          width="auto"
          height="120px"
      />

      <NavLink to="/pageInitial" className={Style.spanPerfil}>
        <span>
          <FaChevronLeft /> Voltar
        </span>
      </NavLink>

      <div>
        <div className={Style.divPerfil}>
          <NavLink to="/editPerfil" className={Style.iconEdit}>
            <MdEdit className={Style.iconEditHover}/>
          </NavLink>

          <div className={Style.divPerfilInfo}>
            <div>
              {/* Exibe a foto se existir, caso contrário, usa a imagem padrão */}
              <img
                src={foto ? foto : "avatar.png"} // Usando a foto base64 ou imagem padrão
                alt="Foto do perfil"
                className={Style.perfilImg}
              />
            </div>

            <div className={Style.divNomeApelido}>
                <h4>{frase}</h4>
                <h2>{nome}</h2>
                <h3>{apelido}</h3>
                <h3>{genero === "undefined" ? "" : genero}</h3>
                <h3>{idade}</h3>
            </div>

            <div className={Style.divIconsPerfil}>
              {!instagram ? (
                ""
              ) : (
                <NavLink to={instagram} className={Style.instagramIcon}>
                  <FaInstagram />
                </NavLink>
              )}
              {!whats ? (
                ""
              ) : (
                <NavLink
                  to={`https://wa.me/55${whats.replace(/\D/g, "")}`}
                  className={Style.whatsappIcon}
                >
                  <FaWhatsapp />
                </NavLink>
              )}
              {!tiktok ? (
                ""
              ) : (
                <NavLink to={tiktok} className={Style.tiktokIcon}>
                  <FaTiktok />
                </NavLink>
                
              )}
              {!linkedin ? (
                ""
              ) : (
                <NavLink to={linkedin} className={Style.linkedinIcon}>
                  <FaLinkedin />
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
