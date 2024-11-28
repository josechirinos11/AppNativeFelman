import React, { useEffect, useState } from 'react';
import { View, Dimensions, ScrollView, StyleSheet, ImageBackground, Image } from 'react-native';
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
import { useRoute } from '@react-navigation/native';

export default function RecursosHumanos() {
  const { width, height } = Dimensions.get('window');
  const route = useRoute();
  const { title, item, nombreUser, emailUser } = route.params;

  
  return (
    <View style={[globalStyles.contenedor, { width: width, height: height }]}>
      <NavMenu nombreUser={nombreUser} emailUser={emailUser} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', paddingTop: 5 }}>{title}</Text>
      {item && <Text>Has clicado en: {item}</Text>}
      

      



    </View>
  );
}
