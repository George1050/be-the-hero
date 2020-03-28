import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import logoImg from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./style.css";

export default function NewIncident(){
    
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const data = {
        title,
        description,
        value
    }

    async function registerIncident(e){
        e.preventDefault();

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });
            alert('Cadastro bem sucedido!');
            history.push('/profile')
        } catch (err) {
            alert('Erro ao cadastrar novo caso, tente novamente!')
        }
    }


    return (
        <div className="newincident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="be the hero" />

                    <h1>Cadastrar Novo Caso</h1>
                    <p>
                        Descreva o caso detalhadamente
                        para encontrar um herói para
                        resolver isso.
                    </p>

                    <Link className="back-link" to="/profile" alt="">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para Home.
                    </Link>
                </section>
                <form onSubmit={registerIncident}>
                    <input 
                        placeholder="Titulo do Caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em R$" 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}