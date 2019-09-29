import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { Image } from 'react-native-elements';
import React, { Component } from 'react';


export default class Money extends Component {

    state = { Amount: '', errorMessage: null }

    _onPressButton() {
        alert('You just deposited money!')
        fetch('http://10.7.107.91:3000/Deposit', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Amount: this.state.Amount
            }),
        });
      }
      

    render() {

        return (
        <View>
            <Text style={styles.text}>Deposit Amount
            </Text>
        <TextInput
            // secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="   $10"
            onChangeText={Amount => this.setState({ Amount })}
            value={this.state.Amount}
          />
        
            
        <View style={styles.buttonContainer}>
            <Button
              onPress={() => this._onPressButton()}
              title="Submit"
              color="blue"
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
