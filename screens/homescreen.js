import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements'


export default class Homescreen extends React.Component{
  render() {
    return(
      <View>
      	<Header backgroundColor={'#440066'}/>
      </View>
    );
  }
}