import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL_BASE} from '@env';

// ApiFetch centralizado
export const ApiFetch = async ({ data, method = 'GET', url, mensajeRespuestaError = 'Ocurrió un error', customHeaders = {} }) => {
  try {
    // Recuperar el token desde AsyncStorage
    const token = await AsyncStorage.getItem('token');

    // Crear los encabezados básicos
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders, // Permite pasar encabezados personalizados
    };

    // Si el token existe, añadirlo al encabezado Authorization con Bearer
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Configurar la solicitud
    const config = {
      method, // GET, POST, PUT, DELETE, etc.
      headers,
    };

    // Si el método requiere cuerpo, incluirlo
    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      config.body = JSON.stringify(data);
    }

    // Realizar la solicitud con la URL base y la ruta
    const respuesta = await fetch(`${API_URL_BASE}${url}`, config);

    // Verificar si la respuesta es exitosa
    if (!respuesta.ok) {
      const errorData = await respuesta.json();
      throw new Error(errorData.msg || mensajeRespuestaError);
    }

    // Retornar los datos de la respuesta en caso de éxito
    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    console.error('Error FETCH:', error.message);
    throw error; // Relanzar el error para manejarlo en los componentes
  }
};
