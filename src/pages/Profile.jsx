/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {authLogout} from '../redux/action/auth';
import {getUserById} from '../redux/action/user';
import {useFocusEffect} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';

const Profile = ({route, navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);

  const data = user.data.id;

  // useEffect(() => {
  //   dispatch(getUserById(data));
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getUserById(data));
    }, []),
  );

  // NOT SOLVE NEED IMPROVE

  console.log(data);

  return (
    <View style={styles.body}>
      {/* Profile */}
      <View style={styles.profile}>
        {user.isSuccess && user.data ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '95%',
              // backgroundColor: 'red',
              marginHorizontal: 30,
            }}>
            {user?.data?.data.profile_picture ? (
              <Image
                source={{uri: user?.data?.data.profile_picture}}
                style={{
                  width: 120,
                  height: 120,
                  marginBottom: 20,
                  borderRadius: 100,
                }}
              />
            ) : (
              <Image
                source={require('../../assets/picture/3.jpg')}
                style={{
                  width: 120,
                  height: 120,
                  marginBottom: 20,
                  borderRadius: 100,
                }}
              />
            )}
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                fontFamily: 'Poppins-SemiBold',
              }}>
              {user?.data?.data.full_name}
            </Text>
          </View>
        ) : (
          // Loading
          <ActivityIndicator
            size={50}
            color="#EFC81A"
            style={{paddingTop: 30}}
          />
        )}
        <View
          style={{
            backgroundColor: 'white',
            height: '10%',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        />
      </View>

      {/* List Fitur */}
      <View style={styles.list}>
        {/* Edit Profile */}
        <View style={{marginVertical: 2}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EditProfile', {id: user?.data?.id})
            }>
            <View
              style={{
                height: 60,
                // backgroundColor: 'red',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 15,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="person-outline" color="black" size={25} />
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 15,
                    color: 'black',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Edit Profile
                </Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                color="black"
                size={25}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.line} />

        {/* My Recipe */}
        <View style={{marginVertical: 2}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MyRecipe', {user_id: user?.data?.data.id})
            }>
            <View
              style={{
                height: 60,
                // backgroundColor: 'red',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 15,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="book-outline" color="black" size={25} />
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 15,
                    color: 'black',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  My Recipe
                </Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                color="black"
                size={25}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.line} />

        {/* Saved Recipe */}
        <View style={{marginVertical: 2}}>
          <TouchableOpacity>
            <View
              style={{
                height: 60,
                // backgroundColor: 'red',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 15,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="bookmark-outline" color="black" size={25} />
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 15,
                    color: 'black',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Saved Recipe
                </Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                color="black"
                size={25}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.line} />

        {/* Liked Recipe */}
        <View style={{marginVertical: 2}}>
          <TouchableOpacity>
            <View
              style={{
                height: 60,
                // backgroundColor: 'red',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 15,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="heart-outline" color="black" size={25} />
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 15,
                    color: 'black',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Liked Recipe
                </Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                color="black"
                size={25}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.line} />

        {/* Logout */}
        <View style={{marginVertical: 2}}>
          <TouchableOpacity onPress={() => dispatch(authLogout())}>
            <View
              style={{
                height: 60,
                // backgroundColor: 'red',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 15,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="exit-outline" color="#c91111" size={25} />
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 15,
                    color: '#c91111',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Logout
                </Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                color="#c91111"
                size={25}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    flex: 1,
  },
  profile: {
    height: '50%',
    backgroundColor: '#EFC81A',
    flexDirection: 'column',
  },
  list: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  line: {
    height: 0.5,
    backgroundColor: '#e9e9e9',
    marginHorizontal: 15,
  },
});
