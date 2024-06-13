/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {postMenu} from '../redux/action/menu';
import {clearErrorPostMenu} from '../redux/action/menu';
import {useFocusEffect} from '@react-navigation/native';

const AddMenu = ({navigation}) => {
  const dispatch = useDispatch();
  const menu_post = useSelector(state => state.menu_post);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [photo, setPhoto] = useState('');
  const [inputData, setInputData] = useState({
    title: '',
    ingredient: '',
    category_id: '',
  });

  useFocusEffect(
    React.useCallback(() => {
      dispatch(clearErrorPostMenu());
    }, [dispatch]),
  );

  const postData = async () => {
    let bodyData = new FormData();
    bodyData.append('title', inputData.title);
    bodyData.append('ingredient', inputData.ingredient);
    bodyData.append('category_id', inputData.category_id);
    bodyData.append('photo', {
      uri: photo.uri,
      name: photo.fileName,
      type: photo.type,
    });

    dispatch(postMenu(bodyData, navigation));
  };

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
      <ScrollView>
        {/* Title */}
        <Text style={styles.title}>Add Your Recipe</Text>

        {/* Input Title */}
        <View style={styles.inputTitleBar}>
          <Ionicons
            name="book-outline"
            color="#aaaaaa"
            size={25}
            style={{marginRight: 15}}
          />
          <TextInput
            onChangeText={newValue => onChange('title', newValue)}
            style={styles.inputTitle}
            placeholder="Title "
            placeholderTextColor="#aaaaaa"
          />
        </View>

        {/* Input Ingredient */}
        <TextInput
          onChangeText={newValue => onChange('ingredient', newValue)}
          style={[styles.inputIngredient]}
          multiline={true}
          placeholder="Ingredient"
          placeholderTextColor="#aaaaaa"
        />

        {/* Input Photo */}
        <View
          style={{
            height: 340,
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 15,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={[styles.inputPhoto]}>
            {photo ? (
              <View>
                <Image
                  style={{
                    height: 150,
                    width: 250,
                    borderRadius: 10,
                    marginVertical: 10,
                  }}
                  source={{uri: photo.uri}}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      width: '70%',
                      fontFamily: 'Poppins-Medium',
                      fontSize: 15,
                      color: '#464646',
                    }}>
                    {photo.fileName.length > 15
                      ? photo.fileName.substring(0, 15) + '...'
                      : photo.fileName}
                  </Text>
                  <TouchableOpacity
                    onPress={deletePhoto}
                    style={{
                      height: 30,
                      width: 40,
                      backgroundColor: '#ee5e5e',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}>
                    <Ionicons name="close-outline" color="white" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  name="image-outline"
                  color="#aaaaaa"
                  size={25}
                  style={{marginRight: 15}}
                />
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 15,
                    color: '#aaaaaa',
                  }}>
                  Add Photo
                </Text>
              </View>
            )}
          </View>
          <View
            style={{
              width: '85%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <TouchableHighlight
              onPress={() => galleryLaunch()}
              underlayColor={'#b89b1a'}
              style={{
                height: 50,
                width: 140,
                backgroundColor: '#EFC81A',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: '60%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Ionicons name="image-outline" color="white" size={20} />
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 14,
                    color: 'white',
                    marginTop: 3,
                  }}>
                  Gallery
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => cameraLaunch()}
              underlayColor={'#b89b1a'}
              style={{
                height: 50,
                width: 140,
                backgroundColor: '#EFC81A',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: '65%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Ionicons name="camera-outline" color="white" size={20} />
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 14,
                    color: 'white',
                    marginTop: 3,
                  }}>
                  Camera
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>

        {/* Input Category */}
        <View style={styles.inputCategory}>
          <Picker
            selectedValue={selectedCategory}
            style={{height: 20, color: 'black'}}
            dropdownIconColor="black"
            onValueChange={(itemValue, itemIndex) => {
              onChange('category_id', itemValue);
              setSelectedCategory(itemValue);
            }}>
            <Picker.Item
              label="Select category"
              value={null}
              style={{color: '#aaaaaa'}}
            />
            <Picker.Item label="Dessert" value="1" />
            <Picker.Item label="Main Course" value="2" />
            <Picker.Item label="Appetizer" value="3" />
          </Picker>
        </View>

        {menu_post.isError ? (
          <View style={{alignItems: 'center'}}>
            <View style={styles.errorAlert}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                  color: '#d85730',
                }}>
                {menu_post.errorMessage ?? ' - '}
              </Text>
            </View>
          </View>
        ) : null}

        {/* Post Button */}
        <View style={{alignItems: 'center'}}>
          <TouchableHighlight
            underlayColor={'#b89b1a'}
            style={styles.postButton}
            onPress={() => postData()}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
                color: 'white',
              }}>
              Post
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
      <Modal
        transparent={true}
        animationType="none"
        visible={menu_post?.isLoading}
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
    paddingHorizontal: 30,
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  title: {
    color: '#EFC81A',
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 40,
  },
  inputTitleBar: {
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
    height: 60,
    width: '100%',
    borderRadius: 15,
  },
  inputTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    backgroundColor: 'white',
    width: '85%',
    color: 'black',
  },
  inputIngredient: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    marginTop: 20,
    height: 200,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 15,
    textAlignVertical: 'top',
    color: 'black',
  },
  inputPhoto: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    height: 220,
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#c5c5c5',
  },
  inputCategory: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    marginTop: 20,
    height: 60,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  postButton: {
    marginVertical: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFC81A',
    width: '100%',
    borderRadius: 15,
  },
  errorAlert: {
    height: 50,
    width: '100%',
    // backgroundColor: '#d85730',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 20,
  },
});

export default AddMenu;
