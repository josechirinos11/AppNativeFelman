// NavMenu.js
import React, { useState } from 'react';
import { Box, HStack, IconButton, Input, Menu, Avatar, VStack, Text, Button, Icon } from 'native-base';
import { Image } from 'react-native';
import { Ionicons } from '@native-base/icons';
import logoUsuario from '../img/usuario.png'
import iconMenu from '../img/iconMenu.png'
import iconlupa from '../img/lupa.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import menuItems from '../config/menuItems';
import globalStyles from '../styles/global';


const NavMenu = ({ nombreUser, emailUser }) => {
    // React navigation
    const navigation = useNavigation();

    const userLocalstorage = '{"nombreUSER": "John Doe", "emailUSER": "johndoe@example.com"}'; // Simulando el localStorage
    const usuarioObjeto = userLocalstorage ? JSON.parse(userLocalstorage) : null;

    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);

    // Función de cierre de sesión
    const handleCerrarSesion = async () => {
        console.log('Cerrando sesión');
        try {
            // Eliminar los datos del AsyncStorage
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('nombre');

            console.log('Usuario ha cerrado sesión');
            navigation.navigate('CrearCuenta');
            // Aquí puedes agregar la lógica para navegar a la pantalla de inicio de sesión o realizar otras acciones
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }

    };
    
    const handleAjustes =  (nombreUser, emailUser ) => {
        console.log('Ajustes');
      
            navigation.navigate('Ajustes', { nombreUser, emailUser  })
    };

    const handleItemMenu = (title, item) => {
        console.log('Presionando botón:', title, '-', item);
    
        switch (title) {
          case 'Recursos Humanos':
            navigation.navigate('RecursosHumanos', { title, item, nombreUser, emailUser  });
            break;
          case 'Clientes y Ventas':
            navigation.navigate('ClientesYVentas', { title, item, nombreUser, emailUser  });
            break;
          case 'Proveedores y Abastecimiento':
            navigation.navigate('ProveedoresYAbastecimiento', { title, item, nombreUser, emailUser  });
            break;
          case 'Productos y Servicios':
            navigation.navigate('ProductosYServicios', { title, item, nombreUser, emailUser  });
            break;
          case 'Finanzas':
            navigation.navigate('Finanzas', { title, item, nombreUser, emailUser  });
            break;
          case 'Operaciones y Logística':
            navigation.navigate('OperacionesYLogistica', { title, item, nombreUser, emailUser  });
            break;
          case 'Documentación y Cumplimiento':
            navigation.navigate('DocumentacionYCumplimiento', { title, item, nombreUser, emailUser  });
            break;
          case 'Tecnología e Infraestructura':
            navigation.navigate('TecnologiaEInfraestructura', { title, item, nombreUser, emailUser  });
            break;
          case 'Marketing y Relaciones Públicas':
            navigation.navigate('MarketingYRelacionesPublicas', { title, item, nombreUser, emailUser  });
            break;
          case 'Gestión de Calidad':
            navigation.navigate('GestionDeCalidad', { title, item, nombreUser, emailUser  });
            break;
          default:
            console.log('No hay ruta definida para este ítem.');
        }
      };


    return (
        <Box  safeArea bg="white" shadow={2}>
            <HStack justifyContent="space-between" alignItems="center" p={0}>
                {/* Logo con menú desplegable */}



                <Menu
                    trigger={(triggerProps) => (
                        <IconButton
                            icon={
                                <Avatar 
                                    source={logoUsuario} 
                                    size="45px" // Ajusta el tamaño aquí
                                    borderRadius="full" // Esto asegura que sea un círculo
                                />
                            }
                            {...triggerProps}
                            onPress={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                        />
                    )}
                    isOpen={isProfileMenuOpen}
                    onClose={() => setIsProfileMenuOpen(false)}
                >
                    <VStack space={2} alignItems="center" p={3}>

                        <Text fontWeight="bold">{nombreUser}</Text>
                        <Text color="gray.500">{emailUser}</Text>
                        <Button onPress={() => { handleAjustes(nombreUser, emailUser) }} size="sm" mt={2} style={{ backgroundColor: 'rgb(239, 68, 68)', width: '70%' }}>
                            Ajustes
                        </Button>
                        <Button onPress={handleCerrarSesion} size="sm" mt={2} style={{ backgroundColor: 'rgb(239, 68, 68)' , width: '70%'}}>
                            Cerrar Sesión
                        </Button>
                    </VStack>
                </Menu>

                {/* Barra de búsqueda */}
                <Input
                    placeholder="Buscar..."
                    width="70%"
                    borderRadius="full"
                    py={2}
                    px={3}
                    InputLeftElement={<Image style={{ marginLeft: 5, width: 20, height: 20 }} source={iconlupa} alt="Menu Icon" size="5" />}
                />

                {/* Menú de opciones */}
                {/* Menú de opciones principal */}
                <Menu
                style={globalStyles.MenuPrincipal}
                    trigger={(triggerProps) => (
                        <IconButton
                            icon={<Image style={{ width: 40, height: 40 }} source={iconMenu} alt="Menu Icon" />}
                            {...triggerProps}
                            onPress={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)}
                        />
                    )}
                    isOpen={isOptionsMenuOpen}
                    onClose={() => setIsOptionsMenuOpen(false)}
                >
                    {/* Menú de primer nivel */}
                    {menuItems.map((menuCategory, index) => (
                        <Menu.Item key={index} onPress={() => setIsOptionsMenuOpen(false)} style={globalStyles.MenuItem}>
                            <Menu
                            style={globalStyles.MenuSecundario}
                                trigger={(triggerProps) => (
                                    <Text {...triggerProps} style={{ color: 'white' }}>{menuCategory.title}</Text>
                                )}
                            >
                                {/* Submenú */}
                                {menuCategory.items.map((subItem, subIndex) => (
                                    <Menu.Item key={subIndex}
                                    onPress={() => handleItemMenu(menuCategory.title, subItem)}
                                    style={globalStyles.MenuItem}
                                    >
                                        {subItem}
                                    </Menu.Item>
                                ))}
                            </Menu>
                        </Menu.Item>
                    ))}
                </Menu>
            </HStack>
        </Box>
    );
};

export default NavMenu;
