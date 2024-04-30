/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddMenu from './src/AddMenu';
import Home from './src/Home';
import DetailMenu from './src/DetailMenu';
import ListMenu from './src/ListMenu';

function Chat({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Chat Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function Profile({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Text style={{color: 'blue'}}>{route?.params?.idRecipe ?? '-'}</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go to Details"
        onPress={() => navigation.push('Details', {idRecipe: 'asdada'})}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function Main() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailMenu"
        component={DetailMenu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListMenu"
        component={ListMenu}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#EFC81A',
          tabBarInactiveTintColor: 'grey',
          tabBarActiveBackgroundColor: 'rgba(109, 97, 242, 0.05)',
          tabBarStyle: {
            height: 70,
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}>
        <Tab.Screen
          name="Main"
          component={Main}
          options={{
            tabBarLabel: 'Main',
            tabBarIcon: ({color}) => (
              <Ionicons name="home-outline" color={color} size={26} />
            ),
            // unmountOnBlur: true,
          }}
          // options={({route}) => ({
          //   tabBarLabel: 'Main',
          //   tabBarIcon: ({color}) => (
          //     <Ionicons name="home-outline" color={color} size={26} />
          //   ),
          //   tabBarStyle: (route => {
          //     const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          //     console.log(routeName);
          //     if (routeName === 'Details') {
          //       return {
          //         display: 'none',
          //       };
          //     }
          //     return {
          //       height: 70,
          //     };
          //   })(route),
          // })}
        />
        <Tab.Screen
          name="AddMenu"
          component={AddMenu}
          options={{
            tabBarLabel: 'AddMenu',
            tabBarIcon: ({color}) => (
              <Ionicons name="add-circle-outline" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({color}) => (
              <Ionicons name="chatbubble-outline" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color}) => (
              <Ionicons name="person-outline" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
