import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Style from "./Login.module.css";
import { FaChevronLeft } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(""); // Para mostrar mensagens de erro
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmitFormLogin = async (e) => {
    e.preventDefault();

    try {
      const User = {
        email,
        senha,
      };

      // Fazendo a requisição para o backend
      const response = await axios.post(
        "https://appgram.discloud.app/login",
        User,
        { withCredentials: true }
      );

      const data = response.data;
      console.log(data);

      if (response.status === 200) {
        navigate("/pageInitial"); // Redireciona para a página inicial após o login
      };

    } catch (error) {
      // Tratamento de erro
      if (error.response) {
        // Erro vindo do servidor
        if (error.response.status === 404) {
          setMessage("Usuário não encontrado!");
          setEmail(""); // Limpa o campo de e-mail
          setSenha(""); // Limpa o campo de senha
        } else if (error.response.status === 401) {
          setMessage("Senha incorreta, tenta novamente!");
          setSenha(""); // Limpa o campo de senha
        } else {
          setMessage("Erro desconhecido, tente novamente!");
        }
      } else {
        // Erro de rede ou outro erro
        setMessage("Erro ao conectar ao servidor!");
      }
    }
  };

  return (
    <div className={Style.divPrincipalLogin}>
      <NavLink to="/" className={Style.spanLogin}>
        <span><FaChevronLeft /> Voltar</span>
      </NavLink>

      <img src="aaaa-Photoroom.png" className={Style.imagemLogin} />

      <div className={Style.divFormLogin}>
        <form onSubmit={handleSubmitFormLogin}>
          <label>
            <span>E-mail:</span>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </label>

          <label>
            <span>Senha:</span>
            <input
              type="password"
              name="senha"
              onChange={(e) => setSenha(e.target.value)}
              value={senha}
              required
            />
          </label>

          <button>Entrar</button>
          <h3>
            Não tem conta? <NavLink to="/registro">Clique aqui</NavLink>
          </h3>
        </form>
      </div>

      {message && <div className={Style.messageError}>{message}</div>}
    </div>
  );
};

export default Login;
