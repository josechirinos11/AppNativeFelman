import React, { useState } from 'react'
import { View, Dimensions } from 'react-native'
import { Image, Button, Text, H1, Input, Stack, FormControl, Item, Toast } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../styles/global';



const Login = () => {

  const { width, height } = Dimensions.get('window');
  console.log('dentro de login width:  ', width)
  console.log('dentro de login height:  ', height)
  // State del formulario
  const [email, guardarEmail] = useState('');
  const [password, guardarPassword] = useState('');

  const [mensaje, guardarMensaje] = useState(null);

  // React navigation
  const navigation = useNavigation();


  // Cuando el usuario presiona en iniciar sesion
  const handleSubmit = async () => {
    // validar
    if (email === '' || password === '') {
      // Mostrar un error
      guardarMensaje('Todos los campos son obligatorios');
      return;
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


    <View style={[globalStyles.contenedor, { backgroundColor: 'rgb(209 213 219)', width: width, height: height }]}>
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../img/felman.png')}
          alt="Descripción de la imagen"
          width={150}
          height={75}
          borderRadius={0}
        />
      </View>




      <View style={globalStyles.contenido}>



        <FormControl style={globalStyles.formulario}>
          <Stack space={5}>
            <Stack>

              <Input
                autoCompleteType="email"
                placeholder="Email"
                onChangeText={texto => guardarEmail(texto.toLowerCase())}
                value={email}
              />
            </Stack>
            <Stack>

              <Input
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={texto => guardarPassword(texto)}
              />
            </Stack>
          </Stack>
        </FormControl>

        <Button
          square
          block
          style={globalStyles.boton}
          onPress={() => handleSubmit()}
        >
          <Text
            style={globalStyles.botonTexto}
          >Iniciar Sesión</Text>
        </Button>

        <Text
          onPress={() => navigation.navigate("CrearCuenta")}
          style={globalStyles.enlace}
        >Crear Cuenta</Text>

        {mensaje && mostrarAlerta()}


      </View>
    </View>




  );
}

export default Login;