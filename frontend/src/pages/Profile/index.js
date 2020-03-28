import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import logoImg from "../../assets/logo.svg";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

import "./style.css";

export default function Profile(){
    const history = useHistory();
    const [incidents, setIncidents] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('profile',{
            headers: {
                Authorization: ongId,
            }
        }).then(Response => {
            setIncidents(Response.data)
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        }catch(err){
            alert('Falha ao deletar caso, tente novamente!')
        }
    }

    function logout(){
        localStorage.clear();
        history.push('/');
    }
    
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="be the hero" />
                <span>Bem vindo, {ongName}</span>
                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button type="button" onClick={() => {logout()}}>
                    <FiPower size={20} color="#e02041"/>
                </button>
            </header>
            <section>
                <h1>Casos Cadastrados:</h1>
                <ul>
                    {incidents.map(
                        incident => (
                            <li key={incident.id}>
                                <strong>Caso:</strong>
                                <p>{incident.title}</p>

                                <strong>Descrição:</strong>
                                <p>{incident.description}</p>

                                <strong>Valor:</strong>
                                <p>
                                    {
                                        Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'})
                                        .format(incident.value)
                                    }
                                </p>

                                <button type="button" onClick={() => {handleDeleteIncident(incident.id)}}>
                                    <FiTrash2 size={20} color="#a8a8b3"/>
                                </button>
                            </li>
                        )
                    )}
                </ul>
            </section>
        </div>
        
    )
}