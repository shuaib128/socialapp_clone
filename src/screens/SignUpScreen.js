import React, {useState} from 'react'
import { View, Text, StyleSheet,
    TextInput, Button, TouchableOpacity
} from 'react-native'
import { BackendServer } from '../components/Api/BackendServer'

export default function SignUpScreen(props) {
    const [Username, setUsername] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const RegisterFormSubmit = async () => {
        await fetch(`${BackendServer}/api/user/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: Username,
                email: Email,
                password: Password
            })
        })
        props.navigation.navigate('LogInView');
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
                    placeholder="Email"
                    placeholderTextColor="#989898"
                    onChangeText={(text) => {
                        setEmail(text)
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
                        title="Sign UP"
                        onPress={RegisterFormSubmit}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={.7}
                    onPressIn={() => {
                        props.navigation && props.navigation.navigate('LogInView')
                    }}
                >
                    <Text style={{
                        marginTop: 10, textAlign: "center",
                        fontWeight: "bold", color: "#ed4956"
                    }}>
                        Log In
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    loginView: {
      backgroundColor: "#fff",
      flex: 1,
      paddingHorizontal: 40,
      justifyContent: 'center',

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