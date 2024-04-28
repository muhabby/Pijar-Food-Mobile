/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

const DetailRecipe = ({route, navigation}) => {
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
    <View style={styles.container}>
      <Text style={styles.text}>Detail Recipe</Text>
      {data ? (
        <View>
          <View>
            <Text style={{fontSize: 30, fontWeight: 700}}>{data.title}</Text>
          </View>
          <View>
            <Text style={styles.text}>{data.ingredient}</Text>
          </View>
          <View>
            {data.photo && (
              <Image
                source={{uri: data.photo}}
                style={{width: 200, height: 200}}
              />
            )}
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
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

export default DetailRecipe;
