/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {getMenu, searchMenu} from '../redux/action/menu';

const Home = ({route, navigation}) => {
  const dispatch = useDispatch();
  const searchMenuData = useSelector(state => state.menu_search);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('*');
  const [searchBy, setSearchBy] = useState('title');
  const [inputData, setInputData] = useState({
    search: '',
  });

  useEffect(() => {
    dispatch(searchMenu(search, searchBy, page));
  }, [dispatch, search, searchBy, page]);

  const updateData = e => {
    setSearch(inputData.search);
  };

  const onChange = (key, value) => {
    setInputData({...inputData, [key]: value});
  };

  // useEffect(() => {
  //   dispatch(getMenu());
  // }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMenu());
    }, [dispatch]),
  );

  return (
    <View style={styles.body}>
      {/* Search Bar */}
      <View style={{alignItems: 'center'}}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" color="#C4C4C4" size={25} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#C4C4C4"
            onChangeText={newValue => {
              onChange('search', newValue);
              // setInputData({ ...inputData, search: newValue });
            }}
            onSubmitEditing={updateData}
          />
        </View>
      </View>

      {/* Card Recipes */}
      {searchMenuData?.isSuccess ? (
        searchMenuData?.data && searchMenuData?.data.length > 0 ? (
          <ScrollView style={{marginTop: 20}}>
            {searchMenuData.data.map((item, index) => (
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
                    navigation.navigate('DetailMenu', {id: item.id})
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
            ))}
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
              source={require('../../assets/picture/5.png')}
              style={{width: 250, height: 250}}
            />
            <Text
              style={{
                fontSize: 20,
                color: '#EFC81A',
                fontFamily: 'Poppins-Medium',
                marginTop: 20,
              }}>
              Search Recipe
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
    height: 50,
    width: '100%',
    borderRadius: 15,
  },
  searchInput: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    height: 50,
    width: '85%',
    color: 'black',
    marginLeft: 10,
    paddingTop: 15,
    textAlignVertical: 'center',
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
    marginTop: 10,
  },
});

export default Home;
