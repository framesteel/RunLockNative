// Login.js
import React from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { Image } from 'react-native-elements';
export default class Login extends React.Component {
    static navigationOptions = {
      header: null
    }
    state = { email: '', password: '', errorMessage: null }  

    render() {
      var crap = this.state;
      async function signin() {
        if (crap.email!='' && crap.password!=''){
        try {
          await auth().signInWithEmailAndPassword(crap.email, crap.password);
        } catch (e) {
          alert(e.message)
        }}
        else {
          alert('Dont leave these boxes empty, bro')
        }
      }
      return (
        <View style={styles.container}>
          <Image source={{uri: 'https://i.postimg.cc/TwZrZrVW/logo.png'}} style={styles.logo}/>
          <Text>Login</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <View style={{width: 10, height: 10}}/>
          <Button 
            title="Login" 
            onPress={() => signin()} 
            style={styles.Button}/>
            <View style={{width: 10, height: 10}}/>
          <Button
            title="Don't have an account? Sign Up"
            onPress={() => this.props.navigation.navigate('SignUp')}
            style={styles.Button}/>
        </View>
      )
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
      marginTop: 8
    },
    Button: {
      paddingTop: 15
    },
    logo: {
      height: 250,
      width: 235,
      padding: 15,
      margin: 15
    }
  })