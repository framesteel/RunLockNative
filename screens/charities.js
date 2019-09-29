import { ScrollView, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Image } from 'react-native-elements';
import React, { Component } from 'react';


export default class Charities extends Component {
    _onPressButton() {
      alert('You selected an organization to donate to!')
    }


    render() {
        return (
<View>
<ScrollView style={styles.scrollView}>

<View style={styles.container}>

<TouchableHighlight onPress={this._onPressButton}>
      <Image
        style={styles.button}
        source={{ uri: "http://ww5.komen.org/uploadedImages/_Komen/_Configuration_Settings/og-logo2.png" }}
      />
    </TouchableHighlight>

    <TouchableHighlight onPress={this._onPressButton}>
      <Image
        style={styles.button}
        source={{ uri: "https://985thesportshub.com/wp-content/uploads/sites/88/2019/06/American-Red-Cross-Logo.jpg" }}
      />
    </TouchableHighlight>

    <TouchableHighlight onPress={this._onPressButton}>
      <Image
        style={styles.button}
        source={{ uri: "https://pbs.twimg.com/profile_images/877163494491262976/MDatx4PJ.jpg" }}
      />
    </TouchableHighlight>

    <TouchableHighlight onPress={this._onPressButton}>
      <Image
        style={styles.button}
        source={{ uri: "https://shop.peta.org/media/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/p/t/pta10072.jpg" }}
      />
    </TouchableHighlight>

    <TouchableHighlight onPress={this._onPressButton}>
      <Image
        style={styles.button}
        source={{ uri: "https://pbs.twimg.com/profile_images/887043027868536832/uw7gOmkU_400x400.jpg" }}
      />
    </TouchableHighlight>

    <TouchableHighlight onPress={this._onPressButton}>
      <Image
        style={styles.button}
        source={{ uri: "http://oceana.org/sites/default/files/oceana_logo_o.png" }}
      />
    </TouchableHighlight>
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
   justifyContent: 'space-between',
   alignItems: 'center',

  },
  buttonContainer: {
    margin: 20
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
    height: 200
  },
  scrollView: {
    // backgroundColor: 'pink',
    // marginHorizontal: 20,
  },
});