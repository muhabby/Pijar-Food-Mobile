/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import {useDispatch, useSelector} from 'react-redux';
import {deleteMenu, getMenuDetail} from '../redux/action/menu';
import {useFocusEffect} from '@react-navigation/native';

const DetailMenu = ({route, navigation}) => {
  const dispatch = useDispatch();
  const menu_detail = useSelector(state => state.menu_detail);

  useEffect(() => {
    dispatch(getMenuDetail(route?.params.id));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMenuDetail(route?.params.id));
    }, []),
  );

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <MenuProvider style={styles.body}>
      <ScrollView>
        {menu_detail.isSuccess && menu_detail.data ? (
          <View>
            <View
              style={{backgroundColor: 'black', height: 450, width: '100%'}}>
              <ImageBackground
                source={{uri: menu_detail.data.photo}}
                style={{
                  height: 450,
                  width: '100%',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                resizeMode="cover"
                imageStyle={{opacity: 0.5}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: 25,
                  }}>
                  {/* Back Arrow */}
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="arrow-back-outline"
                      color="white"
                      size={25}
                    />
                  </TouchableOpacity>

                  {/* 3 Dots button */}
                  <Menu>
                    <MenuTrigger>
                      <View
                        style={{
                          height: 35,
                          width: 35,
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'space-evenly',
                        }}>
                        <View style={styles.threeDotsButton} />
                        <View style={styles.threeDotsButton} />
                        <View style={styles.threeDotsButton} />
                      </View>
                    </MenuTrigger>
                    <MenuOptions>
                      <MenuOption
                        onSelect={() =>
                          navigation.navigate('EditMenu', {
                            id: menu_detail.data.id,
                          })
                        }
                        style={{
                          marginTop: 10,
                          height: 45,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            color: '#000000',
                            fontFamily: 'Poppins-Medium',
                            paddingHorizontal: 15,
                          }}>
                          Edit
                        </Text>
                      </MenuOption>
                      <MenuOption
                        onSelect={() => {
                          Alert.alert(
                            'Confirm',
                            'Are you sure you want to delete this recipe?',
                            [
                              {
                                text: 'Cancel',
                                // style: 'cancel',
                              },
                              {
                                text: 'Delete',
                                onPress: () => {
                                  dispatch(
                                    deleteMenu(menu_detail.data.id, navigation),
                                  );
                                },
                              },
                            ],
                            {cancelable: true},
                          );
                        }}
                        style={{
                          height: 45,
                          justifyContent: 'center',
                          marginBottom: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            color: '#df0b0b',
                            fontFamily: 'Poppins-Medium',
                            paddingHorizontal: 15,
                          }}>
                          Delete
                        </Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    margin: 25,
                  }}>
                  {/* Title n By */}
                  <View style={{width: '60%'}}>
                    <Text
                      style={{
                        fontSize: 35,
                        color: 'white',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      {menu_detail.data.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#fffaaf',
                        fontFamily: 'Poppins-Medium',
                      }}>
                      By {menu_detail.data.author}
                    </Text>
                  </View>

                  {/* Like n Bookmark */}
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <TouchableHighlight
                      underlayColor={'#00000000'}
                      onPress={toggleBookmark}>
                      <View
                        style={[
                          styles.likeBookmark,
                          {
                            backgroundColor: isBookmarked ? '#EFC81A' : 'white',
                            marginRight: 15,
                          },
                        ]}>
                        <Ionicons
                          name="bookmark-outline"
                          color={isBookmarked ? 'white' : '#EFC81A'}
                          size={28}
                        />
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                      underlayColor={'#00000000'}
                      onPress={toggleLike}>
                      <View
                        style={[
                          styles.likeBookmark,
                          {backgroundColor: isLiked ? '#EFC81A' : 'white'},
                        ]}>
                        <Ionicons
                          name="heart-outline"
                          color={isLiked ? 'white' : '#EFC81A'}
                          size={28}
                        />
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              </ImageBackground>
            </View>

            <View>
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
                      fontSize: 20,
                      color: 'black',
                      fontFamily: 'Poppins-Medium',
                    }}>
                    Ingredients
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#3d3d3d',
                      fontFamily: 'Poppins-Medium',
                      marginTop: 10,
                    }}>
                    {menu_detail.data.ingredient}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          // Loading
          <ActivityIndicator
            size={50}
            color="#EFC81A"
            style={{paddingTop: 30}}
          />
        )}
      </ScrollView>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    flex: 1,
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
    height: 45,
    width: '100%',
    backgroundColor: '#EFC81A',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  threeDotsButton: {
    height: 4,
    width: 4,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default DetailMenu;
