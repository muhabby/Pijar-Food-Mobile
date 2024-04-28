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
import MyRecipe from './src/MyRecipe';
import ListRecipe from './src/ListRecipe';
import DetailRecipe from './src/DetailRecipe';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function ProfileScreen({navigation}) {
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
const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

function Home() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function Recipe() {
  return (
    <Stack.Navigator initialRouteName="ListRecipe">
      <Stack.Screen
        name="ListRecipe"
        component={ListRecipe}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailRecipe"
        component={DetailRecipe}
        options={{
          headerShown: false,
          tabBarStyle: {display: 'none'},
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Main"
        screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="Main"
          component={Home}
          options={({route}) => ({
            tabBarLabel: 'Main',
            tabBarIcon: ({color}) => (
              <Ionicons name="home" color={color} size={26} />
            ),
            tabBarStyle: (route => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? '';
              console.log(routeName);
              if (routeName === 'Details') {
                return {
                  display: 'none',
                  position: 'absolute',
                };
              }
              return;
            })(route),
          })}
        />
        <Tab.Screen
          name="Recipe"
          component={Recipe}
          options={{
            tabBarLabel: 'Recipe',
            tabBarIcon: ({color}) => (
              <Ionicons name="apps" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="MyRecipe"
          component={MyRecipe}
          options={{
            tabBarLabel: 'MyRecipe',
            tabBarIcon: ({color}) => (
              <Ionicons name="menu" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color}) => (
              <Ionicons name="person-circle-outline" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
