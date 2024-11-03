import React from 'react'
import { View, Dimensions, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Text } from 'native-base';

export default function Titulo( {texto}) {
  return (
    <View style={styles.titleContainer}>
        <Text style={styles.tituloPrincipales}>
          {texto}
        </Text>
      </View>
  )
}


const styles = StyleSheet.create({
   
    titleContainer: {
     
      justifyContent: 'center', // Centra verticalmente
      alignItems: 'center', // Centra horizontalmente
      
    },
    tituloPrincipales: {
        paddingTop: 15,
        fontSize: 32, // Equivalente a "text-4xl"
        fontWeight: '600', // Equivalente a "font-semibold"
        fontStyle: 'italic', // Equivalente a "italic"
        color: '#e20613', // Color rojo
        fontFamily: 'sans-serif', // Fuente sans-serif
        lineHeight: 30,
        //position: 'absolute', // Posición absoluta
        //bottom: 10, // Hacia la parte inferior
        right: 10, // Hacia la derecha

        textShadowColor: 'rgba(0, 0, 0, 0.5)', // Sombra
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    }
  });