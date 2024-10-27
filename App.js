import 'react-native-gesture-handler';
import React from 'react';
import { NativeBaseProvider } from 'native-base';

import { View, Dimensions } from 'react-native'


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


import Login from './views/Login';
import CrearCuenta from './views/CrearCuenta';

const App = () => {
  const { width } = Dimensions.get('window');

  console.log('dentro de App:  ', width)


  return (

    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CrearCuenta" >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Iniciar Sesión en felman",
              headerShown: false
            }}
          />


          <Stack.Screen
            name="CrearCuenta"
            component={CrearCuenta}
            options={{
              title: "Crear Cuenta",
              headerShown: false,
              headerStyle: {
                backgroundColor: '#28303B'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold'
              }
            }}
          />





        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>

  );
};

export default App;
