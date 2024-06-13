/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getMenu} from '../redux/action/menu';
import {getUsers} from '../redux/action/users';

const Home = ({route, navigation}) => {
  const dispatch = useDispatch();
  const menu = useSelector(state => state.menu_get);
  const auth = useSelector(state => state.auth);
  const userDetail = useSelector(state => state.users_detail);

  const id = auth.data.data.id;

  // useEffect(() => {
  //   dispatch(getMenu());
  // }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMenu());
      dispatch(getUsers(id));
    }, [dispatch, id]),
  );

  console.log(menu);

  return (
    <View style={styles.body}>
      {menu.isSuccess && menu.data ? (
        <View
          style={{
            flexDirection: 'column',
            // justifyContent: 'space-between',
            flex: 1,
            gap: 20,
          }}>
          {/* Search Bar */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              {userDetail?.data ? (
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Hello, {userDetail?.data?.full_name}
                </Text>
              ) : null}
              <Text
                style={{
                  fontSize: 13,
                  color: 'grey',
                  fontFamily: 'Poppins-Medium',
                }}>
                What recipe are you inspired to cook today?
              </Text>
            </View>
          </View>

          {/* New */}
          <View>
            {/* Text */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
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
                <TouchableOpacity
                  onPress={() => navigation.navigate('ListMenu')}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#3498DB',
                      fontFamily: 'Poppins-Medium',
                    }}>
                    More
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Card */}
            <ScrollView
              horizontal
              style={{marginTop: 10}}
              showsHorizontalScrollIndicator={false}>
              {menu?.data.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate('DetailMenu', {id: item.id})
                    }>
                    <View style={{marginRight: 15}}>
                      <ImageBackground
                        source={{uri: item.photo}}
                        style={styles.card}
                        resizeMode="cover"
                        imageStyle={{borderRadius: 10, opacity: 0.8}}>
                        <View style={styles.categoryInNewRecipe}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#3498DB',
                              fontFamily: 'Poppins-SemiBold',
                            }}>
                            {item.category}
                          </Text>
                        </View>
                        <Text style={styles.cardText}>{item.title}</Text>
                      </ImageBackground>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Category */}
          <View>
            {/* Text */}
            <View
              style={{
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
                  Popular Categories
                </Text>
              </View>
            </View>

            {/* Card */}
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={() => navigation.navigate('ListDessert')}>
                <ImageBackground
                  source={require('../../assets/picture/Dessert.jpg')}
                  style={styles.categoryCard}
                  resizeMode="cover"
                  imageStyle={{borderRadius: 15, opacity: 0.8}}
                />
                <Text style={styles.categoryText}>Dessert</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={() => navigation.navigate('ListMainCourse')}>
                <ImageBackground
                  source={require('../../assets/picture/Main.jpg')}
                  style={styles.categoryCard}
                  resizeMode="cover"
                  imageStyle={{borderRadius: 15, opacity: 0.8}}
                />
                <Text style={styles.categoryText}>Main Course</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={() => navigation.navigate('ListAppetizer')}>
                <ImageBackground
                  source={require('../../assets/picture/Appetizer.jpg')}
                  style={styles.categoryCard}
                  resizeMode="cover"
                  imageStyle={{borderRadius: 15, opacity: 0.8}}
                />
                <Text style={styles.categoryText}>Appetizer</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Text Popular For You */}
          {/* <View
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
          </View> */}

          {/* Card Recipe Popular For You */}
          {/* <ScrollView
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
          </ScrollView> */}
        </View>
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
    backgroundColor: '#ffffff',
    flex: 1,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: 'black',
  },
  card: {
    width: 260,
    height: 330,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  cardText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 25,
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 2,
  },
  categoryCard: {
    height: 105,
    width: 105,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  categoryText: {
    width: 100,
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins-Medium',
    marginTop: 10,
    textAlign: 'center',
  },
  categoryInNewRecipe: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 25,
    elevation: 3,
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
