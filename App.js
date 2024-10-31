import 'react-native-gesture-handler';
import React from 'react';
import { NativeBaseProvider } from 'native-base';

import { View, Dimensions } from 'react-native'


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


import Login from './views/Login';
import CrearCuenta from './views/CrearCuenta';
import OlvidePassword from './views/OlvidePassword';
import Dashboard from './views/Dashboard'

const App = () => {
  const { width } = Dimensions.get('window');

  console.log('dentro de App:  ', width)


  return (

    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CrearCuenta" >
          
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

          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Login",
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
          <Stack.Screen
            name="OlvidePassword"
            component={OlvidePassword}
            options={{
              title: "Olvide Password",
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

<Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              title: "Panel de control",
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
