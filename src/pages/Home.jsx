/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {getMenu} from '../redux/action/menu';

const Home = ({route, navigation}) => {
  const dispatch = useDispatch();
  const menu = useSelector(state => state.menu_get);

  useEffect(() => {
    dispatch(getMenu());
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMenu());
    }, []),
  );

  console.log(menu)

  return (
    <View style={styles.body}>
      {menu.isSuccess && menu.data ? (
        <View>
          {/* Search Bar */}
          <View style={{alignItems: 'center'}}>
            <View style={styles.searchBar}>
              <Ionicons name="search-outline" color="#C4C4C4" size={25} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#C4C4C4"
              />
            </View>
          </View>

          {/* Text New */}
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  fontSize: 17,
                  color: 'black',
                  fontFamily: 'Poppins-Medium',
                }}>
                New Recipes
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={() => navigation.navigate('ListMenu')}>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#3498DB',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  More Recipes
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Card New Recipes */}
          <ScrollView
            horizontal
            style={{marginTop: 10}}
            showsHorizontalScrollIndicator={false}>
            {menu.data.map((item, index) => {
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
                      imageStyle={{borderRadius: 10, opacity: 0.8}}>
                      <Text style={styles.cardText}>{item.title}</Text>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Text Category */}
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  fontSize: 17,
                  color: 'black',
                  fontFamily: 'Poppins-Medium',
                }}>
                Popular Category
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={() => navigation.navigate('ListMenu')}>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#3498DB',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  More Info
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Category */}
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <View style={[styles.categoryCard, {backgroundColor: '#EFC81A'}]}>
                <Image
                  source={require('../../assets/picture/1.png')}
                  style={{width: 55, height: 55}}
                />
              </View>
              <Text style={styles.categoryText}>Dessert</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <View style={[styles.categoryCard, {backgroundColor: '#3858b1'}]}>
                <Image
                  source={require('../../assets/picture/1.png')}
                  style={{width: 55, height: 55}}
                />
              </View>
              <Text style={styles.categoryText}>Main Course</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <View style={[styles.categoryCard, {backgroundColor: '#5fb83c'}]}>
                <Image
                  source={require('../../assets/picture/1.png')}
                  style={{width: 55, height: 55}}
                />
              </View>
              <Text style={styles.categoryText}>Appetizer</Text>
            </TouchableOpacity>
          </View>

          {/* Text Popular For You */}
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  fontSize: 17,
                  color: 'black',
                  fontFamily: 'Poppins-Medium',
                }}>
                Popular For You
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={() => navigation.navigate('ListMenu')}>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#3498DB',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  More Info
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Card Recipe Popular For You */}
          <ScrollView
            horizontal
            style={{marginTop: 10}}
            showsHorizontalScrollIndicator={false}>
            {menu.data.map((item, index) => {
              return (
                <View key={index} style={styles.cardPopularForYou}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('DetailMenu', {id: item.id})
                    }>
                    <Image
                      source={{uri: item.photo}}
                      resizeMode="cover"
                      style={{
                        height: 80,
                        width: 200,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                      }}
                    />
                    <View style={styles.cardTextPopularForYou}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Medium',
                          fontSize: 12,
                          color: 'black',
                        }}>
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Medium',
                          fontSize: 10,
                          color: '#555555',
                        }}>
                        {item.ingredient.replace(/\n/g, ' ').length > 20
                          ? item.ingredient
                              .replace(/\n/g, ' ')
                              .substring(0, 20) + '...'
                          : item.ingredient.replace(/\n/g, ' ')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      ) : (
        // Loading
        <ActivityIndicator size={50} color="#EFC81A" />
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
    // backgroundColor: 'red',
    height: 50,
    width: '85%',
    color: 'black',
    marginLeft: 10,
    paddingTop: 15,
    textAlignVertical: 'center',
  },
  card: {
    width: 220,
    height: 140,
    marginRight: 15,
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  cardText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 2,
  },
  categoryCard: {
    height: 100,
    width: '100%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    width: 100,
    fontSize: 12,
    color: 'black',
    fontFamily: 'Poppins-Medium',
    marginTop: 10,
    textAlign: 'center',
  },
  cardPopularForYou: {
    height: 140,
    width: 200,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginRight: 15,
    elevation: 3,
  },
  cardTextPopularForYou: {
    height: 60,
    width: 200,
    backgroundColor: 'white',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'center',
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
