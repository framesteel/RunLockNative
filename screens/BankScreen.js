import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { Image } from 'react-native-elements';
import React, { Component } from 'react';


export default class Banks extends Component {

  state = { Routing: '', Account: '', errorMessage: null }

    _onPressButton() {
        alert('You submitted your bank information!')
        fetch('http://10.7.107.91:3000/SetBankInfo', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                RoutingNumber: this.state.Routing,
                AccountNumber: this.state.Account
            }),
        });
      }


    render() {

        return (
        <View>
            <Text style={styles.text}>Routing: 
            </Text>
        <TextInput
            // secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="   123456789"
            onChangeText={Routing => this.setState({ Routing })}
            value={this.state.Routing}
          />

          <Text style={styles.text} >Account: </Text>
        <TextInput
            // secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="    123456789"
            onChangeText={Account => this.setState({ Account })}
            value={this.state.Account}
          />
        
            
        <View style={styles.buttonContainer}>
            <Button
              onPress={() => this._onPressButton()}
              title="Submit"
              color="#0000FF"
            />
        </View>

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
