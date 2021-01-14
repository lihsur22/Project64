import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Homescreen from './screens/homescreen'
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

export default function App() {
  return (
    <View>
      <AppContainer/>
    </View>
  );
}

var AppNavigator = createSwitchNavigator({
  Homescreen: Homescreen,
});

const AppContainer = createAppContainer(AppNavigator);