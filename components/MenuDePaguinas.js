// PageLayout.js
import React from 'react';
import { View, Dimensions } from 'react-native';
import { Text } from 'native-base';
import NavMenu from './NavMenu';
import globalStyles from '../styles/global';

const MenuDePaguinas = ({ nombreUser, emailUser, title, info }) => {
    const { width, height } = Dimensions.get('window');

    return (
        <View style={[globalStyles.contenedor, { width: width, height: height }]}>
            <NavMenu nombreUser={nombreUser} emailUser={emailUser} />
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{title}</Text>
            {info && <Text>Has clicado en: {info}</Text>}
            
        </View>
    );
};

export default MenuDePaguinas;
