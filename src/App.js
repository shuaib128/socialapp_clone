import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { BackendServer } from './components/Api/BackendServer'

//Import screens
import HomeScreen from './screens/HomeScreen';
import LogInView from './screens/LogInView';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import PostdDetailScreen from './screens/PostdDetailScreen';
import OthersProfile from './screens/OthersProfile';
import SearchScreen from './screens/SearchScreen';
import NotificationScreen from './screens/NotificationScreen';
import NewPostScreen from './screens/NewPostScreen';


const Stack = createNativeStackNavigator();
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [ProfileItems, setProfileItems] = useState([])
  const [Username, setUsername] = useState("")

  //Get the token
  const [AuthToken, setAuthToken] = useState(() => {
    try {
      AsyncStorage.getItem("auth_token")
        .then((item) => {
          const token = item ? JSON.parse(item) : ""
          setAuthToken(token)
        })
    } catch (error) {

    }
  })


  //Get profile data
  useEffect(() => {
    try {
      AsyncStorage.getItem("auth_token")
        .then((item) => {
          const token = item ? JSON.parse(item) : ""
          const content_decoded = jwt_decode(token)
          setUsername(content_decoded.username)

          axios.post(`${BackendServer}/api/user/profile`, {
            id: content_decoded.user_id
          })
            .then((res) => {
              setProfileItems(res.data)
            })
        })
    } catch (error) {

    }
  }, [AuthToken])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='HomeScreen'>
            {(props) => <HomeScreen {...props}
              ProfileItems={ProfileItems}
            />}
          </Stack.Screen>

          <Stack.Screen name='LogInView'>
            {(props) => <LogInView {...props}
              setAuthToken={setAuthToken} setProfileItems={setProfileItems}
            />}
          </Stack.Screen>

          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

          <Stack.Screen name='ProfileScreen'>
            {(props) => <ProfileScreen {...props}
              AuthToken={AuthToken} ProfileItems={ProfileItems}
            />}
          </Stack.Screen>

          <Stack.Screen name='PostdDetailScreen'>
            {(props) => <PostdDetailScreen {...props}
              ProfileItems={ProfileItems}
            />}
          </Stack.Screen>

          <Stack.Screen name='OthersProfile'>
            {(props) => <OthersProfile {...props}
              AuthToken={AuthToken} ProfileItems={ProfileItems}
              AuthToken={AuthToken}
            />}
          </Stack.Screen>

          <Stack.Screen name='SearchScreen'>
            {(props) => <SearchScreen {...props}
              ProfileItems={ProfileItems}
            />}
          </Stack.Screen>

          <Stack.Screen name="NotificationScreen" component={NotificationScreen} />

          <Stack.Screen name='NewPostScreen'>
            {(props) => <NewPostScreen {...props}
              setAuthToken={setAuthToken} ProfileItems={ProfileItems}
              Username={Username}
            />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default App;
