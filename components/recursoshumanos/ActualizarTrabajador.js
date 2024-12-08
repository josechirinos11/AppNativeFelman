import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  Switch,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { API_URL_BASE } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ActualizarTrabajador = ({ trabajadorId, onClose, onUpdate }) => {
  const [campos, setCampos] = useState([]); // Campos del modelo
  const [trabajador, setTrabajador] = useState({}); // Datos del trabajador
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

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

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.error("Token no encontrado");
          setLoading(false);
          return;
        }

        // Obtener campos
        const camposResponse = await fetch(`${API_URL_BASE}/trabajadores/campos`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!camposResponse.ok) {
          throw new Error(`Error al obtener campos: ${camposResponse.status}`);
        }
        const camposData = await camposResponse.json();
        setCampos(camposData);

        // Obtener datos del trabajador
        if (trabajadorId) {
          const trabajadorResponse = await fetch(
            `${API_URL_BASE}/trabajadores/recursos-humanos/${trabajadorId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!trabajadorResponse.ok) {
            throw new Error(
              `Error al obtener trabajador: ${trabajadorResponse.status}`
            );
          }
          const trabajadorData = await trabajadorResponse.json();
          const { password, ...restoDeCampos } = trabajadorData;
          setTrabajador(restoDeCampos);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [trabajadorId]);

  // Manejar cambios en los campos del formulario
  const handleChange = (name, value) => {
    setTrabajador((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar cambios en los roles
  const handleRoleChange = (role) => {
    setTrabajador((prev) => {
      const currentRoles = prev.rol || [];
      const isRoleSelected = currentRoles.includes(role);

      // Agregar o quitar el rol según su estado
      const updatedRoles = isRoleSelected
        ? currentRoles.filter((r) => r !== role)
        : [...currentRoles, role];

      return { ...prev, rol: updatedRoles };
    });
  };

  // Enviar datos al servidor
  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("Token no encontrado");
        return;
      }

      const response = await fetch(
        `${API_URL_BASE}/trabajadores/recursos-humanos/${trabajadorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(trabajador),
        }
      );

      if (!response.ok) {
        throw new Error(`Error al actualizar trabajador: ${response.status}`);
      }

      const data = await response.json();
      console.log("Trabajador actualizado:", data);
      onUpdate(); // Notificar que se realizó la actualización
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error("Error al actualizar trabajador:", error.message);
      alert("Ocurrió un error al actualizar el trabajador.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Actualizar Trabajador</Text>
          <ScrollView>
            {campos
              .filter((campo) => campo !== "departamentos")
              .map((campo) => (
                <View key={campo} style={styles.fieldContainer}>
                  {campo === "rol" ? (
                    <View>
                      <Text style={styles.label}>Roles:</Text>
                      {roles.map((role) => (
                        <View key={role} style={styles.roleContainer}>
                          <Text>{role}</Text>
                          <Switch
                            value={trabajador.rol?.includes(role) || false}
                            onValueChange={() => handleRoleChange(role)}
                          />
                        </View>
                      ))}
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.label}>
                        {campo.charAt(0).toUpperCase() + campo.slice(1)}:
                      </Text>
                      <TextInput
                        style={styles.input}
                        value={trabajador[campo] || ""}
                        onChangeText={(value) => handleChange(campo, value)}
                      />
                    </View>
                  )}
                </View>
              ))}
          
          <View style={styles.buttonContainer}>
            <Button title="Actualizar" onPress={handleUpdate} color="red" />
            <Button title="Cancelar" onPress={onClose} color="red" />
          </View>
          </ScrollView>
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
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  fieldContainer: {
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
    marginBottom: 10,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ActualizarTrabajador;
