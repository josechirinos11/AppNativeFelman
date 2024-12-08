import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL_BASE } from '@env';

const AgregarUsuarioTrabajador = ({ onClose, onAdd }) => {
  const [newTrabajador, setNewTrabajador] = useState({
    nombre: "trabajador No",
    email: "No@correo.com",
    password: "123456",
    usuarioId: null, // Se obtiene desde AsyncStorage
    rol: [], // Roles seleccionados
  });

  // Lista de roles disponibles
  const roles = [
    "Recursos Humanos",
    "Clientes y Ventas",
    "Proveedores y Abastecimiento",
    "Productos y Servicios",
    "Finanzas",
    "Operaciones y Logística",
    "Documentación y Cumplimiento",
    "Tecnología e Infraestructura",
    "Marketing y Relaciones Públicas",
    "Gestión de Calidad",
  ];

  // Cargar el ID del usuario desde AsyncStorage
  React.useEffect(() => {
    const fetchUsuario = async () => {
      const usuario = await AsyncStorage.getItem("usuario");
      if (usuario) {
        const usuarioParseado = JSON.parse(usuario);
        setNewTrabajador((prev) => ({
          ...prev,
          usuarioId: usuarioParseado.idUSER,
        }));
      }
    };
    fetchUsuario();
  }, []);

  // Manejar el cambio en los campos del formulario
  const handleInputChange = (name, value) => {
    setNewTrabajador((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar el cambio en los roles seleccionados
  const handleRoleChange = (role) => {
    setNewTrabajador((prev) => {
      const alreadySelected = prev.rol.includes(role);
      return {
        ...prev,
        rol: alreadySelected
          ? prev.rol.filter((r) => r !== role) // Eliminar el rol si ya está seleccionado
          : [...prev.rol, role], // Agregar el rol si no está seleccionado
      };
    });
  };

  // Función para agregar trabajador al servidor
  const handleAgregar = async () => {
    console.log(newTrabajador);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "No se encontró el token de autenticación.");
        return;
      }

      const response = await fetch(`${API_URL_BASE}/trabajadores/recursos-humanos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTrabajador),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.mensaje || "Error al agregar trabajador.");
      }

      Alert.alert("Éxito", "Trabajador agregado exitosamente.");
      onAdd(); // Actualizar lista de trabajadores
      onClose(); // Cerrar modal
    } catch (error) {
      console.error("Error al agregar trabajador:", error);
      Alert.alert("Error", "Ocurrió un error al agregar el trabajador.");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Agregar Nuevo Trabajador</Text>
          <ScrollView>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre:</Text>
              <TextInput
                style={styles.input}
                value={newTrabajador.nombre}
                onChangeText={(text) => handleInputChange("nombre", text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                value={newTrabajador.email}
                onChangeText={(text) => handleInputChange("email", text)}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password:</Text>
              <TextInput
                style={styles.input}
                value={newTrabajador.password}
                onChangeText={(text) => handleInputChange("password", text)}
                secureTextEntry={true}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Roles:</Text>
              {roles.map((role) => (
                <TouchableOpacity
                  key={role}
                  style={styles.checkboxContainer}
                  onPress={() => handleRoleChange(role)}
                >
                  <Text style={styles.checkbox}>
                    {newTrabajador.rol.includes(role) ? "✅" : "⬜"}
                  </Text>
                  <Text style={styles.checkboxLabel}>{role}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button title="Agregar" onPress={handleAgregar} color="red"/>
            <Button title="Salir" onPress={onClose} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  checkbox: {
    fontSize: 18,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default AgregarUsuarioTrabajador;
