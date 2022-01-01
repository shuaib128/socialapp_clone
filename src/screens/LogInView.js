import React, {useState} from 'react'
import { View, Text, StyleSheet,
    TextInput, Button
} from 'react-native'
import { BackendServer } from '../components/Api/BackendServer';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogInView(props) {
    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")

    const RegisterFormSubmit = async () => {
        const response = await fetch(`${BackendServer}/api/user/token/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: Username,
                password: Password
            })
        })
        const content = await response.json();
        const content_decoded = jwt_decode(content.access)

        try {
            AsyncStorage.getItem("auth_token")
            .then((item) => {
                const token = item ? JSON.parse(item) : ""
                
                props.setAuthToken(token)

                AsyncStorage.setItem("auth_token", JSON.stringify(content.access))
            })
        } catch (error) {
            
        }
        props.navigation.navigate('HomeScreen');
    }

    return (
        <View style={styles.loginView}>
            <View style={{alignContent: "center"}}>
                <Text
                    style={{
                        textAlign: "center", fontSize: 37,
                        fontWeight: "bold"
                    }}
                >
                    Instagram
                </Text>

                <TextInput
                    style={[styles.signInInput, {marginTop: 20}]}
                    placeholder="User Name"
                    placeholderTextColor="#989898"
                    onChangeText={(text) => {
                        setUsername(text)
                    }}
                />
                <TextInput
                    style={styles.signInInput}
                    placeholder="Password"
                    placeholderTextColor="#989898"
                    onChangeText={(text) => {
                        setPassword(text)
                    }}
                />
                <View style={styles.signInButton}>
                    <Button
                        title="Sign In"
                        onPress={RegisterFormSubmit}
                    />
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    loginView: {
      backgroundColor: "#fff",
      flex: 1,
      paddingHorizontal: 40,
      justifyContent: 'center', //Centered vertically

    },
    signInInput:{
        width: "100%",
        height: 45,
        backgroundColor: "#fafafa",
        borderWidth: 1,
        borderColor: "#CBCBCB",
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 10
    },
    signInButton:{
        marginTop: 15
    }
  });