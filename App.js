import 'react-native-gesture-handler';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { View, Dimensions } from 'react-native';

import AppLayout from './components/AppLayout';
import Ajustes from './components/Ajustes';

import Login from './views/Login';
import CrearCuenta from './views/CrearCuenta';
import OlvidePassword from './views/OlvidePassword';
import Dashboard from './views/Dashboard';

import ClientesYVentas from './viewsMenu3Puntos/ClientesYVentas';
import RecursosHumanos from './viewsMenu3Puntos/RecursosHumanos';
import ProveedoresYAbastecimiento from './viewsMenu3Puntos/ProveedoresYAbastecimiento';
import ProductosYServicios from './viewsMenu3Puntos/ProductosYServicios';
import Finanzas from './viewsMenu3Puntos/Finanzas';
import OperacionesYLogistica from './viewsMenu3Puntos/OperacionesYLogistica';
import DocumentacionYCumplimiento from './viewsMenu3Puntos/DocumentacionYCumplimiento';
import TecnologiaEInfraestructura from './viewsMenu3Puntos/TecnologiaEInfraestructura';
import MarketingYRelacionesPublicas from './viewsMenu3Puntos/MarketingYRelacionesPublicas';
import GestionDeCalidad from './viewsMenu3Puntos/GestionDeCalidad';


const Stack = createStackNavigator();

const App = () => {
  const { width } = Dimensions.get('window');

  

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="CrearCuenta"
          screenOptions={{
            headerShown: false, // Ocultar encabezado en todas las pantallas por defecto
            headerStyle: {
              backgroundColor: '#28303B', // Color de fondo del encabezado
            },
            headerTintColor: '#fff', // Color de texto de los elementos del encabezado
            headerTitleStyle: {
              fontWeight: 'bold', // Estilo del título del encabezado
            },
          }}
        >

          <Stack.Screen name="CrearCuenta" component={CrearCuenta} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="OlvidePassword" component={OlvidePassword} />
          <Stack.Screen name="Ajustes" component={Ajustes} />


          <Stack.Screen name="AppLayout" component={AppLayout} />

          {/* Pantallas del menú adicional */}
          <Stack.Screen name="ClientesYVentas" component={ClientesYVentas} />
          <Stack.Screen name="RecursosHumanos" component={RecursosHumanos} />
          <Stack.Screen name="ProveedoresYAbastecimiento" component={ProveedoresYAbastecimiento} />
          <Stack.Screen name="ProductosYServicios" component={ProductosYServicios} />
          <Stack.Screen name="Finanzas" component={Finanzas} />
          <Stack.Screen name="OperacionesYLogistica" component={OperacionesYLogistica} />
          <Stack.Screen name="DocumentacionYCumplimiento" component={DocumentacionYCumplimiento} />
          <Stack.Screen name="TecnologiaEInfraestructura" component={TecnologiaEInfraestructura} />
          <Stack.Screen name="MarketingYRelacionesPublicas" component={MarketingYRelacionesPublicas} />
          <Stack.Screen name="GestionDeCalidad" component={GestionDeCalidad} />

        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
