import { StyleSheet, YellowBox } from 'react-native';

const globalStyles = StyleSheet.create({
    contenedor: {
        flex: 1,

    },
    formulario: {
        marginTop: 5,
        flex: 10,
        backgroundColor: 'white',
        width: '90%'

    },
    footerForm: {
        flexDirection: 'row',
        width: '100%',
        flex: 1,
        justifyContent: 'space-between', // Distribuye espacio entre los elementos
        alignItems: 'center', // Alinea verticalmente los hijos en el centro
    },
    contenido: {
        backgroundColor: 'white',  // Fondo en color claro
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
        paddingTop: 10,
        flex: 1,
        backgroundColor: 'rgb(239, 68, 68)',  // Color de fondo
        height: '40%',                            // Altura deseada
        width: '70%',                          // Ancho deseado (puedes ajustar el porcentaje o usar un valor fijo)
        marginVertical: 10,                   // Espacio vertical alrededor del botón
        justifyContent: 'center',              // Centrar texto verticalmente
        alignItems: 'center',                  // Centrar texto horizontalmente


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

    }
});

export default globalStyles;