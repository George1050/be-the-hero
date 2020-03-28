import React, { useState, useEffect } from 'react';
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";

import api from "../../services/api";

import style from "./styles";
import logoImg from "../../assets/logo.png";

export default function Incidents() {
    const navigation = useNavigation();
    const [ incident, setIncident ] = useState([]); 
    const [ total, setTotal ] = useState(0);
    const [ page, setPage ] = useState(1);
    const [ loading, setLoading ] = useState(false);

    function navigateToDetails(incident){
        navigation.navigate('Detail', {incident});
    }

    async function loadIncidents(){
        if(loading){
            return;
        }

        if(total > 0 && incident.length === total){
            return;
        }

        setLoading(true);
        
        const response = await api.get('incidents', {
            params: { page }
        });

        setIncident([...incident, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                <Text style={style.headerText}>
                    Total de <Text style={style.headerTextBold}>{total} Casos</Text>
                </Text>
            </View>
            <Text style={style.title}>
                Bem Vindo!
            </Text>
            <Text style={style.description}>
                Escolha um dos casos abaixo e salve o dia.
            </Text>
            <FlatList 
                data={incident}
                keyExtractor={incident => String(incident.id)}
                style={style.incidentsList}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item: incident}) => (
                    <View style={style.incident}>
                        <Text style={style.incidentProperty}>Ong:</Text>
                        <Text style={style.incidentValue}>{incident.name}</Text>

                        <Text style={style.incidentProperty}>Caso:</Text>
                        <Text style={style.incidentValue}>{incident.title}</Text>

                        <Text style={style.incidentProperty}>Valor:</Text>
                        <Text style={style.incidentValue}>{
                            Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                            .format(incident.value)
                        }</Text>

                        <TouchableOpacity style={style.detailsButton} onPress={() => navigateToDetails(incident)}>
                            <Text style={style.detailsButtonText}>Ver detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}

            />
        </View>
    );
}