import { useEffect, useState } from 'react';
import axios from 'axios';
import Style from "./MensagensEnviadas.module.css";
import { NavLink } from 'react-router-dom';


//icons
import { TiMessages } from "react-icons/ti";
import { FaChevronLeft } from "react-icons/fa";

const MensagensEnviadas = () => {
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    // Fazer a requisição para obter as mensagens recebidas e as informações dos remetentes
    axios.get('https://appgram.discloud.app/mensagens/mensagens/recebidas', { withCredentials: true })
      .then((response) => {
        setMensagens(response.data.mensagens);
      })
      .catch((error) => {
        console.error('Erro ao buscar mensagens recebidas e informações dos remetentes:', error);
      });
  }, []);

  return (
    <div className={Style.container}>

        <NavLink to="/pageInitial" className={Style.spanMensagens}>
            <span>
                <FaChevronLeft /> Voltar
            </span>
        </NavLink>

      <h1 className={Style.header}>Mensagens Recebidas</h1>
      <div className={Style.messagesContainer}>
        {mensagens.length > 0 ? (
          mensagens.map((mensagem) => (
              <div key={mensagem._id} className={Style.messageCard}>
              {mensagem.senderInfo && (
                  <div className={Style.senderInfo}>
                  <img src={mensagem.senderInfo.foto ? mensagem.senderInfo.foto : "avatar.png"} alt="Foto do remetente" />
                  <p className={Style.name}>{mensagem.senderInfo.nome}</p>
              <div className={Style.messageContent}>
                <p className={Style.messageContent}>Mensagem: {mensagem.content}</p>
                <NavLink to={`/messages/:${mensagem.senderId}`} className={Style.goToMessage}><p>Ir para a mensagem <TiMessages/></p></NavLink>
                <p className={Style.timestamp}>{new Date(mensagem.timestamp).toLocaleString()}</p>
              </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className={Style.noMessages}>Nenhuma mensagem recebida.</p>
        )}
      </div>
    </div>
  );
}

export default MensagensEnviadas;
