import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { Image } from 'react-native-elements';
import React, { Component } from 'react';


export default class BankInfo extends Component {
    _onPressButton() {
        alert('You submitted your bank information!')
      }
    state = { Routing: '', Account: '', errorMessage: null }

    getAccount() {
        return fetch('http://10.7.107.91:3000/GetAccountNumber')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({account: responseJson})
        })
        .catch((error) =>{
          alert(error);
        });
      }

      getRouting() {
        return fetch('http://10.7.107.91:3000/GetRoutingNumber')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({routing: responseJson})
        })
        .catch((error) =>{
          alert(error);
        });
      }

      componentDidMount() {
        this.getAccount();
        this.getRouting();
      }

    render() {
        var account = this.state.account
        var routing = this.state.routing

        return (
        <View style={styles.container}>
            <Text style={styles.text}>Routing</Text>
          <Text style={styles.textNum} > {routing} </Text>
        

          <Text style={styles.text} >Account </Text>
          <Text style={styles.textNum} > {account} </Text>

</View>

         

        );
        }
        }



        const styles = StyleSheet.create({
            container: {
              flex: 1,
              justifyContent: 'center',
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
              marginTop: "10%",
              fontSize: 30,
              fontStyle: "normal"
            },
            textNum:  {
                marginTop: "5%",
                fontSize: 20,
                fontStyle: "normal"
              },
            buttonContainer: {
                margin: 20,
                borderColor: 'gray',
            }
          })
