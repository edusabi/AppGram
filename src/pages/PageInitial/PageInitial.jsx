import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

// style
import Style from "./PageInitial.module.css";

// icons
import { FiLogOut } from "react-icons/fi";
import { IoMenu, IoClose } from "react-icons/io5";
import { TiMessages } from "react-icons/ti";
import { FaMagnifyingGlass } from "react-icons/fa6";

/////import posts
import EnviarReceberPosts from "../../components/EnviarReceberPosts/EnviarReceberPosts";

const PageInitial = () => {
  const [foto, setFoto] = useState("");
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false); // Controla a visibilidade da caixa de pesquisa
  const [searchTerm, setSearchTerm] = useState(""); // Termo de pesquisa
  const [searchResults, setSearchResults] = useState([]); // Resultados da pesquisa
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Controla a visibilidade da sidebar
  const [isResultsVisible, setIsResultsVisible] = useState(false); // Controla a visibilidade dos resultados de pesquisa

  const navigate = useNavigate(); // Hook para navegação

  const searchInputRef = useRef(null); // Cria a referência para o input de pesquisa
  const searchResultsRef = useRef(null); // Cria a referência para os resultados da pesquisa

  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://appgram.discloud.app/user", {
        withCredentials: true, // Inclui cookies na requisição
      });
      const data = response.data;
      setFoto(data.foto);
    } catch (error) {
      console.error("Erro:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSearchBox = () => {
    setIsSearchBoxOpen(!isSearchBoxOpen); // Alterna a visibilidade
    setIsResultsVisible(true); // Torna os resultados visíveis quando o campo de pesquisa é aberto
    if (!isSearchBoxOpen && searchInputRef.current) {
      searchInputRef.current.focus(); // Foca no input de pesquisa
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(
        `https://appgram.discloud.app/pesquisa?query=${query}`,
        {withCredentials:true}
      );
      setSearchResults(response.data); // Atualiza os resultados
    } catch (error) {
      console.error("Erro ao buscar:", error.response?.data || error.message);
    }
  };

  // Pesquisa automática ao digitar
  useEffect(() => {
    if (searchTerm.trim()) {
      fetchSearchResults(searchTerm);
    } else {
      setSearchResults([]); // Limpa os resultados se o campo estiver vazio
    }
  }, [searchTerm]);

  const logout = async () => {
    try {
      await axios.post(
        "https://appgram.discloud.app/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login"); // Redireciona para a página de login
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleOutsideClick = (e) => {
    if (
      searchResultsRef.current &&
      !searchResultsRef.current.contains(e.target) &&
      !searchInputRef.current.contains(e.target)
    ) {
      closeSearchBox(); // Fecha a caixa de pesquisa e limpa o conteúdo ao clicar fora
    }
  };

  // Adiciona o evento de clique fora da área de pesquisa
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const closeSearchBox = () => {
    setIsSearchBoxOpen(false); // Fecha a caixa de pesquisa
    setSearchTerm(""); // Limpa o campo de pesquisa
    setIsResultsVisible(false); // Fecha os resultados
  };

  ////ver perfil
  const [idPerfilPesquisa, setIdPerfilPesquisa] = useState("");

  const fetchGetPerfil = async()=>{
    const response = await axios.get(`https://appgram.discloud.app/dadosUser/verPerfil/:${idPerfilPesquisa}`);
    if(response.status == 200){
      navigate(`/perfilOutros/:${response.data._id}`)
    };
  };

  useEffect(()=>{
    fetchGetPerfil();
  }, [idPerfilPesquisa]);

  return (
    <div>
      <IoMenu className={Style.iconMenu} onClick={toggleSidebar} />
      <img
        src="aaaa-Photoroom.png"
        className={Style.imagemPageInitial}
        width="auto"
        height="120px"
      />

      <nav className={Style.navbar}>
        <div className={Style.logo}>AppGram</div>

        <div className={Style.divIconsPageInitial}>
          <NavLink to="/menssagens">
            <TiMessages className={Style.perfilIconMessage} />
          </NavLink>
          <div className={Style.searchContainer}>
            <FaMagnifyingGlass
              className={Style.perfilIconLupa}
              onClick={toggleSearchBox}
            />
            <input
              ref={searchInputRef} // Atribui a referência ao input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar..."
              className={`${Style.searchInput} ${
                isSearchBoxOpen ? Style.searchInputOpen : ""
              }`}
            />
          </div>
        </div>

        <div className={Style.perfil}>
          <img
            src={foto ? foto : "avatar.png"}
            alt="Foto do perfil"
            className={Style.perfilImg}
            width="auto"
            height="70px"
          />
        </div>
      </nav>

      {/* Resultados da pesquisa */}
      {isResultsVisible && searchResults.length > 0 && (
        <div className={Style.searchResults} ref={searchResultsRef}>
          <IoClose className={Style.closeIcon} onClick={closeSearchBox} />
          <ul>
            {searchResults.map((result, index) => (
              <div key={index} className={Style.pesquisaBoxName} onClick={()=>setIdPerfilPesquisa(result._id)}>
                <img
                  src={result.foto ? result.foto : "avatar.png"}
                  alt="Foto do perfil"
                  className={Style.imgPesquisa}
                  width="auto"
                  height="50px"
                />
                <h3 className={Style.nomePesquisa}>@ {result.nome}</h3>
              </div>
            ))}
          </ul>
        </div>
      )}

      {/* aqui para receber e enviar os posts */}
      <EnviarReceberPosts/>

      {/* Sidebar */}
      <div
        className={`${Style.sidebar} ${isSidebarOpen ? Style.sidebarOpen : ""}`}>

        <IoClose className={Style.closeIcon} onClick={toggleSidebar} />

        <div className={Style.divIntoDados}>

          <div>
            <img
              src={foto ? foto : "avatar.png"}
              alt="Foto do perfil"
              className={Style.perfilImgSidebar}
              width="auto"
              height="70px"
            />
          </div>

          <div className={Style.divPagesSidebar}>
            <NavLink to="/perfil">Perfil</NavLink>
            <NavLink to="/menssagens">Mensagens</NavLink>
          </div>

          <div className={Style.divIconsSidebar}>
            <FiLogOut onClick={logout} className={Style.perfilIconLogout} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default PageInitial;
