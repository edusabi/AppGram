import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Style from "./Registro.module.css";

import { FaChevronLeft } from "react-icons/fa";

const Registro = () => {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");

    const [nome,setNome] = useState("");
    const [email,setEmail] = useState("");
    const [senha,setSenha] = useState("");
    const [confirmarSenha,setConfirmarSenha] = useState("");

    const submitRegister = async (e)=>{
        e.preventDefault();

        const NewUser = {
            nome,
            email,
            senha,
        };

        if(senha !== confirmarSenha){
            setErrorMessage("As senhas estão diferentes!");
            setSenha("");
            setConfirmarSenha("");
        }else if(senha.length <= 5){
            setErrorMessage("A senha precisa ter 6 ou mais caracteres!");
            setSenha("");
            setConfirmarSenha("");
        }else{
            try {
                const response = await axios.post("https://appgram.discloud.app/registro", NewUser);
                const data = response.status;
                if(data == 200){
                    console.log("Deu certo, conta criada com sucesso!");
                    navigate("/login")
                };
                

            } catch (error) {

                if(error.status == 400){
                    setNome("");
                    setEmail("");
                    setSenha("");
                    setConfirmarSenha("");
                    return setErrorMessage("O usuário já existe!")
                };

            }
        }

    };

  return (
    <div className={Style.divPrinRegistro}>

        <NavLink to="/" className={Style.spanRegistro}>
        <span><FaChevronLeft/> Voltar</span>
        </NavLink>

        <img src="aaaa-Photoroom.png" className={Style.imagemRegistro}/>

        <div>

        <form onSubmit={submitRegister} className={Style.divFormRegistro}>
            
            <label>
                <span>Nome:</span>
                <input type="text" name="nome" 
                onChange={(e)=>setNome(e.target.value)}
                value={nome}
                required/>
            </label>
            
            <label>
                <span>E-mail:</span>
                <input type='email' name="email" 
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                required/>
            </label>
            
            <label>
                <span>Senha:</span>
                <input type="password" name="senha" 
                onChange={(e)=>setSenha(e.target.value)}
                value={senha}
                required/>
            </label>
            
            <label>
                <span>Confirmar senha:</span>
                <input type="password" name="confirmarSenha" 
                onChange={(e)=>setConfirmarSenha(e.target.value)}
                value={confirmarSenha}
                required/>
            </label>

            <button>Registrar</button>
            <h3>Já tem conta? <NavLink to="/login">Entrar</NavLink></h3>

        </form>

    </div>
            {errorMessage}

    </div>
  )
}

export default Registro