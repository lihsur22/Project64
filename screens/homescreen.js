import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements';
import { color } from 'react-native-reanimated';
import {SafeAreaProvider} from 'react-native-safe-area-context';


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

  getWord = (word) => {
    var searchWord = word.toLowerCase();
    var url = 'https://rupinwhitehatjr.github.io/dictionary/' + searchWord + '.json'
    //console.log(url)
    return fetch(url).then((data)=>{
      console.log(data.status)
      if(data.status===200)
      {
        return data.json().then((a)=>{
          var response = a;
          if(response && data.status === 200)
          {
            var wordData = response.definitions[0]
            //console.log(wordData);
            var definition = wordData.description
            var lexCat = wordData.wordtype
            this.setState({
              word : this.state.text,
              definition : definition,
              lexCat : lexCat
            })
            //console.log(this.state)
          }
          else
          {
            this.setState({
              word : this.state.text,
              definition : "This word cannot be located\nCheck the spelling and try again"
            })
          }
        })
      }
      else
      {
        this.setState({
          word : this.state.text,
          definition : "This word cannot be located\nCheck the spelling and try again"
        })
      }
    })
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