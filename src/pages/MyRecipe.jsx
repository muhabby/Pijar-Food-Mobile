/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {getMenuUserId} from '../redux/action/menu';

const MyRecipe = ({route, navigation}) => {
  const dispatch = useDispatch();
  const menu = useSelector(state => state.menu_user);
  const auth = useSelector(state => state.auth);
  
  const id = auth.data.data.id;

  // useEffect(() => {
  //   dispatch(getMenuUserId(route?.params?.user_id));
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMenuUserId(id));
    }, [dispatch, id]),
  );

  return (
    <View style={styles.body}>
      {/* Header My Recipe */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" color="black" size={25} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            color: '#EFC81A',
            fontFamily: 'Poppins-Medium',
            justifyContent: 'center',
            // backgroundColor: 'red',
          }}>
          My Recipes
        </Text>
        <View>
          <Ionicons name="chevron-back-outline" color="white" size={28} />
        </View>
      </View>

      {/* Card Recipes */}
      {menu?.isSuccess ? (
        menu?.data && menu?.data.length > 0 ? (
          <ScrollView style={{marginTop: 20}}>
            {menu?.data.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: '100%',
                    height: 130,
                    borderRadius: 10,
                    backgroundColor: '#EFC81A',
                    marginVertical: 10,
                  }}>
                  <TouchableHighlight
                    underlayColor={'#00000000'}
                    onPress={() =>
                      navigation.navigate('DetailMenuUser', {id: item.id})
                    }>
                    <View style={[styles.card, {flexDirection: 'row'}]}>
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
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'space-evenly',
                        }}>
                        <Text
                          style={{
                            fontSize: 17,
                            color: 'black',
                            fontFamily: 'Poppins-Medium',
                          }}>
                          {item.title.replace(/\n/g, ' ').length > 15
                            ? item.title.replace(/\n/g, ' ').substring(0, 15) +
                              '...'
                            : item.title.replace(/\n/g, ' ')}
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            color: '#2475B0',
                            fontFamily: 'Poppins-Medium',
                          }}>
                          {item.category}
                        </Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Ionicons
                            name="person-circle-outline"
                            color="black"
                            size={12}
                            style={{marginRight: 5}}
                          />
                          <Text
                            style={{
                              fontSize: 12,
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
                  </TouchableHighlight>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          // Data is empty
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../assets/picture/2.png')}
              style={{width: 250, height: 250}}
            />
            <Text
              style={{
                fontSize: 20,
                color: '#EFC81A',
                fontFamily: 'Poppins-Medium',
                  marginTop: 20,
                textAlign: 'center',
              }}>
              You haven't uploaded {'\n'}any Recipe
            </Text>
          </View>
        )
      ) : (
        // Loading
        <ActivityIndicator size={50} color="#EFC81A" style={{flex: 1}} />
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
  card: {
    width: '100%',
    height: 130,
    // marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderColor: '#EFC81A',
    borderWidth: 1,
    borderRadius: 10,
  },
  loading: {
    height: 45,
    width: '100%',
    backgroundColor: '#EFC81A',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
});

export default MyRecipe;
