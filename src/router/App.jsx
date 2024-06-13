/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddMenu from '../pages/AddMenu';
import Home from '../pages/Home';
import DetailMenu from '../pages/DetailMenu';
import ListMenu from '../pages/ListMenu';
import EditMenu from '../pages/EditMenu';
import SearchMenu from '../pages/SearchMenu';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Regist from '../pages/Regist';
import {useSelector} from 'react-redux';
import MyRecipe from '../pages/MyRecipe';
import EditProfile from '../pages/EditProfile';
import DetailMenuUser from '../pages/DetailMenuUser';
import ListDessert from '../pages/ListDessert';
import ListMainCourse from '../pages/ListMainCourse';
import ListAppetizer from '../pages/ListAppetizer';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        animation: 'none',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListMenu"
        component={ListMenu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailMenu"
        component={DetailMenu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListDessert"
        component={ListDessert}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListMainCourse"
        component={ListMainCourse}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListAppetizer"
        component={ListAppetizer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function SearchScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        animation: 'none',
      }}>
      <Stack.Screen
        name="SearchMenu"
        component={SearchMenu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailMenu"
        component={DetailMenu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditMenu"
        component={EditMenu}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function AuthScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        animation: 'none',
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Regist"
        component={Regist}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function ProfileScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        animation: 'none',
      }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyRecipe"
        component={MyRecipe}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailMenuUser"
        component={DetailMenuUser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditMenu"
        component={EditMenu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
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
        unmountOnBlur: true,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Main',
          tabBarIcon: ({color}) => (
            <Ionicons name="home-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarLabel: 'SearchScreen',
          tabBarIcon: ({color}) => (
            <Ionicons name="search-outline" color={color} size={26} />
          ),
        }}
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
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Ionicons name="person-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AuthStack = createNativeStackNavigator();

function Router() {
  const auth = useSelector(state => state.auth);
  const [hideSplash, setHideSplash] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplash(true);
    }, 2000);
  }, []);

  React.useEffect(() => {
    hideSplash && SplashScreen.hide();
  }, [hideSplash]);

  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        {auth.data ? (
          <AuthStack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{headerShown: false}}
          />
        ) : (
          <AuthStack.Screen
            name="AuthScreen"
            component={AuthScreen}
            options={{headerShown: false}}
          />
        )}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
export default Router;
