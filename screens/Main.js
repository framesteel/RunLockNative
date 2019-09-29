// Main.js
import { Accelerometer } from 'expo-sensors';
import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';

export default class Main extends React.Component {
    state = { currentUser: null,
      total: 0,
      accelAvail: 'checking',
      accelerometerData: {},
      accelerometerQueue: [],
      count: 0,
      currTotal: 0,
      currDiff: 0,
      totSteps: 0,
      resetCnt: 0,
      cooldown: false }
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
      this._toggle();
    }
  
    componentWillUnmount() {
      this._unsubscribe();
    }
  
    _toggle = () => {
      if (this._subscription) {
        this._unsubscribe();
      } else {
        this._subscribe();
      }
    };
    
    _slow = () => {
      Accelerometer.setUpdateInterval(333);
    };
  
    _fast = () => {
      Accelerometer.setUpdateInterval(333);
    };
  
    _subscribe = () => {
      Accelerometer.setUpdateInterval(333);
      this._subscription = Accelerometer.addListener(accelerometerData => {
        this.setState({ accelerometerData });
        let { x, y, z } = accelerometerData;
        /*let count = this.state.count
        let ph = this.state.accelerometerQueue
        var valueSum = 0;
        var oldTotal = this.state.currTotal;
        var phdiff = 0;
        
        var resetCnt = this.state.resetCnt;
        steps=steps+1;
        this.setState({totSteps: steps})*/
        var oldTotal = this.state.currTotal;
        let sum = Math.abs(x) + Math.abs(y) + Math.abs(z) - 1;
        let diff = oldTotal-sum;
        this.setState({currDiff: diff})
        this.setState({currTotal: sum})
        var steps = this.state.totSteps;
        var cooldown = this.state.cooldown;
        if (Math.abs(diff)>0.15 && cooldown==false){
          steps=steps+1
          cooldown = true
        }
        else {
          cooldown = false
        }
        this.setState({totSteps: steps, cooldown: cooldown})
        
        /*if (ph.length<6){
          ph.push(Math.abs(x) + Math.abs(y) + Math.abs(z) - 1);
        }
        else {
          ph.shift();
          ph.push(Math.abs(x) + Math.abs(y) + Math.abs(z) - 1);
        }
        if (count<6){
          count=count+1;
        }
        else {
          for (var i in ph){
            valueSum+=ph[i]
          }
          resetCnt = resetCnt + 1;
          phdiff = oldTotal - valueSum;
          this.setState({currTotal: valueSum, currDiff: phdiff, resetCnt: resetCnt})
          count=0;
        }
        this.setState({accelerometerQueue: ph, count: count})*/
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
  
    _unsubscribe = () => {
      this._subscription && this._subscription.remove();
      this._subscription = null;
    };

    alertAccelQueue() {
      alert(this.state.accelerometerQueue)
    }
    render() {
      //const [user] = this.useState();
      async function signOut() { 
        try {
          await auth().signOut();
        } catch (e) {
          console.error(e.message);
        }
      }
      let { x, y, z } = this.state.accelerometerData;
      var total = this.state.total;
      var valueSum = this.state.currTotal;
      var currDiff = this.state.currDiff;
      var steps = this.state.totSteps;
      var resetCnt = this.state.resetCnt;
      return (
        <View style={styles.container}>
          <Text>
            Hi {this.props.user.email}!
          </Text>
          <Button title="Logout" onPress={() => signOut()} />
          <Button title="Get Total" onPress={() => this.getTotal()} />
          <Button title="Alert Queue" onPress={() => this.alertAccelQueue()} />
          <Text>{total}</Text>
          <View style={styles.sensor}>
            <Text>Accelerometer:</Text>
            <Text>
              x: {round(x)} y: {round(y)} z: {round(z)}
            </Text>
            <Text>
              {valueSum}
            </Text>
            <Text>
              difference: {currDiff}
            </Text>
            <Text>
              steps: {steps}
            </Text>
            <Text>
              {resetCnt}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this._toggle} style={styles.button}>
                <Text>Toggle</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>
                <Text>Slow</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._fast} style={styles.button}>
                <Text>Fast</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/*<Button title="Get Steps" onPress={() => this.getSteps()} />*/}
        </View>
      )
    }
  }
  function round(n) {
    if (!n) {
      return 0;
    }
  
    return Math.floor(n * 10000) / 10000;
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'stretch',
      marginTop: 15,
    },
    button: {
      flex: 1,
      width: 100,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eee',
      padding: 10,
    },
    middleButton: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: '#ccc',
    },
    sensor: {
      marginTop: 45,
      paddingHorizontal: 10,
    },
  })