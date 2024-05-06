/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image} from 'react-native';
import React from 'react';

const Chat = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
      <Image
        source={require('../../assets/picture/2.png')}
        style={{width: 200, height: 200}}
      />
      <Text
        style={{
          fontSize: 22,
          color: '#EFC81A',
                  fontFamily: 'Poppins-Medium',
          marginTop: 20,
        }}>
        Coming Soon
      </Text>
    </View>
  );
};

export default Chat;
