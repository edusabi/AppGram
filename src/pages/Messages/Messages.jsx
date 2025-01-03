import { useEffect, useState, useRef } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import styles from './Messages.module.css';

import { FaChevronLeft } from "react-icons/fa";

const socket = io('https://appgram.discloud.app/', {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

const Messages = () => {
  const { id } = useParams();
  const receiverId = id && id.startsWith(':') ? id.substring(1) : id;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    axios.get('https://appgram.discloud.app/user', { withCredentials: true })
      .then((response) => {
        setUserId(response.data.id);
        socket.emit('entrarSalaPrivada', response.data.id);

        // Requisição para buscar mensagens existentes entre dois usuários
        return axios.get(`https://appgram.discloud.app/mensagens/mensagens/${response.data.id}/${receiverId}`, { withCredentials: true });
      })
      .then((response) => {
        setMessages(response.data);
        scrollToBottom();
      })
      .catch((error) => {
        console.error('Erro ao inicializar o componente:', error);
      });

    socket.on('mensagemPrivada', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      setTimeout(scrollToBottom, 100); // Rola para o final após receber a mensagem
    });

    return () => {
      socket.off('mensagemPrivada');
    };
  }, [receiverId]);

  const sendMessage = () => {
    if (input.trim() && receiverId && userId) {
      const messageData = {
        content: input,
        receiverId: receiverId,
        senderId: userId,
      };

      // Envia a mensagem para o backend
      axios.post('https://appgram.discloud.app/mensagens/enviarMensagem', messageData, { withCredentials: true })
        .then((response) => {
          setMessages((prevMessages) => [...prevMessages, response.data.messageData]);
          setTimeout(scrollToBottom, 100); // Rola para o final após enviar a mensagem
        })
        .catch((error) => {
          console.error('Erro ao enviar mensagem:', error);
        });

      setInput('');
      inputRef.current.focus(); // Mantém o foco no campo de entrada
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.container}>

      <NavLink to="/" className={styles.spanMessages}>
            <span>
              <FaChevronLeft /> Voltar
          </span>
      </NavLink>

      <div className={styles.messagesList}>
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`${styles.messageItem} ${msg.senderId === userId ? styles.sentMessage : styles.receivedMessage}`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.messageForm}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className={styles.textarea}
        />
        <button onClick={sendMessage} className={styles.sendButton}>Enviar</button>
      </div>
    </div>
  );
};

export default Messages;
