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
  PermissionsAndroid,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clearErrorUpdateUsers, updateUsers} from '../redux/action/users';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import {useFocusEffect} from '@react-navigation/native';
import {getUsers} from '../redux/action/users';

const EditProfile = ({route, navigation}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const usersDetail = useSelector(state => state.users_detail);
  const users_update = useSelector(state => state.users_update);
  const [photo, setPhoto] = useState(null);
  const [inputData, setInputData] = useState({
    full_name: '',
    email: '',
    password: '',
  });

  const photoData = photo
    ? {
        uri: photo.uri,
        name: photo.fileName,
        type: photo.type,
      }
    : usersDetail?.data?.photo
    ? {
        uri: usersDetail?.data?.photo,
        name: 'photo',
        type: 'image/jpeg',
      }
    : null;

  const id = auth.data.data.id;

  const updateData = async () => {
    let bodyData = new FormData();
    bodyData.append('full_name', inputData.full_name);
    bodyData.append('email', inputData.email);
    bodyData.append('password', inputData.password);
    bodyData.append('profile_picture', photoData);

    dispatch(updateUsers(bodyData, navigation));
  };

  // useEffect(() => {
  //   dispatch(getUserById(data));
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getUsers(id));
      dispatch(clearErrorUpdateUsers());
    }, [dispatch, id]),
  );

  const onChange = (key, value) => {
    setInputData({...inputData, [key]: value});
  };

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'this app need camera permission',
          buttonPositive: 'Oke',
          buttonNegative: 'Decline',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('success camera permission');
      } else {
        console.log('failed camera permission');
        console.log(PermissionsAndroid.RESULTS.GRANTED);
      }
    } catch (err) {
      console.log('failed camera permission');
      console.log(PermissionsAndroid.RESULTS.GRANTED);
    }
  };

  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, res => {
      console.log('response camera ', res);
      if (res.didCancel) {
        console.log('user cancel camera');
      } else if (res.error) {
        console.log('camera error', res.errorMessage);
      } else {
        console.log('camera success');
        console.log(res);
        setPhoto(res.assets[0]);
      }
    });
  };

  const galleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, res => {
      console.log('response gallery ', res);
      if (res.didCancel) {
        console.log('user cancel gallery');
      } else if (res.error) {
        console.log('gallery error', res.errorMessage);
      } else {
        console.log('gallery success');
        console.log(res);
        setPhoto(res.assets[0]);
      }
    });
  };

  const deletePhoto = () => {
    setPhoto(null);
  };

  return (
    <View style={styles.body}>
      {usersDetail?.data ? (
        <ScrollView>
          <View>
            {/* Image */}
            {photo ? (
              <ImageBackground
                source={{uri: photo.uri}}
                resizeMode="cover"
                style={styles.image}>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: '5%',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                  }}
                />
              </ImageBackground>
            ) : (
              <ImageBackground
                source={{uri: usersDetail?.data?.profile_picture}}
                resizeMode="cover"
                style={styles.image}>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: '5%',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                  }}
                />
              </ImageBackground>
            )}

            {/* Form */}
            <View style={styles.form}>
              <View style={{paddingHorizontal: 10}}>
                {/* Photo */}
                <View style={{alignItems: 'center'}}>
                  {photo ? (
                    <View style={styles.inputColumnBar}>
                      <Ionicons
                        name="image-outline"
                        color="#EFC81A"
                        size={25}
                      />
                      <Text
                        onChangeText={newValue => onChange('email', newValue)}
                        style={{
                          fontFamily: 'Poppins-Medium',
                          fontSize: 13,
                          color: 'black',
                          height: 50,
                          width: '73%',
                          marginLeft: 15,
                          paddingTop: 15,
                          alignItems: 'center',
                        }}>
                        {photo.fileName.length > 20
                          ? photo.fileName.substring(0, 20) + '...'
                          : photo.fileName}
                      </Text>
                      <TouchableOpacity
                        onPress={deletePhoto}
                        style={{
                          height: 35,
                          width: 40,
                          backgroundColor: '#ee5e5e',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 10,
                        }}>
                        <Ionicons
                          name="close-outline"
                          color="white"
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.inputColumnBar}>
                      <Ionicons
                        name="image-outline"
                        color="#EFC81A"
                        size={25}
                      />
                      <Text
                        onChangeText={newValue => onChange('email', newValue)}
                        style={{
                          fontFamily: 'Poppins-Medium',
                          fontSize: 13,
                          color: '#C4C4C4',
                          height: 50,
                          width: '73%',
                          marginLeft: 15,
                          paddingTop: 15,
                          alignItems: 'center',
                        }}>
                        Photo
                      </Text>
                      <TouchableOpacity
                        onPress={() => galleryLaunch()}
                        style={{
                          height: 35,
                          width: 40,
                          backgroundColor: '#EFC81A',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 10,
                        }}>
                        <Ionicons
                          name="share-outline"
                          color="white"
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {/* Full Name */}
                <View style={{alignItems: 'center', marginTop: 15}}>
                  <View style={styles.inputColumnBar}>
                    <Ionicons name="person-outline" color="#EFC81A" size={25} />
                    <TextInput
                      onChangeText={newValue => onChange('full_name', newValue)}
                      style={styles.inputBar}
                      placeholder="Name"
                      placeholderTextColor="#C4C4C4"
                      defaultValue={usersDetail?.data?.full_name}
                    />
                  </View>
                </View>

                {/* Email */}
                <View style={{alignItems: 'center', marginTop: 15}}>
                  <View style={styles.inputColumnBar}>
                    <Ionicons name="mail-outline" color="#EFC81A" size={25} />
                    <TextInput
                      onChangeText={newValue => onChange('email', newValue)}
                      style={styles.inputBar}
                      placeholder="Email"
                      placeholderTextColor="#C4C4C4"
                      defaultValue={usersDetail?.data?.email}
                    />
                  </View>
                </View>

                {/* Update Button */}
                <View style={{alignItems: 'center'}}>
                  <TouchableHighlight
                    underlayColor={'#b89b1a'}
                    style={styles.updateButton}
                    onPress={() => dispatch(updateData(inputData))}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Medium',
                        fontSize: 16,
                        color: 'white',
                      }}>
                      Update
                    </Text>
                  </TouchableHighlight>
                </View>

                {users_update.isError ? (
                  <View style={{alignItems: 'center'}}>
                    <View style={styles.errorAlert}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Medium',
                          fontSize: 12,
                          color: '#d85730',
                        }}>
                        {users_update.errorMessage ?? ' - '}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        // Loading
        <ActivityIndicator size={50} color="#EFC81A" style={{flex: 1}} />
      )}
      <Modal
        transparent={true}
        animationType="none"
        visible={users_update?.isLoading}
        onRequestClose={() => {}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <ActivityIndicator size={50} color="#EFC81A" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    flex: 1,
  },
  image: {
    height: 300,
    backgroundColor: '#EFC81A',
    justifyContent: 'flex-end',
  },
  form: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    flex: 1,
    marginTop: 30,
  },
  inputColumnBar: {
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 5,
    height: 60,
    width: '100%',
    borderRadius: 15,
  },
  inputBar: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    height: 50,
    width: '77%',
    color: 'black',
    marginLeft: 15,
    paddingTop: 15,
    textAlignVertical: 'center',
  },
  updateButton: {
    height: 50,
    width: '100%',
    backgroundColor: '#EFC81A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 20,
  },
  errorAlert: {
    height: 50,
    width: '100%',
    // backgroundColor: '#d85730',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 15,
  },
});

export default EditProfile;
