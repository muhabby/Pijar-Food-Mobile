/* eslint-disable prettier/prettier */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';

const ListRecipe = ({route, navigation}) => {
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
    <View style={styles.container}>
      <Text style={styles.text}>List Recipe</Text>
      {data?.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('DetailRecipe', {id:item.id})}>
            <View>
              <View>
                <Text style={{fontSize: 30, fontWeight: 700}}>
                  {item.title}
                </Text>
              </View>
              <View>
                <Text style={styles.text}>{item.ingredient}</Text>
              </View>
              <View>
                <Text style={{color: 'blue'}}>{item.photo}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
});

export default ListRecipe;
