import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login.js';
import SignUp from '../screens/SignUp.js';
import BankScreen from '../screens/BankSetup';
import Charities from '../screens/CharitySetup';
const LoginNav = createStackNavigator({
    Login: {
        screen: Login,
    },
    SignUp: {
        screen: SignUp
    },
    Bank: {
        screen: BankScreen
    },
    Charity: {
        screen: Charities
    }
})

export default createAppContainer(LoginNav)