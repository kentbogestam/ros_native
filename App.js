import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,PermissionsAndroid,
} from 'react-native';
import { WebView } from 'react-native-webview';
import KeepAwake from 'react-native-keep-awake';
import Permissions from "react-native-permissions";
const screenWidth = Dimensions.get('screen').width;
 const runFirst = `
      window.isNativeApp = true;
      true; // note: this is required, or you'll sometimes get silent failures
    `;
function App() {
	 useEffect(async() => {
	const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: "Audio Permission",
    message:
      "App needs access to your audio / microphone",
    buttonNeutral: "Ask Me Later",
    buttonNegative: "Cancel",
    buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
    
  });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.container}>
        <WebView 
		startInLoadingState={true} 
		  originWhitelist={["*"]}
		   mediaPlaybackRequiresUserAction={false}
        domStorageEnabled={true}
       allowsInlineMediaPlayback={true}    
    javaScriptEnabled={ true } 
	useWebKit={true}
		source={{ uri: 'https://ros-dev.dastjar.com/' }}
		 allowUniversalAccessFromFileURLs={true}
		injectedJavaScriptBeforeContentLoaded={runFirst}
		/>
      </View>
	  <KeepAwake/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  }
  
});

export default App;
