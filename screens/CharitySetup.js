import { ScrollView, View, StyleSheet, TouchableHighlight, Text, Button } from 'react-native';
import { Image } from 'react-native-elements';
import React, { Component } from 'react';
import auth from '@react-native-firebase/auth';

export default class Charities extends Component {
  static navigationOptions = {
    title: 'Select a Charity'
  }
    state = {charity: 'None', num: 0}
    _onPressButton(charity, num) {
        this.setState({charity: charity, num: num})
      alert('You have selected '+charity)
    }
    submitUser(){
        fetch('http://10.7.107.91:3000/SetDefaultCharity', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                CharityIndex: this.state.num,
                Email: this.props.navigation.state.params.email
            }),
        });
        fetch('http://10.7.107.91:3000/SetBankInfo', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                RoutingNumber: this.props.navigation.state.params.routing,
                AccountNumber: this.props.navigation.state.params.account,
                Email: this.props.navigation.state.params.email
            }),
        });
        try {
            auth().createUserWithEmailAndPassword(this.props.navigation.state.params.email, this.props.navigation.state.params.password);
          } catch (e) {
            alert(e.message)
          }
    }

    render() {
        var charity = this.state.charity;
        return (
<View> 
<View style={styles.buttonContainer}>
    <Button style={{width: '100%', height: 25}}title='Finish Account Setup' onPress={() => this.submitUser()}/>
    </View>
<ScrollView style={styles.scrollView}>
    
<View style={styles.container}>

<TouchableHighlight onPress={() => this._onPressButton('Susan Komen', 0)}>
      <Image
        style={styles.button}
        source={{ uri: "http://ww5.komen.org/uploadedImages/_Komen/_Configuration_Settings/og-logo2.png" }}
      />
    </TouchableHighlight>

    <TouchableHighlight onPress={() => this._onPressButton('Red Cross', 1)}>
      <Image
        style={styles.button}
        source={{ uri: "https://985thesportshub.com/wp-content/uploads/sites/88/2019/06/American-Red-Cross-Logo.jpg" }}
      />
    </TouchableHighlight>

    <TouchableHighlight onPress={() => this._onPressButton('Salvation Army', 2)}>
      <Image
        style={styles.button}
        source={{ uri: "https://pbs.twimg.com/profile_images/877163494491262976/MDatx4PJ.jpg" }}
      />
    </TouchableHighlight>

    <TouchableHighlight onPress={() => this._onPressButton('Peta', 3)}>
      <Image
        style={styles.button}
        source={{ uri: "https://shop.peta.org/media/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/p/t/pta10072.jpg" }}
      />
    </TouchableHighlight>

    <TouchableHighlight onPress={() => this._onPressButton('World Wildlife Fund', 4)}>
      <Image
        style={styles.button}
        source={{ uri: "https://pbs.twimg.com/profile_images/887043027868536832/uw7gOmkU_400x400.jpg" }}
      />
    </TouchableHighlight>

    <TouchableHighlight onPress={() => this._onPressButton('Oceana', 5)}>
      <Image
        style={styles.button}
        source={{ uri: "http://oceana.org/sites/default/files/oceana_logo_o.png" }}
      />
    </TouchableHighlight>
    <View style={{width: 10, height: 50}}/>
    </View>
    
    </ScrollView>
    
</View>


        );
        }


        }

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
    // margin: "5%",
   flexDirection: 'column',
   flexWrap: 'wrap',
   alignItems: 'center',
   width: '100%'
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    alignItems: 'center',
    // backgroundColor: '#DDDDDD',
    padding: 10, 
    width: 200,
    height: 200,
  },
  scrollView: {
    width: '100%'
    // backgroundColor: 'pink',
    // marginHorizontal: 20,
  },
  buttonContainer: {
    margin: 20,
    marginTop: "5%",
    borderColor: 'gray',
}
});