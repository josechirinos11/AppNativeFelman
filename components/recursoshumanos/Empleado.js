import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL_BASE } from '@env';
import globalStyles from '../../styles/global';
import ActualizarTrabajador from './ActualizarTrabajador';





const Empleado = () => {
  const [ID, setID] = useState(null);
  const [empleados, setEmpleados] = useState([]); // Estado para guardar los empleados
  const [loading, setLoading] = useState(true); // Estado para mostrar el cargando
  const [error, setError] = useState(null); // Estado para manejar errores
  const [searchTerm, setSearchTerm] = useState("");  // Estado para el término de búsqueda
  const [data, setData] = useState([]);  // Estado para almacenar los datos de la colección
  const [filteredData, setFilteredData] = useState([]);  // Estado para el resultado de la búsqueda
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [selectedTrabajador, setSelectedTrabajador] = useState(null);  // Trabajador seleccionado para editar
  const [showEditModal, setShowEditModal] = useState(false);  // Estado para mostrar el modal de editar trabajador


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener token
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Token no encontrado');

        // Obtener el ID del usuario
        const usuarioID = await AsyncStorage.getItem('usuarioID');
        const storedID = usuarioID || (await AsyncStorage.getItem('ID'));
        if (!storedID) throw new Error('ID no encontrado');

        setID(storedID);

        // Realizar la petición al backend
        const respuesta = await fetch(`${API_URL_BASE}trabajadores/recursos-humanos`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Encabezado de autorización
          },
        });

        // Verificar si la respuesta es correcta
        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        }

        // Obtener los datos como JSON
        const datos = await respuesta.json();

        // Verificar si es un array
        if (Array.isArray(datos)) {
          setData(datos);  // Guardar los datos sin filtrar
          setFilteredData(datos);  // Establecer los datos filtrados inicialmente con todos los empleados
        } else {
          throw new Error("La respuesta no es un array");
        }

      } catch (error) {
        console.error('Error al buscar empleados:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);  // Finaliza el estado de carga
      }
    };

    fetchData();
  }, []);  // Solo ejecuta al montar el componente

  const handleSearch = (text) => {
    setSearchTerm(text);  // Actualiza el término de búsqueda

    // Filtrar los empleados que contienen el término de búsqueda en el nombre
    const filtered = data.filter((trabajador) =>
      trabajador.nombre.toLowerCase().includes(text.toLowerCase())
    );

    // Actualiza los datos filtrados
    setFilteredData(filtered);
  };

  const handleEdit = (IDtrabajador) => {
    console.log(`Editar empleado con ID: ${IDtrabajador}`);
    const trabajador = data.find((trabajador) => trabajador._id === IDtrabajador);
    setSelectedTrabajador(trabajador);
    setShowEditModal(true);  // Abre el modal de edición
  };
  // Función para cerrar el modal de edición
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedTrabajador(null);  // Limpia el trabajador seleccionado
  };

  // Función para actualizar la lista de trabajadores después de agregar uno
  const handleAdd = () => {
    const fetchData = async () => {



      // Realizar la petición al backend
      const response = await fetch(`${API_URL_BASE}trabajadores/recursos-humanos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Encabezado de autorización
        },
      });
      setData(response.data);
      setFilteredData(response.data);

    };
    fetchData();
  };

  const openConfirmDialog = (id) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que quieres eliminar a este trabajador?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => handleDelete(id) }
      ]
    );
  };

  const handleDelete = (id) => {
    console.log(`Empleado con ID ${id} eliminado.`);
    // Lógica para eliminar el empleado (llamar a la API DELETE si es necesario)
  };

  if (loading) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
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

      {/* Input para búsqueda */}
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            paddingVertical: 8,
            paddingHorizontal: 10,
            fontSize: 16,
          }}
          placeholder="Buscar trabajador..."
          value={searchTerm}
          onChangeText={handleSearch}
        />
      </View>

      {/* Lista de trabajadores */}
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}  // Usa filteredData en lugar de empleados
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View
              style={{

                backgroundColor: 'rgb(243, 244, 246)',
                width: '90%',
                borderRadius: 5,
                alignSelf: 'center', // Centra el View horizontalmente
                shadowColor: 'black',  // Color de la sombra
                shadowOffset: { width: 0, height: 4 },  // Desplazamiento de la sombra
                shadowOpacity: 0.5,  // Opacidad de la sombra
                shadowRadius: 6,  // Radio de difuminado de la sombra
                elevation: 10,  // Elevación para Android (esto agrega una sombra en Android)
                marginBottom: 20,
                paddingTop: 15, // Espacio en la parte superior
                paddingBottom: 10, // Espacio en la parte inferior
                paddingLeft: 20, // Espacio en la parte izquierda
                paddingRight: 20, // Espacio en la parte derecha
                justifyContent: 'center',            // Centrar texto verticalmente
                alignItems: 'center',                // Centrar texto horizontalmente
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>{item.nombre || "Sin nombre"}</Text>
              <Text style={{ color: item.confirmado ? 'green' : 'red', fontWeight: 'bold' }}>
                {item.email || "Sin correo"}
              </Text>
              <View style={{ alignSelf: 'stretch', flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity
                  style={[globalStyles.boton, { flexBasis: '40%', paddingVertical: 5, alignItems: 'center' }]}
                  onPress={() => handleEdit(item._id)}
                >
                  <Text style={{ color: 'white' }}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[globalStyles.boton, { flexBasis: '40%', paddingVertical: 5, alignItems: 'center' }]}
                  onPress={() => openConfirmDialog(item._id)}
                >
                  <Text style={{ color: 'white' }}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <Text>No se encontraron trabajadores</Text>
      )}





      {showEditModal && (
        <ActualizarTrabajador
          trabajadorId={selectedTrabajador?._id}
          onClose={handleCloseEditModal}
          onUpdate={handleAdd}  // Recargar los datos después de actualizar
        />
      )}


    </View>
  );
};

export default Empleado;
