import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { Image } from 'react-native-elements';
import React, { Component } from 'react';


export default class Goals extends Component {

    state = { StepNumber: '', errorMessage: null }

    _onPressButton() {
        alert('You set your step goal!')
        fetch('http://10.7.107.91:3000/SetStepGoal', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                StepNumber: this.state.StepNumber
            }),
        });
      }
      

    render() {

        return (
        <View>
            <Text style={styles.text}>Set Step Goal
            </Text>
        <TextInput
            // secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="   10,000"
            onChangeText={StepNumber => this.setState({ StepNumber })}
            value={this.state.StepNumber}
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
