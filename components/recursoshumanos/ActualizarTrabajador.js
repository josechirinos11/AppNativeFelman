import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const ActualizarTrabajador = ({ trabajadorId, onClose, onUpdate }) => {
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
