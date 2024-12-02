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
import Empleado from '../components/recursoshumanos/Empleado';
import Departamento from '../components/recursoshumanos/Departamento';
import RolesYPermisos from '../components/recursoshumanos/RolesYPermisos';
import ContratistasYConsultoresExternos from '../components/recursoshumanos/ContratistasYConsultoresExternos';



export default function RecursosHumanos() {
  const { width, height } = Dimensions.get('window');
  const route = useRoute();
  const { title, item, nombreUser, emailUser } = route.params;


  const renderComponent = () => {
    switch (item) {
      case "Empleados":
        return <Empleado />
      case "Departamentos":
        return <Departamento />;
      case "Roles y permisos":
        return <RolesYPermisos />;
      case "Contratistas y consultores externos":
        return <ContratistasYConsultoresExternos />;
      default:
        return (
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, textAlign: 'center', color: 'red' }}>
              ⚠️ Sección no encontrada. Por favor, selecciona una opción válida.
            </Text>
          </View>
        );
    }
  };



  return (
    <View style={[globalStyles.contenedor, { width: width, height: height }]}>
      <NavMenu nombreUser={nombreUser} emailUser={emailUser} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', paddingTop: 10 ,  textAlign: 'center',}}>{item}</Text>


      {/* Contenido dinámico dentro de un scroll */}
     
        {renderComponent()}
     






    </View>
  );
}
