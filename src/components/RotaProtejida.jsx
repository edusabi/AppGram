import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types"; // Importa o PropTypes

const RotaProtegida = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const verificarAutenticacao = async () => {
            try {
                // Envia uma requisição para o backend para verificar o token
                await axios.get("https://appgram.discloud.app/verificarAutenticacao", { withCredentials: true });
                setIsAuthenticated(true); // Se o token for válido
            } catch (error) {
                setIsAuthenticated(false); // Se ocorrer erro, o token é inválido ou expirou
            }
        };

        verificarAutenticacao();
    }, []);

    if (isAuthenticated === null) {
        return <div>Carregando...</div>; // Exibe uma tela de carregamento enquanto verifica
    }

    if (isAuthenticated) {
        return children; // Se o token for válido, exibe o conteúdo da rota protegida
    }

    return <Navigate to="/login" replace />; // Se não estiver autenticado, redireciona para o login
};

// Adicionando a validação de 'children'
RotaProtegida.propTypes = {
    children: PropTypes.node.isRequired, // Garantir que 'children' seja passado e seja um nó React válido
};

export default RotaProtegida;
