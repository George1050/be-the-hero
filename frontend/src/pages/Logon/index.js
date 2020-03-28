import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./style.css";

import api from "../../services/api";

import { FiLogIn } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";

export default function Logon(){

    const [id, setId] = useState('');
    const history = useHistory();

    async function handlerLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('session', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');

        } catch (err) {
            alert('Id incorreto, tente novamente!')
        }

    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="be the hero" />

                <form onSubmit={handlerLogin}>
                    <h1>Faça seu Logon</h1>

                    <input 
                        placeholder="Sua ID" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button type="submit" class="button">
                        Entrar
                    </button>
                    <Link className="back-link" to="/register" alt="">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro!
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="heroes"/>
        </div>
    )
}