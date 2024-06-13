/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {getMenuDetail} from '../redux/action/menu';
import {useFocusEffect} from '@react-navigation/native';

const DetailMenu = ({route, navigation}) => {
  const dispatch = useDispatch();
  const menu_detail = useSelector(state => state.menu_detail);

  // useEffect(() => {
  //   dispatch(getMenuDetail(route?.params.id));
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMenuDetail(route?.params.id));
    }, [dispatch, route?.params.id]),
  );

  // const [isBookmarked, setIsBookmarked] = useState(false);
  // const [isLiked, setIsLiked] = useState(false);

  // const toggleBookmark = () => {
  //   setIsBookmarked(!isBookmarked);
  // };
  // const toggleLike = () => {
  //   setIsLiked(!isLiked);
  // };

  return (
    <View style={styles.body}>
      {menu_detail.isSuccess && menu_detail.data ? (
        <ScrollView>
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
                  {/* <View
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
                  </View> */}
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
        </ScrollView>
      ) : (
        // Loading
        <ActivityIndicator size={50} color="#EFC81A" style={{flex: 1}} />
      )}
    </View>
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
