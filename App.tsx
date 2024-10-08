import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/Home';
import Avaliacao from './src/pages/Avaliacao';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Products">
        <Stack.Screen 
          name="Products" 
          component={Home} 
          options={{ title: 'Lista de Produtos' }} 
        />
        <Stack.Screen 
          name="Avaliacao" 
          component={Avaliacao} 
          options={{ title: 'Avaliação do Produto' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}