import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { Image } from 'react-native-elements';
import React, { Component } from 'react';


export default class Banks extends Component {
    _onPressButton() {
        alert('You submitted your bank information!')
      }
    state = { Routing: '', Account: '', total: '0'}
    getTotal() {
      return fetch('http://10.7.107.91:3000/AccountTotal')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({total: responseJson})
      })
      .catch((error) =>{
        alert(error);
      });
    }

    componentDidMount() {
      this.getTotal();
    }

    render() {
      var total = this.state.total
        return (
        <View style={styles.container}>
            <Text style={styles.text}>Balance: ${total}
            </Text>  
            <View style={{width: 10, height: 10}}/>
            <Button title='Update Balance' color='blue' onPress={() => this.getTotal()}/>          
        <View style={styles.buttonContainer}>
        </View>
     

        <View>
            <Text style={styles.text}>Bank Account
            </Text>  
            <View style={{width: 10, height: 10}}/>
            <Button title='View Bank Info' color='blue' onPress={() => this.props.navigation.navigate("CurrentBank")}/>          
        <View style={styles.buttonContainer}>
        </View>
        </View>
  

</View>

         

        );
        }
        }



        const styles = StyleSheet.create({
            container: {
              flex: 1,
              // justifyContent: 'center',
              alignItems: 'center'
            },
            textInput: {
              height: 40,
              width: '90%',
              borderColor: 'gray',
              borderWidth: 1,
              marginTop: "2%",
              marginLeft: "5%"
            },
            text:  {
              // justifyContent: 'center',
              marginTop: "5%",
              marginLeft: "5%",
              fontSize: 30,
              fontStyle: "normal"
            },
            buttonContainer: {
                margin: 20,
                marginTop: "5%",
                borderColor: 'gray',
            }
          })
