// SignUp.js
import React from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { Image } from 'react-native-elements';
export default class SignUp extends React.Component {
    static navigationOptions = {
      header: null
    }
    state = { email: '', password: '', errorMessage: null }
    nextStep() {
      if (this.state.email!='' && this.state.password.length>5){
      this.props.navigation.navigate('Bank', {
        password: this.state.password,
        email: this.state.email
      })
    }
    else {
      alert('Dont leave these boxes empty, bro')
    }
  }
    render() {
      return (
        <View style={styles.container}>
          <Image source={{uri: 'https://i.postimg.cc/TwZrZrVW/logo.png'}} style={styles.logo}/>
          <Text>Sign Up</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <View style={{width: 10, height: 10}}/>
          <Button title="Continue" onPress={() => this.nextStep()} />
          <View style={{width: 10, height: 10}}/>
          <Button
            title="Already have an account? Login"
            onPress={() => this.props.navigation.navigate('Login')}
          />
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
    logo: {
      height: 250,
      width: 235,
      padding: 15,
      margin: 15
    }
  })