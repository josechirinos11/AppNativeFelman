import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL_BASE} from '@env';

const ContratistasYConsultoresExternos = () => {
  const [ID, setID] = useState(null);

  useEffect(() => {
    const fetchID = async () => {
        try {
          const uduarioID = await AsyncStorage.getItem('usuarioID');
          console.log('Valor de usuarioID:', uduarioID); // Verificar el valor obtenido
      
          let storedID;
      
          if (!uduarioID) {
            // Si 'uduarioID' es null, busca 'ID'
            storedID = await AsyncStorage.getItem('ID');
            console.log('ID encontrado (fallback):', storedID);
            setID(storedID)
           
          } else {
             // Si 'uduarioID' no es null ni una cadena vacía
             storedID = uduarioID;
             console.log('usuarioID encontrado:', storedID);
             setID(storedID)
          }
        } catch (error) {
          console.error('Error al obtener el ID:', error);
        }
      };

      //peticion backend
      const buscarEmpleados = async() => {
        const respuesta = await fetch(`${API_URL_BASE}recursos-humanos/${storedID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      });
      }
      
      fetchID();
      buscarEmpleados()
      
  }, []);

  return (
    <View>
      <Text>{ID ? `ID: ${ID}` : 'Cargando...'}</Text>
    </View>
  );
};

export default ContratistasYConsultoresExternos;

