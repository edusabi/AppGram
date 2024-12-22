import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

export function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Estado de autenticação

  // Função para verificar autenticação
  const checkAuth = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users/check-auth', { withCredentials: true });
      setIsAuthenticated(response.data.authenticated);
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setIsAuthenticated(false); // Define como não autenticado em caso de erro
    }
  };

  // Verificar autenticação na montagem do componente
  useEffect(() => {
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Carregamento enquanto a autenticação é verificada
    return <div>Loading...</div>;
  }

  // Se o usuário está autenticado, renderiza o conteúdo, senão redireciona para o login
  return isAuthenticated ? children : <Navigate to="/login" />;
}
