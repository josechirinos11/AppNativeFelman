module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',   // Nombre del módulo que importará las variables de entorno
      path: '.env',         // El archivo que contiene las variables de entorno
    }],
  ],
};
