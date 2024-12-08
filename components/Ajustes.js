

import React, { useEffect, useState } from 'react';
import { View, Dimensions, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Image, Text } from 'react-native';

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
import { useRoute } from '@react-navigation/native';


export default function Ajustes() {
  const { width, height } = Dimensions.get('window');
  const route = useRoute();
  const { nombreUser, emailUser } = route.params;


  return (
    <View style={[globalStyles.contenedor, { width: width, height: height }]}>
      <NavMenu nombreUser={nombreUser} emailUser={emailUser} />

      <View
        style={{
          padding: 10,
          backgroundColor: 'white',
          width: '90%',
          borderRadius: 5,
          alignSelf: 'center', // Centra el View horizontalmente
          shadowColor: 'black',  // Color de la sombra
          shadowOffset: { width: 0, height: 4 },  // Desplazamiento de la sombra
          shadowOpacity: 0.5,  // Opacidad de la sombra
          shadowRadius: 6,  // Radio de difuminado de la sombra
          elevation: 10,  // Elevación para Android (esto agrega una sombra en Android)
        }}
      >
        <View style={{ alignItems: 'center', width: '100%' }}>
          <TouchableOpacity
            style={[
              globalStyles.boton,
              {
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
                marginBottom: 20,
                width: '100%',
              },
            ]}
            onPress={() => console.log('Agregar trabajador')}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Agregar Trabajador</Text>
          </TouchableOpacity>
        </View>


      </View>






    </View>
  );
}
