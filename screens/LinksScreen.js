import { StyleSheet, Button, Text, View, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import React, { Component } from 'react';
import { Accelerometer } from 'expo-sensors';

export default class Banks extends Component {

    state = { CurrentStep: '', StepGoal: '', errorMessage: null,
      accelAvail: 'checking',
      accelerometerData: {},
      count: 0,
      currTotal: 0,
      currDiff: 0,
      totSteps: 0,
      cooldown: false,
      Amount: '',
      errorMessage: null }
       
    getStepGoal() {
      return fetch('http://10.7.107.91:3000/GetStepGoal')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({StepGoal: responseJson})
      })
      .catch((error) =>{
        alert(error);
      });
    }
    getSteps() {
      return fetch('http://10.7.107.91:3000/GetStepTotal')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({totSteps: responseJson})
      })
      .catch((error) =>{
        alert(error);
      });
    }
    updateSteps() {
      fetch('http://10.7.107.91:3000/SetStepTotal', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                StepTotal: this.state.totSteps,
            }),
        });
    }
    _onPressButton() {
      if (this.state.totSteps>=this.state.StepGoal){
        alert('Congrats buddy, you acually got out of bed this week!')
      }
      else {
        alert('Money sent to charity! Better luck next time!')
      }
      this.setState({totSteps: 0})
      this.updateSteps()
      fetch('http://10.7.107.91:3000/SendToCharity', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Amount: "all"
          }),
      });
    }
    _subscribe = () => {
      Accelerometer.setUpdateInterval(333);
      this._subscription = Accelerometer.addListener(accelerometerData => {
        this.setState({ accelerometerData });
        let { x, y, z } = accelerometerData;
        var oldTotal = this.state.currTotal;
        let sum = Math.abs(x) + Math.abs(y) + Math.abs(z) - 1;
        let diff = oldTotal-sum;
        this.setState({currDiff: diff})
        this.setState({currTotal: sum})
        var steps = this.state.totSteps;
        var cooldown = this.state.cooldown;
        var updateCount = this.state.updateCount;
        
        if (updateCount<25){
          updateCount=updateCount+1
          this.setState({updateCount: updateCount})
        }
        else {
          updateCount=0
          this.setState({updateCount: updateCount})
          this.updateSteps()
        }
        if (Math.abs(diff)>0.15 && cooldown==false){
          steps=steps+1
          cooldown = true
        }
        else {
          cooldown = false
        }
        this.setState({totSteps: steps, cooldown: cooldown})
      });
      Accelerometer.isAvailableAsync().then(
        result => {
          this.setState({
            accelAvail: String(result)
          });
        },
        error => {
          this.setState({
            accelAvail: "Could not get isAccelerometerAvailable: " + error
          });
        }
      );
    };
    _toggle = () => {
      if (this._subscription) {
        this._unsubscribe();
      } else {
        this._subscribe();
      }
    };
    _unsubscribe = () => {
      this._subscription && this._subscription.remove();
      this._subscription = null;
    };

    componentDidMount() {
      this.getStepGoal();
      this.getSteps();
      this._toggle();
    }
    componentWillUnmount() {
      this._unsubscribe();
    }

    render() {
      var StepGoal = this.state.StepGoal
        var steps = this.state.totSteps
        return (
        <View style={styles.container}>
            <Text style={styles.text}>Current Steps
            </Text>
            <Text style={styles.text}>{steps}
            </Text>
          <Text style={styles.text} >Step Goal</Text>
          <Text style={styles.text}>{StepGoal}
          </Text>
          <View style={{width: 10, height: 10}}/>
          <Button title='Update Goal' color='blue' onPress={() => this.getStepGoal()}/>          
        <View style={styles.buttonContainer}>
        
        
          
        <View style={styles.buttonContainer}>
            <Button
              onPress={() => this._onPressButton()}
              title="Time's up!"
              color="blue"
            />
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
              marginTop: "5%",
              marginLeft: "5%",
              fontSize: 30,
              fontStyle: "normal",
            },
            buttonContainer: {
                margin: 20,
                marginTop: "5%",
                borderColor: 'gray',
            }
          })
