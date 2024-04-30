/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DetailMenu = ({route, navigation}) => {
  const [data, setData] = useState(null);

  async function getData() {
    try {
      let res = await axios.get(
        `https://be-pijar-food.vercel.app/recipe/${route?.params.id}`,
      );
      console.log(res.data.data);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.body}>
      {data ? (
        <View style={{backgroundColor: 'black', height: '60%', width: '100%'}}>
          <ImageBackground
            source={{uri: data.photo}}
            style={[
              styles.image,
              {
                flexDirection: 'column',
                justifyContent: 'space-between',
              },
            ]}
            resizeMode="cover"
            imageStyle={{opacity: 0.5}}>
            {/* Back Arrow */}
            <TouchableOpacity
              style={{padding: 25}}
              onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-outline" color="white" size={35} />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
              {/* Title n By */}
              <View style={{padding: 25, width: '60%'}}>
                <Text
                  style={{
                    fontSize: 50,
                    color: 'white',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  {data.title}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#fffaaf',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  By {data.author}
                </Text>
              </View>

              {/* Like n Bookmark */}
              <View
                style={{
                  padding: 25,
                  flexDirection: 'row',
                }}>
                <View
                  style={[
                    styles.likeBookmark,
                    {backgroundColor: '#EFC81A', marginRight: 15},
                  ]}>
                  <Ionicons name="bookmark-outline" color="white" size={28} />
                </View>
                <View style={[styles.likeBookmark, {backgroundColor: 'white'}]}>
                  <Ionicons name="heart-outline" color="#EFC81A" size={28} />
                </View>
              </View>
            </View>
          </ImageBackground>

          {/* Ingredient Card */}
          <View
            style={{
              backgroundColor: 'white',
              height: '100%',
              width: '100%',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View style={{padding: 30}}>
              <Text
                style={{
                  fontSize: 25,
                  color: 'black',
                  fontFamily: 'Poppins-Medium',
                }}>
                Ingredients
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: '#3d3d3d',
                  fontFamily: 'Poppins-Medium',
                  marginTop: 20,
                }}>
                {data.ingredient}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        // Loading
        <View style={{padding: 20}}>
          <View style={styles.loading}>
            <Text
              style={{
                fontSize: 15,
                color: '#505050',
                fontFamily: 'Poppins-Medium',
              }}>
              Loading...
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    flex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  cardText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 2,
  },
  likeBookmark: {
    height: 50,
    width: 50,
    backgroundColor: '#EFC81A',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    height: 50,
    width: '100%',
    backgroundColor: '#fde476',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default DetailMenu;
