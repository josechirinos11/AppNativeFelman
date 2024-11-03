import React, { useEffect, useState } from 'react';
import { View, Dimensions, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Text } from 'native-base';
import globalStyles from '../styles/global';
import NavMenu from '../components/NavMenu';
import Titulo from '../components/Titulo';
import deposito from '../img/deposito.png'
import corte from '../img/corte.png'
import mesaAccesorio from '../img/mesaAccesorio.png'
import mesaArmado from '../img/mesaArmado.png'
import mesaCristal from '../img/mesaCristal.png'
import despacho from '../img/despacho.png'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppLayout = () => {
  const { width, height } = Dimensions.get('window');

  const [nombreUser, setNombreUser] = useState(null); // Estado para el nombre del usuario
  const [emailUser, setEmailUser] = useState(null); // Estado para el email del usuario


  // Crear un array para representar las 8 cards
  // Array de cards con imágenes únicas
  const cards = [
    { id: 1, image: deposito, name: 'deposito' },
    { id: 2, image: corte, name: 'corte' },
    { id: 3, image: mesaArmado, name: 'mesaArmado' },
    { id: 4, image: mesaAccesorio, name: 'mesaAccesorio' },
    { id: 5, image: mesaArmado, name: 'mesaArmado' },
    { id: 6, image: mesaCristal, name: 'mesaCristal' },
    { id: 7, image: mesaArmado, name: 'mesaArmado' },
    { id: 8, image: despacho, name: 'despacho' },
  ];

  useEffect(() => {
    const verificarAutenticacion = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const emailUser = await AsyncStorage.getItem('email');
        const nombreUser = await AsyncStorage.getItem('nombre');

        if (token !== null) {
          // El token existe, el usuario está autenticado
          setNombreUser(nombreUser); // Establecer el nombre del usuario
          setEmailUser(emailUser); // Establecer el email del usuario
          console.log('nombre desde Layout');
          console.log('nombre:', nombreUser);
          console.log('Email:', emailUser);
        } else {
          // No hay token, el usuario no está autenticado
          console.log('No hay usuario autenticado');
        }
      } catch (error) {
        console.error('Error al obtener datos de AsyncStorage:', error);
      }
    };

    verificarAutenticacion(); // Llama a la función para verificar autenticación
  }, []); // El arreglo vacío significa que se ejecutará solo una vez al montar


  return (
    <View style={[globalStyles.contenedor, { width: width, height: height }]}>
      <NavMenu nombreUser={nombreUser} emailUser={emailUser} />

      <Titulo texto='App Layout'/>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.cardContainer}>
          {cards.map(card => (
            <ImageBackground key={card.id} source={card.image} style={styles.card} imageStyle={styles.cardImage}>
              <Text style={styles.cardText}>{card.name}</Text>
            </ImageBackground>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    marginTop: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  card: {
    width: '45%', // Ocupa casi la mitad del ancho
    backgroundColor: 'white',
    borderRadius: 10,
    height: 200,
    marginBottom: 20,
    elevation: 3, // Para sombra en Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardText: {
    textAlign: 'center',
    fontWeight: 'bold',


  },
  cardImage: {
    borderRadius: 10,
    // Cambia el resizeMode según tus necesidades
    width: '100%', // Asegúrate de que la imagen de fondo ocupe todo el ancho del card
    height: '100%', // Asegúrate de que la imagen de fondo ocupe todo el alto del card
  },
  titleContainer: {

    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente

  },
});

export default AppLayout;
