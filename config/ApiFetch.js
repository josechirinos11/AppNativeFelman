// ApiFetch.js

export const ApiFetch = async (data, method, url, mensajeRespuestaError, customHeaders = {}) => {
  try {
    // Crear los encabezados básicos
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders, // Permite pasar encabezados personalizados
    };

    // Configurar la solicitud
    const config = {
      method,
      headers,
    };

    // Si el método es POST, PUT o PATCH, incluir el cuerpo
    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      config.body = JSON.stringify(data);
    }

    const respuesta = await fetch(`http://192.168.1.133:4000/felman/${url}`, config);

    // Verificar si la respuesta es exitosa
    if (!respuesta.ok) {
      const errorData = await respuesta.json();
      throw new Error(errorData.msg || mensajeRespuestaError);
    }

    // Retornar los datos en caso de éxito
    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    // Manejo de errores
    console.error('Error FETCH:', error.message);
    throw error; // Relanzar el error para manejarlo en el componente
  }
};
