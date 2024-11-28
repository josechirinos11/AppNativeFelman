import React, { useState } from 'react'
import { View, Dimensions, Modal, StyleSheet, ScrollView } from 'react-native'
import { Image, Button, Text, H1, Input, Stack, FormControl, Item, Toast } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiFetch } from '../config/apiFetch';



const Login = () => {


  const { width, height } = Dimensions.get('window');
  console.log('dentro de login width:  ', width)
  console.log('dentro de login height:  ', height)
  // State del formulario
  // Estado para controlar la visibilidad del modal
  const [modalVisible, setModalVisible] = useState(false);

  const [email, guardarEmail] = useState('No1@correo.com');

  const [password, guardarPassword] = useState('123456');

  const [mensaje, guardarMensaje] = useState(null);
  const [textBoton, setTextBoton] = useState('Iniciar Sesion')
  const [habilitarboton, setHabilitarboton] = useState(false)
  // React navigation
  const navigation = useNavigation();


  // Cuando el usuario presiona en iniciar sesion
  const handleSubmit = async () => {
    setTextBoton('Cargando.......')
    setHabilitarboton(true)




    // validar
    if (email === '' || password === '') {
      // Mostrar un error
      guardarMensaje('Todos los campos son obligatorios');
      setModalVisible(true)
      setTextBoton('Iniciar Sesion')
      setHabilitarboton(false)
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      guardarMensaje('Formato de email no válido');
      setModalVisible(true);
      setTextBoton('Iniciar Sesión');
      setHabilitarboton(false);
      return;
    }


    try {
      // Preparar los datos para la petición
      const usuario = {

        email,
        password
      };

      // Petición al backend
      const respuesta = await fetch('http://192.168.1.133:4000/felman/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      });

      const resultado = await respuesta.json();

      console.log('el resultado es :  ', resultado)
      const rolUSER = resultado.rol
      const dptoUSER = resultado.departamentos
      console.log('el rol es :  ', rolUSER)
      console.log('el departmentos es :  ', dptoUSER)

      // Manejar la respuesta del servidor
      if (respuesta.ok) {

        guardarMensaje('Cargando Sesion');
        setModalVisible(true);
        setTextBoton('Iniciar Sesion')
        setHabilitarboton(false)


        // recreamos los departamentos de acuerdo a los roles del usuario
        const actualizarDepartamentos = (rolUSER, dptoUSER) => {
          // Mapeamos los departamentos
          return dptoUSER.map(depto => {
            // Si el title del departamento está en los roles del usuario, actualizamos sus items
            if (rolUSER.includes(depto.title)) {
              return {
                ...depto,
                items: depto.items.map(item => ({
                  ...item,
                  active: true,  // Activamos todos los items si el título está en los roles
                })),
              };
            }
        
            // Si el title no está en los roles, dejamos los items desactivados
            return {
              ...depto,
              items: depto.items.map(item => ({
                ...item,
                active: false, // Desactivamos los items si el título no está en los roles
              })),
            };
          });
        };







        const departamentosSotarege = actualizarDepartamentos(rolUSER, dptoUSER);



        // Guardar datos en AsyncStorage
        const resultadoStr = JSON.stringify(resultado);
       // console.log("Datos que se guardarán:", JSON.stringify(resultado, null, 2));
        await AsyncStorage.setItem('usuario', resultadoStr); // Guarda el token
        await AsyncStorage.setItem('token', resultado.token); // Guarda el token
        await AsyncStorage.setItem('email', resultado.email); // Guarda el correo
        await AsyncStorage.setItem('nombre', resultado.nombre); // Guarda el correo
        await AsyncStorage.setItem('departamentos', JSON.stringify(departamentosSotarege)); // 

        // Opcional: limpiar el formulario

        guardarEmail('');
        guardarPassword('');


        // Opcional: navegar a otra pantalla si el usuario fue creado
        navigation.navigate('AppLayout');
      } else {
        // Mostrar el error del servidor
        guardarMensaje(resultado.msg || 'Hubo un error al crear el usuario');
        setModalVisible(true);
        setTextBoton('Iniciar Sesion')
        setHabilitarboton(false)
      }

    } catch (error) {
      // Manejo de errores
      console.error('Error al iniciar sesion:', error);
      guardarMensaje('Error de conexión con el servidorrrrrr');
      setModalVisible(true);
      setTextBoton('Iniciar Sesion')
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

    <View style={[globalStyles.contenedor, { width: width, height: height }]}>

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
            Login
          </Text>

          <ScrollView
            style={{ maxHeight: 300 }} // Ajusta la altura aquí según lo que necesites
            contentContainerStyle={{ paddingBottom: 100 }} // Espacio extra al final para scroll suave
            showsVerticalScrollIndicator={true}
          >

            <Stack space={4}>


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
                style={{ backgroundColor: 'rgb(239, 68, 68)' }}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  style={{ color: 'white' }}
                >Cerrar</Text>
              </Button>
            </View>
          </View>
        </Modal>

        <View style={globalStyles.footerForm}>
          <Text
            onPress={() => navigation.navigate("CrearCuenta")}
            style={globalStyles.enlace}
          >Crear Cuenta</Text>
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

export default Login;
