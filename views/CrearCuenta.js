import React, { useEffect, useState } from 'react';
import { View, Dimensions, Modal, StyleSheet, ScrollView } from 'react-native'
import { Image, Button, Text, H1, Input, Stack, FormControl, Box, Toast } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CrearCuenta = () => {


  const { width, height } = Dimensions.get('window');
  console.log('dentro de login width:  ', width)
  console.log('dentro de login height:  ', height)
  // State del formulario
  // Estado para controlar la visibilidad del modal
  const [modalVisible, setModalVisible] = useState(false);
  const [nombre, guardarNombre] = useState('hijo');
  const [email, guardarEmail] = useState('hijo@hijo.com');
  const [repetirPassword, guardarRepetirPassword] = useState('123456');
  const [password, guardarPassword] = useState('123456');

  

  const [mensaje, guardarMensaje] = useState(null);
  const [textBoton, setTextBoton] = useState('Crear Cuenta')
  const [habilitarboton, setHabilitarboton] = useState(false) 
  // React navigation
  const navigation = useNavigation();



  useEffect(() => {
    const verificarAutenticacion = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const emailUser = await AsyncStorage.getItem('email');
        const nombreUser = await AsyncStorage.getItem('nombre');
  
        if (token) { // Verificar si el token existe
          console.log('Nombre:', nombreUser ? nombreUser : 'Nombre no disponible');
          console.log('Email:', emailUser ? emailUser : 'Email no disponible');
  
          // Navegar solo si el token está presente
          navigation.navigate('AppLayout');
        } else {
          console.log('Token no encontrado, redirigiendo al inicio de sesión.');
        }
      } catch (error) {
        console.error('Error al obtener datos de AsyncStorage:', error);
      }
    };
  
    verificarAutenticacion();
  }, []);
  




  // Cuando el usuario presiona en iniciar sesion
  const handleSubmit = async () => {
    setTextBoton('Cargando.......')
    setHabilitarboton(true)


    
    // validar
    if (nombre === '' || email === '' || password === '' || repetirPassword === '') {
      // Mostrar un error
      guardarMensaje('Todos los campos son obligatorios');
      setModalVisible(true)
      setTextBoton('Crear Cuenta')
    setHabilitarboton(false)
      return;
    }

    // Validar que las contraseñas coincidan
    if (password !== repetirPassword) {
      guardarMensaje('Las contraseñas no coinciden');
      setModalVisible(true);
      setTextBoton('Crear Cuenta')
    setHabilitarboton(false)
      return;
    }


    try {
      // Preparar los datos para la petición
      const usuario = {
        nombre,
        email,
        password
      };

      // Petición al backend
      const respuesta = await fetch('http://192.168.1.133:4000/felman/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      });

      const resultado = await respuesta.json();

      // Manejar la respuesta del servidor
      if (respuesta.ok) {
        guardarMensaje('Usuario creado con éxito');
        setModalVisible(true);

        // Opcional: limpiar el formulario
        guardarNombre('');
        guardarEmail('');
        guardarPassword('');
        guardarRepetirPassword('');
        setTextBoton('Crear Cuenta')
    setHabilitarboton(false)

        // Opcional: navegar a otra pantalla si el usuario fue creado
        navigation.navigate('Login');
      } else {
        // Mostrar el error del servidor
        guardarMensaje(resultado.msg || 'Hubo un error al crear el usuario');
        setModalVisible(true);
        setTextBoton('Crear Cuenta')
    setHabilitarboton(false)
      }

    } catch (error) {
      // Manejo de errores
      console.error('Error al crear usuario:', error);
      guardarMensaje('Error de conexión con el servidor');
      setModalVisible(true);
      setTextBoton('Crear Cuenta')
    setHabilitarboton(false)
    }

  }

  // muestra un mensaje toast
  const mostrarAlerta = () => {
    Toast.show({
      text: mensaje,
      buttonText: 'OK',
      duration: 5000
    })
  }

  return (

    <View style={[globalStyles.contenedor, {  width: width, height: height }]}>

<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 120 }}>
        <Image
          source={require('../img/YouApp.png')}
          alt="Descripción de la imagen"
          style={{
            width: '90%', // Ajusta el ancho al 90% de la pantalla
            height: undefined, // Deja que la altura se ajuste automáticamente
            aspectRatio: 1, // Mantén las proporciones originales de la imagen
            resizeMode: 'contain', // Asegura que la imagen no se recorte
            
          }}

        />
      </View>




      <View style={globalStyles.contenido}>



        <FormControl style={globalStyles.formulario}>

          <Text style={globalStyles.tituloPrincipales}>
            Crear Cuenta
          </Text>

          <ScrollView
            style={{ maxHeight: 300 }} // Ajusta la altura aquí según lo que necesites
            contentContainerStyle={{ paddingBottom: 100 }} // Espacio extra al final para scroll suave
            showsVerticalScrollIndicator={true}
          >

            <Stack space={4}>
              <Stack>
                <FormControl.Label>NOMBRE</FormControl.Label>
                <Input
                  autoCompleteType="nombre"
                  placeholder="Tu Nombre"
                  onChangeText={texto => guardarNombre(texto.toLowerCase())}
                  value={nombre}
                />
              </Stack>

              <Stack>
                <FormControl.Label>EMAIL</FormControl.Label>
                <Input
                  autoCompleteType="email"
                  placeholder="Email de registro"
                  onChangeText={texto => guardarEmail(texto.toLowerCase())}
                  value={email}
                />
              </Stack>

              <Stack>
                <FormControl.Label>PASSWORD</FormControl.Label>
                <Input
                  secureTextEntry={true}
                  placeholder="Password"
                  onChangeText={texto => guardarPassword(texto.toLowerCase())}
                  value={password}
                />
              </Stack>

              <Stack>
                <FormControl.Label>REPETIR PASSWORD</FormControl.Label>
                <Input

                  secureTextEntry={true}
                  placeholder="Repetir Password"
                  onChangeText={texto => guardarRepetirPassword(texto)}
                  value={repetirPassword}
                />
              </Stack>
            </Stack>
          </ScrollView>
        </FormControl>

        <Button
          borderRadius="full"
          style={globalStyles.boton}
          onPress={() => handleSubmit()}
          isDisabled={habilitarboton}
        >
          <Text
            style={globalStyles.botonTexto}
          >{textBoton}</Text>
        </Button>

        <Modal
          animationType="slide"  // Tipo de animación
          transparent={true}      // Fondo transparente
          visible={modalVisible}  // Controla la visibilidad
          onRequestClose={() => { // Cierre del modal al presionar el botón "Atrás" en Android
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.overlay}>
            <View style={styles.modalContent}>
              <Text style={styles.message}>{mensaje}</Text>
              <Button
                style={{ backgroundColor: 'rgb(239, 68, 68)'} }
                onPress={() => setModalVisible(false)}
                
              >
                <Text
                 style={{ color: 'white'} }
                >Cerrar</Text>
              </Button>
            </View>
          </View>
        </Modal>

        <View style={globalStyles.footerForm}>
          <Text
            onPress={() => navigation.navigate("Login")}
            style={globalStyles.enlace}
          >¿Ya tienes una cuenta? Inicia Sesión</Text>
          <Text
            onPress={() => navigation.navigate("OlvidePassword")}
            style={globalStyles.enlace}
          >Olvidé mi Password</Text>
        </View>



      </View>
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

export default CrearCuenta;
