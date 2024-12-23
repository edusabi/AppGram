import { useState, useEffect } from "react";
import Style from "./EnviarReceberPosts.module.css";
import axios from "axios";
import { IoSendSharp } from "react-icons/io5";
import imageCompression from 'browser-image-compression';
import avatar from '../../assets/avatar2.png'; // Importando a imagem padrão

const EnviarReceberPosts = () => {
  const [post, setPost] = useState("");
  const [foto, setFoto] = useState("");
  const [apelido, setApelido] = useState("");
  const [getPosts, setGetPosts] = useState([]);
  const [erro, setErro] = useState(""); // Adicionar estado para armazenar a mensagem de erro
  const [erroVisible, setErroVisible] = useState(false); // Adicionar estado para controlar a visibilidade

  const handleSubmitFormPosts = async (e) => {
    e.preventDefault();

    if (!apelido) {
      setErro("Por favor, preencha o seu apelido antes de enviar o post");
      setErroVisible(true);
      setTimeout(() => setErroVisible(false), 3000); // Oculta a mensagem de erro após 3 segundos
      return;
    }

    if (!post) {
      setErro("Escreva algo");
      setErroVisible(true);
      setTimeout(() => setErroVisible(false), 3000); // Oculta a mensagem de erro após 3 segundos
      return;
    }

    try {
      let resizedFoto = null;
      if (foto) {
        resizedFoto = await compressImage(base64ToFile(foto)); // Redimensiona e comprime a imagem
      }

      const response = await axios.post("https://appgram.discloud.app/posts/enviarPosts", {
        post,
        apelido,
        foto: resizedFoto,
      });
      setPost("");
      fetchGetPosts(); // Recarregar os posts após enviar um novo post
    } catch (error) {
      setErro("Erro ao enviar o post. Por favor, tente novamente.");
      setErroVisible(true);
      setTimeout(() => setErroVisible(false), 3000); // Oculta a mensagem de erro após 3 segundos
      console.log("ERROR: " + error);
    }
  };

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1, // Tamanho máximo do arquivo em MB
      maxWidthOrHeight: 800, // Largura ou altura máxima em pixels
      quality: 2, // Qualidade reduzida para diminuir tamanho
      useWebWorker: true,
      mimeType: 'image/webp', // Use WebP para melhor compressão
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const base64Data = await imageCompression.getDataUrlFromFile(compressedFile);
      return base64Data;
    } catch (error) {
      console.error("Erro ao comprimir a imagem:", error);
      throw error;
    }
  };

  // Convertendo Base64 para um arquivo antes de comprimir
  const base64ToFile = (base64) => {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], 'image.jpg', { type: mime });
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://appgram.discloud.app/user", {
        withCredentials: true,
      });
      const data = response.data;
      setFoto(data.foto || ""); // Garante que `foto` não seja `null`
      setApelido(data.apelido);
    } catch (error) {
      console.error("Erro:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  ///pegar todos os posts
  const fetchGetPosts = async () => {
    try {
      const response = await axios.get("https://appgram.discloud.app/posts/getPosts");
      const data = response.data;
      setGetPosts(data);
    } catch (error) {
      console.error("Erro:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchGetPosts();
  }, []); // Chama fetchGetPosts apenas uma vez quando o componente é montado

  return (
    <div className={Style.divPrincipalPosts}>
      <div className={Style.divCaixaDeEnviarPost}>
        <form onSubmit={handleSubmitFormPosts}>
          <label>Envie seu post</label>
          <div className={Style.divTextArea}>
            <textarea
              maxLength="350"
              name="post"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="No que você está pensando?"
            ></textarea>
            <button>
              <IoSendSharp />
            </button>
          </div>
          <div className={`${Style.divErrorPost} ${erroVisible ? '' : Style.hide}`}>
            {erro}
          </div>
        </form>
      </div>
      <div className={Style.divTodosOsPosts}>

        <h2 className={Style.titlePosts}>Todos os posts</h2>

        {getPosts.map((post) => (
          <div key={post._id} className={Style.divPost}>
            <div className={Style.fotoComPost}>
              <p>{post.apelido}</p>
              <img src={post.foto || avatar} alt="Foto do perfil" className={Style.postsImg} />
            </div>
            <div className={Style.divPostFrase}>
              <p>{post.post}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default EnviarReceberPosts;
