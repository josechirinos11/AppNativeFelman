import { StyleSheet, YellowBox } from 'react-native';

const globalStyles = StyleSheet.create({
    contenedorScroll: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
      },
    contenedor: {
        flex: 1,
        backgroundColor: 'rgb(243 244 246)'
    },
    formulario: {
        flex: 20,
        width: '90%',
        height: '100%',
        backgroundColor: 'transparent', // Blanco con 80% de opacidad
    },
    footerForm: {

        flexDirection: 'row',
        width: '100%',
        flex: 2,
        justifyContent: 'space-between', // Distribuye espacio entre los elementos
        alignItems: 'center', // Alinea verticalmente los hijos en el centro
    },
    contenido: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Blanco con 80% de opacidad
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '1%',
        marginBottom: '10%',
        borderRadius: 10,  // Radio de borde para dar suavidad

        // Sombras para el efecto de neomorfismo
        shadowColor: 'rgba(255, 0, 0, 0.5)',  // Sombra de fondo
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,

        // Sombra clara para el efecto de luz
        elevation: 8,  // Eleva un poco para darle realce en Android
    },
    titulo: {
        textAlign: 'center',
        textAlignVertical: 'center',
        marginBottom: 20,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF'
    },
    subtitulo: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 20
    },
    input: {
        backgroundColor: '#FFF',
        marginBottom: 20
    },
    boton: {
        backgroundColor: 'rgb(239, 68, 68)', // Color de fondo
        width: '50%',                        // Ancho deseado
        marginTop: 10,                       // Espacio vertical
        justifyContent: 'center',            // Centrar texto verticalmente
        alignItems: 'center',                // Centrar texto horizontalmente
        borderWidth: 0,                      // Grosor del borde
        borderColor: 'black',                // Color del borde
        borderRadius: 5,                     // Bordes redondeados
        paddingVertical: 10,                 // Espaciado interno
        // Sombra para iOS
        shadowColor: 'rgb(239, 68, 68)',     // Color de la sombra (relacionado con el fondo)
        shadowOffset: {
          width: 0,                          // Desplazamiento horizontal
          height: 3,                         // Desplazamiento vertical
        },
        shadowOpacity: 0.5,                  // Opacidad de la sombra
        shadowRadius: 4,                     // Radio de difusión de la sombra
        // Sombra para Android
        elevation: 5,                        // Intensidad de la sombra
    },
    
    botonTexto: {

        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#FFF'
    },
    enlace: {
        marginHorizontal: '5%',
        color: 'black',



        fontSize: 10,

    },
    tituloPrincipales: {
        paddingTop: 15,
        fontSize: 32, // Equivalente a "text-4xl"
        fontWeight: '600', // Equivalente a "font-semibold"
        fontStyle: 'italic', // Equivalente a "italic"
        color: '#e20613', // Color rojo
        fontFamily: 'sans-serif', // Fuente sans-serif
        lineHeight: 30,
        //position: 'absolute', // Posición absoluta
        //bottom: 10, // Hacia la parte inferior
        right: 10, // Hacia la derecha

        textShadowColor: 'rgba(0, 0, 0, 0.5)', // Sombra
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    MenuPrincipal: {
        backgroundColor: 'rgb(239, 68, 68)', // Color de fondo
    borderColor: 'white', // Color del borde
    borderWidth: 1, // Ancho del borde
    borderRadius: 8, // Radio de esquina del borde
    // Propiedades de sombra para iOS
    shadowColor: 'red', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.3, // Opacidad de la sombra
    shadowRadius: 4, // Radio de difuminado de la sombra
    // Propiedades de sombra para Android
    elevation: 10, // Elevación para sombra en Android
    },
    MenuSecundario: {
       
        backgroundColor: 'rgb(245, 108, 108)', // Color de fondo
    borderColor: 'white', // Color del borde
    borderWidth: 1, // Ancho del borde
    borderRadius: 8, // Radio de esquina del borde
    // Propiedades de sombra para iOS
    shadowColor: 'white', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.3, // Opacidad de la sombra
    shadowRadius: 4, // Radio de difuminado de la sombra
    // Propiedades de sombra para Android
    elevation: 10, // Elevación para sombra en Android
    },
    MenuItem: {
        borderBottomColor: 'white', // Color del borde
        borderBottomWidth: 1, // Ancho del borde
        paddingVertical: 10, // Espaciado vertical del ítem
    },
});

export default globalStyles;