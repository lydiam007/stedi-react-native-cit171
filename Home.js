import React from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icons from './Icons.js';
import Bar  from './Bar.js';

const Home = (props) => {
  const [userName, setUserName] = useState (props.userName)
  return (
    <View>
      <Bar />
      <Text>{props.userName}</Text>
      <Icons />
    </View>
  );
};

export default Home;
