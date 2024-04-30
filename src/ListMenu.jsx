/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ListMenu = ({route, navigation}) => {
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.body}>
      {/* Header Popular Menu */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" color="black" size={28} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            color: '#EFC81A',
            fontFamily: 'Poppins-Medium',
            justifyContent: 'center',
            // backgroundColor: 'red',
          }}>
          Popular Menu
        </Text>
        <View>
          <Ionicons name="chevron-back-outline" color="white" size={28} />
        </View>
      </View>

      {/* Card Recipes */}
      {data ? (
        <ScrollView style={{marginTop: 20}}>
          {data?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate('DetailMenu', {id: item.id})
                }>
                <View
                  style={[
                    styles.card,
                    {flexDirection: 'row', alignItems: 'center'},
                  ]}>
                  <Image
                    source={{uri: item.photo}}
                    resizeMode="cover"
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 10,
                      marginRight: 20,
                    }}
                  />

                  {/* Title, Category, and Owner */}
                  <View style={{flexDirection: 'column'}}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                        fontFamily: 'Poppins-Medium',
                        justifyContent: 'center',
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#2475B0',
                        fontFamily: 'Poppins-Medium',
                        justifyContent: 'center',
                      }}>
                      {item.category}
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Ionicons
                        name="person-circle-outline"
                        color="black"
                        size={15}
                        style={{marginRight: 5}}
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          fontFamily: 'Poppins-Medium',
                          justifyContent: 'center',
                          paddingTop: 3,
                        }}>
                        {item.author}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <View
          style={{
            height: 50,
            width: '100%',
            backgroundColor: '#fde476',
            alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            marginTop: 20,
          }}>
            <Text style={{
            fontSize: 15,
            color: '#505050',
            fontFamily: 'Poppins-Medium',
          }}>Loading...</Text>
        </View>
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
  card: {
    width: '100%',
    height: 130,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fafafa',
    borderColor: '#EFC81A',
    borderWidth: 1,
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

export default ListMenu;
