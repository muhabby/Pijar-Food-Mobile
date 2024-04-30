/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Home = ({route, navigation}) => {
  const [data, setData] = useState(null);

  async function getData() {
    try {
      let res = await axios.get(`https://be-pijar-food.vercel.app/recipe`);
      console.log(res.data.data);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
  }, [isFocused]);

  return (
    <View style={styles.body}>
      {/* Search Bar */}
      <View style={{alignItems: 'center'}}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" color="#C4C4C4" size={28} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#C4C4C4"
          />
        </View>
      </View>

      {/* Text Popular */}
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontFamily: 'Poppins-Medium',
            }}>
            Popular Recipes
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: 'black',
              fontFamily: 'Poppins-Medium',
            }}>
            Popular Check
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={() => navigation.navigate('ListMenu')}>
            <Text
              style={{
                fontSize: 15,
                color: '#3498DB',
                fontFamily: 'Poppins-Medium',
              }}>
              More Recipes
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Card Recipes */}
      {data ? (
        <ScrollView horizontal style={{marginTop: 20}}>
          {data?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate('DetailMenu', {id: item.id})
                }>
                <View>
                  <ImageBackground
                    source={{uri: item.photo}}
                    style={styles.card}
                    resizeMode="cover"
                    imageStyle={{borderRadius: 10, opacity: 0.7}}>
                    <Text style={styles.cardText}>{item.title}</Text>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: 'white',
    flex: 1,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: 'black',
  },
  searchBar: {
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
    height: 60,
    width: '100%',
    borderRadius: 15,
  },
  searchInput: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    backgroundColor: '#F5F5F5',
    width: '85%',
    color: 'black',
    marginLeft: 10,
  },
  card: {
    width: 200,
    height: 130,
    marginRight: 15,
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  cardText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 2,
  },
});

export default Home;
