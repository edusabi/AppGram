// App.js
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/// PAGES
import Home from './pages/Home/Home';
import Registro from './pages/Registro/Registro';
import Login from './pages/Login/Login';
import PageInitial from './pages/PageInitial/PageInitial';
import Perfil from './pages/Perfil/Perfil';
import EditPerfil from './pages/Perfil/EditPerfil';
import Messages from './pages/Messages/Messages';
import PerfilOutros from './PerfilOutros/PerfilOutros';
import MensagensEnviadas from './pages/MensagensEnviadas/MensagensEnviadas';

//////components
import RotaProtegida from "./components/RotaProtejida";
import PageNotFound from './components/PageNotFound/PageNotFound';
import DeviceDetector from './components/DeviceDetector';
import NoMobileAccess from './components/NoMobileAccess';

function App() {

  return (
    <div>
      <BrowserRouter>
        <DeviceDetector>
          <Routes>
            
            <Route path='/' element={<Home />}/>
  
            <Route path='/registro' element={<Registro />} />
  
            <Route path='/login' element={<Login />} />
  
            <Route path='/pageInitial' element={
              <RotaProtegida>
                <PageInitial />
              </RotaProtegida>
              } />
  
            <Route path='/perfil' element={
              <RotaProtegida>
                <Perfil />
              </RotaProtegida>
              } />
  
            <Route path='/editPerfil' element={
              <RotaProtegida>
                <EditPerfil />
              </RotaProtegida>
              } />
  
            <Route path='/messages/:id' element={
              <RotaProtegida>
                <Messages />
              </RotaProtegida>
              } />
  
            <Route path='/menssagens' element={
              <RotaProtegida>
                <MensagensEnviadas />
              </RotaProtegida>
              } />
  
            <Route path='/perfilOutros/:id' element={
              <RotaProtegida>
                <PerfilOutros />
              </RotaProtegida>
              } />
  
            <Route path='/no-mobile-access' element={<NoMobileAccess />} />
  
            <Route path='*' element={<PageNotFound/>}/>
  
          </Routes>
        </DeviceDetector>
      </BrowserRouter>
    </div>
  );
}

export default App;
