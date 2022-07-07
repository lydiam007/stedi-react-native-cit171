import React from 'react';
import {useState} from 'react';
import { StyleSheet,  View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Counter from './Counter.js';
import SettingsScreen from './SettingsScreen.js';
import Home from './Home.js';
import Login from './Login.js';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import Icons from "./Icons";
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");//this creates a state variable to hold the username once logged in

  if(userLoggedIn){
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Home'
        activeColor='white'
        barStyle={{ backgroundColor: 'green' }}
      >
        <Tab.Screen
          name='Home'
          children={()=><Home loggedInUser={userName}/>}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='home' color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Step Counter'
          component={Counter}
          options={{
            tabBarLabel: 'Step Counter',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='watch' color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Settings'
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color }) => (
              <FontAwesome name='check' color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
  }
else{
  return(
    <View>
      <Login setUserLoggedIn={setUserLoggedIn}/>
    </View>
  )
}
}

const styles = StyleSheet.create({
  margin:{
    marginTop:10
  }
});