import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";

// pegar E-mail
import Cookies from 'js-cookie';

////Style
import Style from "./EditPerfil.module.css";

// IMask
import { IMaskInput } from "react-imask";

///icons
import { FaChevronLeft } from "react-icons/fa";

const EditPerfil = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [frase, setFrase] = useState("");
  const [apelido, setApelido] = useState("");
  const [idade, setIdade] = useState("");
  const [foto, setFoto] = useState("");
  const [fotoName, setFotoName] = useState(""); // Adicionado para armazenar o nome do arquivo
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [genero, setGenero] = useState("");
  const [whats, setWhats] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // Função para lidar com o envio do formulário
  const handleSubmitFormEditPerfil = async (e) => {
    e.preventDefault();

    // Criando um FormData para enviar a foto e os outros dados
    const formData = new FormData();

    // Adicionando os campos ao FormData
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("genero", genero);
    formData.append("apelido", apelido);
    formData.append("idade", idade);
    formData.append("instagram", instagram);
    formData.append("tiktok", tiktok);
    formData.append("frase", frase);
    formData.append("whats", whats);
    formData.append("linkedin", linkedin);

    // Se houver foto, adiciona ao FormData
    if (foto) {
      formData.append("foto", foto); // Envia o arquivo diretamente
    }

    try {
      const response = await axios.post("https://appgram.discloud.app/dadosUser/editPerfil", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Importante para enviar arquivos
        },
      });
      
      if(response.status === 200){
        navigate("/perfil")
      };

    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };
  

  // Função para pegar os dados do usuário atual
  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://appgram.discloud.app/user", {
        withCredentials: true, // Inclui os cookies nesta requisição
      });
      const data = response.data;
      setNome(data.nome);
      setEmail(data.email);
      setGenero(data.genero);
      // Preencher outros campos (caso haja dados)
      setApelido(data.apelido || "");
      setFrase(data.frase || "");
      setIdade(data.idade || "");
      setInstagram(data.instagram || "");
      setTiktok(data.tiktok || "");
      setWhats(data.whats || "");
      setLinkedin(data.linkedin || "");
      // Para foto, apenas defina a URL base64 diretamente se necessário
      // setFoto(data.foto || "");
    } catch (error) {
      console.error("Erro:", error.response?.data || error.message);
    }
  };


  useEffect(() => {
    fetchUserData();
  }, []); // Certifique-se de rodar apenas uma vez quando o componente for montado

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setFotoName(file.name); // Atualiza o nome do arquivo selecionado
    } else {
      setFoto("");
      setFotoName(""); // Limpa o nome do arquivo se nenhum for selecionado
    }
  };

  return (
    <div>

      <img
          src="aaaa-Photoroom.png"
          className={Style.imagemEditPerfilLogo}
          width="auto"
          height="120px"
      />

      <NavLink to="/perfil" className={Style.spanEditPerfil}>
          <span>
            <FaChevronLeft /> Voltar
          </span>
      </NavLink>

      <h1 className={Style.titleEditPerfil}>Editar seu perfil</h1>

      <div className={Style.divEditPerfil}>
        <form onSubmit={handleSubmitFormEditPerfil}>

          <label>
            <span>Nome:</span>
            <input type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          </label>

          <label>
            <span>Apelido (Opcional):</span>
            <input type="text" name="apelido" value={apelido} onChange={(e) => setApelido(e.target.value)} />
          </label>

          <label>
            <span>Idade (Opcional):</span>
            <input type="number" name="idade" value={idade} onChange={(e) => setIdade(e.target.value)} />
          </label>

          <label>
            <span>Foto (Opcional):</span>
            <input 
              type="file" 
              name="foto" 
              id="fotoInput" 
              onChange={handleFileChange} 
              style={{ display: 'none' }} // Esconde o input original
              />
            <button 
              type="button" 
              onClick={() => document.getElementById('fotoInput').click()}
              className={Style.buttonImagem}>
              Escolher arquivo
            </button>
            {fotoName && <p>Arquivo selecionado: {fotoName}</p>} {/* Mostra o nome do arquivo selecionado */}
          </label>

          <label>
            <span>Instagram (Opcional):</span>
            <input type="url" name="instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
          </label>

          <label>
            <span>Tik Tok (Opcional):</span>
            <input type="url" name="tiktok" value={tiktok} onChange={(e) => setTiktok(e.target.value)} />
          </label>

          <label>
            <span>Whatsapp (Opcional):</span>
            <IMaskInput
              name="whats"
              value={whats}
              onAccept={(value) => setWhats(value)} // Use onAccept para capturar o valor formatado
              mask="(00)00000-0000"
            />
          </label>

          <label>
            <span>Linkedin (Opcional):</span>
            <input type="url" name="linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
          </label>

          <label>
            <span>Gênero (Opcional):</span>
            <select name="genero" value={genero} onChange={(e) => setGenero(e.target.value)}>
              <option value="">Selecione um gênero</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Não Binário">Não Binário</option>
              <option value="Outro">Outro</option>
              <option value="Prefiro não dizer">Prefiro não dizer</option>
            </select>
          </label>

          <label>
            <span>Frase (Opcional):</span>
            <input type="text" name="frase" value={frase} onChange={(e) => setFrase(e.target.value)} />
          </label>

          <button type="submit" className={Style.buttonEnviar}>Enviar</button>

        </form>
      </div>
    </div>
  )
}

export default EditPerfil;
