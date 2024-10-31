import React, { useState } from 'react'
import { View, Dimensions, Modal, StyleSheet, ScrollView } from 'react-native'
import { Image, Button, Text, H1, Input, Stack, FormControl, Item, Toast } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../styles/global';


const Login = () => {
    const { width, height } = Dimensions.get('window');


  return (

    <View style={[globalStyles.contenedor, {  width: width, height: height }]}>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../img/felman.png')}
          alt="Descripción de la imagen"
          width={150}
          height={75}

        />
      </View>

      <Text style={globalStyles.tituloPrincipales}>
            Dashboard
          </Text>

          </View>
 


  

  );
}


const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    marginBottom: 20,
  },
});

export default Login;
