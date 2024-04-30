/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [image, setImage] = useState(null);

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //   }
  // };

  const pickImage = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response) {
        setImage(response);
      }
    });
  };

  return (
    <View style={styles.body}>
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
          style={styles.inputTitle}
          placeholder="Title "
          placeholderTextColor="#aaaaaa"
        />
      </View>

      {/* Input Ingredient */}
      <TextInput
        style={[styles.inputIngredient]}
        multiline={true}
        placeholder="Ingredient"
        placeholderTextColor="#aaaaaa"
      />

      {/* Input Photo */}
      <TouchableOpacity style={[styles.inputPhoto]} onPress={pickImage}>
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
        {image && (
          <Image source={{uri: image.uri}} style={{width: 200, height: 200}} />
        )}
      </TouchableOpacity>

      {/* Input Category */}
      <View style={styles.inputCategory}>
        <Picker
          selectedValue={selectedCategory}
          style={{height: 20}}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemValue)
          }>
          <Picker.Item
            label="Select category"
            value={null}
            style={{color: '#aaaaaa'}}
          />
          <Picker.Item label="Main Course" value="main_course" />
          <Picker.Item label="Appetizer" value="appetizer" />
          <Picker.Item label="Dessert" value="dessert" />
        </Picker>
      </View>

      {/* Post Button */}
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity style={styles.PostButton}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 15,
              color: 'white',
            }}>
            Post
          </Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 30,
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
  },
  inputPhoto: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    marginTop: 20,
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
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
  PostButton: {
    marginTop: 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFC81A',
    width: '60%',
    borderRadius: 10,
  },
});

export default AddMenu;
