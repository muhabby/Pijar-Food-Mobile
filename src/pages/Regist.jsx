/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authRegist} from '../redux/action/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Regist = ({navigation}) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const auth = useSelector(state => state.auth);
  const [inputData, setInputData] = useState({
    full_name: '',
    email: '',
    password: '',
  });

  const onChange = (key, value) => {
    setInputData({...inputData, [key]: value});
  };

  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView style={styles.body}>
      {/* Image */}
      <ImageBackground
        source={require('../../assets/picture/4.png')}
        resizeMode="cover"
        style={styles.image}>
        <View
          style={{
            backgroundColor: 'white',
            height: '10%',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        />
      </ImageBackground>

      {/* Form */}
      <View style={styles.form}>
        <View>
          {/* Title */}
          <View style={{marginTop: 15}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                color: '#EFC81A',
                fontFamily: 'Poppins-Medium',
              }}>
              Welcome!
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 17,
                color: 'black',
                fontFamily: 'Poppins-Medium',
              }}>
              Register free account
            </Text>
          </View>

          {/* Email */}
          <View style={{marginTop: 30, paddingHorizontal: 10}}>
            {/* Name Bar */}
            <View style={{alignItems: 'center'}}>
              <View style={styles.searchBar}>
                <Ionicons name="person-outline" color="#EFC81A" size={25} />
                <TextInput
                  onChangeText={newValue => onChange('full_name', newValue)}
                  style={styles.searchInput}
                  placeholder="Name"
                  placeholderTextColor="#C4C4C4"
                />
              </View>
            </View>

            {/* Email Bar */}
            <View style={{alignItems: 'center', marginTop: 15}}>
              <View style={styles.searchBar}>
                <Ionicons name="mail-outline" color="#EFC81A" size={25} />
                <TextInput
                  onChangeText={newValue => onChange('email', newValue)}
                  style={styles.searchInput}
                  placeholder="Email"
                  placeholderTextColor="#C4C4C4"
                />
              </View>
            </View>

            {/* Password Bar */}
            <View style={{alignItems: 'center', marginTop: 15}}>
              <View style={styles.searchBar}>
                <Ionicons
                  name="lock-closed-outline"
                  color="#EFC81A"
                  size={25}
                />
                <TextInput
                  onChangeText={newValue => onChange('password', newValue)}
                  secureTextEntry={!showPassword}
                  style={styles.searchInput}
                  placeholder="Password"
                  placeholderTextColor="#C4C4C4"
                />
                <TouchableOpacity onPress={PasswordVisibility}>
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    color="#EFC81A"
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <View style={{alignItems: 'center', marginTop: 15}}>
              <TouchableHighlight
                underlayColor={'#b89b1a'}
                style={styles.LoginButton}
                onPress={() => dispatch(authRegist(inputData))}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 16,
                    color: 'white',
                  }}>
                  Register
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>

        {/* Already have an account? */}
        <View style={{flexDirection: 'row', paddingVertical: 40}}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 15,
              color: 'grey',
              textAlign: 'right',
            }}>
            Already have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{marginLeft: 10}}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 15,
                color: '#EFC81A',
                textAlign: 'right',
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    flex: 1,
  },
  image: {
    height: 250,
    backgroundColor: '#EFC81A',
    justifyContent: 'flex-end',
  },
  form: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  searchBar: {
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 5,
    height: 60,
    width: '100%',
    borderRadius: 15,
  },
  searchInput: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    height: 50,
    width: '77%',
    color: 'black',
    marginLeft: 15,
    paddingTop: 15,
    textAlignVertical: 'center',
  },
  LoginButton: {
    height: 50,
    width: '100%',
    backgroundColor: '#EFC81A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 20,
  },
});

export default Regist;
