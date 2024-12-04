import React, { useState, useEffect } from "react";
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import { API_URL_BASE } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActualizarTrabajador = ({ trabajadorId, onClose, onUpdate }) => {
  const [campos, setCampos] = useState([]); // Campos del modelo
  const [trabajador, setTrabajador] = useState({}); // Datos del trabajador
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener token
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Token no encontrado');
        // Obtener todos los campos
        const camposResponse = await fetch(`${API_URL_BASE}/trabajadores/campos`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Encabezado de autorización
          },
        });
  
        if (!camposResponse.ok) {
          throw new Error(`Error ${camposResponse.status}: ${camposResponse.statusText}`);
        }
        const camposData = await camposResponse.json();
        console.log('Campos obtenidos:', camposData);
        setCampos(camposData); // Guardar los campos en el estado
  
        // Obtener los datos del trabajador específico
        if (trabajadorId) {
          const trabajadorResponse = await fetch(`${API_URL_BASE}/trabajadores/recursos-humanos/${trabajadorId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Encabezado de autorización
            },
          });
  
          if (!trabajadorResponse.ok) {
            throw new Error(`Error ${trabajadorResponse.status}: ${trabajadorResponse.statusText}`);
          }
          const trabajadorData = await trabajadorResponse.json();
          const { password, ...restoDeCampos } = trabajadorData; // Excluir `password` del objeto
          console.log('Trabajador obtenido:', restoDeCampos);
          setTrabajador(restoDeCampos); // Guardar los datos del trabajador en el estado
        }
      } catch (error) {
        console.error('Error al realizar las solicitudes:', error.message);
      } finally {
        setLoading(false); // Finalizar el estado de carga
      }
    };
  
    if (trabajadorId) {
      fetchData(); // Llamar la función asíncrona para realizar las solicitudes
    }
  }, [trabajadorId]);
  


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true} // Asegúrate de que este valor sea true para que el modal aparezca
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Editar Trabajador: {trabajadorId}</Text>
          <Button title="Cerrar" onPress={onClose} />
          <Button title="Actualizar" onPress={onUpdate} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default ActualizarTrabajador;
