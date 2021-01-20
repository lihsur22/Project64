import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import dictionary from '../dictionary';


export default class Homescreen extends React.Component{
  constructor(){
    super();
    this.state={
      text:'',
      isSearchpressed : false,
      word : '',
      lexCat : '',
      examp : [],
      definition : '',
    }
  }

  getWord = (text) => {
    var searchWord = text.toLowerCase();
    if(dictionary[searchWord])
    {
      var word = dictionary[searchWord]['word']
      var lexCat = dictionary[searchWord]['lexicalCategory']
      var definitions = dictionary[searchWord]['definition']
      this.setState({
        word : word,
        lexCat : lexCat,
        definition : definitions
      });
    }
    else
    {
      this.setState({
        word : searchWord,
        lexCat : '',
        definition : 'The word cannot be found or isn\'t in the database\nCheck the spelling and try again'
      });
    }
  }

  render() {
    return(
      <View style={styles.cont}>
        <View>
          <SafeAreaProvider>
            <Header
              backgroundColor={'#DD00FF'}
              centerComponent={{
                text: 'Dictionary',
                style: { color: '#fff', fontSize: 20, fontWeight:'bold' },
              }}/>
            <TextInput
              style={styles.inputBox}
              onChangeText={(text) => {
                this.setState({
                  text : text,
                  isSearchpressed : false,
                  word : 'Loading...',
                  lexCat : '',
                  examp : [],
                  definition : ''
                });
              }}
              value={this.state.text}
            />
            <TouchableOpacity
              style={styles.searchB}
              onPress={() => {
                this.setState({isSearchpressed : true});
                this.getWord(this.state.text);
              }}>
              <Text style={styles.searchText}>Search</Text>
            </TouchableOpacity>
            <View style={{marginTop : 60}}>
              <View style={styles.detCont}>
                <Text style={styles.detTitle}>
                  Word : {" "}
                </Text>
                <Text style={styles.detDes}>
                  {this.state.word}
                </Text>
              </View>
              <View style={styles.detCont}>
                <Text style={styles.detTitle}>
                  Type : {" "}
                </Text>
                <Text style={styles.detDes}>
                  {this.state.lexCat}
                </Text>
              </View>
              <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                <Text style={styles.detTitle}>
                  Definition : {" "}
                </Text>
                <Text style={styles.detDes}>
                  {this.state.definition}
                  </Text>
              </View>
            </View>
          </SafeAreaProvider>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cont : {
    backgroundColor : '#bbbbbb'
  },
  inputBox : {
    marginTop: 40,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  searchB : {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  searchText : {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    borderWidth: 3,
    borderRadius: 100,
  },
  detCont : {
    flexDirection:'row',
    flexWrap:'wrap',
  },
  detTitle : {
    fontSize : 18,
    color : 'gold',
    marginLeft : '8%',
  },
  detDes : {
    fontSize : 18,
  },
})