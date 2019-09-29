import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Charities from '../screens/charities';
import Banks from '../screens/BankScreen';
import CurrentBank from '../screens/CurrentBankInfo';
import Goals from '../screens/setGoals.js';
import Money from '../screens/DepositMoney';
import TabBarIcon from '../components/TabBarIcon';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Charities: Charities,
    Banks: Banks,
    Goals: Goals,
    Money: Money,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Progress',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-stats' : 'md-stats'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    CurrentBank: CurrentBank,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Balance',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-card' : 'md-card'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  
  LinksStack,
  HomeStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
