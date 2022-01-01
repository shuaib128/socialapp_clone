import React from 'react'
import { View, StyleSheet, TouchableOpacity,
    Image,
} from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons"
import { BackendServer } from '../Api/BackendServer'

export default function Footer(props) {
    const iconSizes = 30
    const profile_image = props.ProfileItems.image

    
    return (
        <View style={styles.footer}>
            <TouchableOpacity
                activeOpacity={.7}
                onPressIn={() => {
                    props.navigation && props.navigation.navigate('HomeScreen')
                }}
            >
                <Ionicons style={styles.searchIcon} name="home" size={iconSizes} color="black"/>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={.7}
                onPressIn={() => {
                    props.navigation && props.navigation.navigate('SearchScreen')
                }}
            >
                <Ionicons style={styles.searchIcon} name="search-outline" size={iconSizes} color="black"/>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={.7}
                onPressIn={() => {
                    props.navigation && props.navigation.navigate('NewPostScreen')
                }}
            >
                <Ionicons style={styles.searchIcon} name="add-circle-outline" size={iconSizes} color="black"/>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={.7}
                onPressIn={() => {
                    props.navigation && props.navigation.navigate('NotificationScreen')
                }}
            >
                <Ionicons style={styles.searchIcon} name="heart-outline" size={iconSizes} color="black"/>
            </TouchableOpacity>
            
            {profile_image !== undefined ?
                <TouchableOpacity
                    activeOpacity={.7}
                    onPressIn={() => {
                        props.navigation && props.navigation.navigate('ProfileScreen')
                    }}
                >
                    <Image 
                        source={{
                            uri: BackendServer + profile_image
                        }}
                        style={styles.profile_image_homepage}
                    />
                </TouchableOpacity>:
                <TouchableOpacity
                    activeOpacity={.7}
                    onPressIn={() => {
                        props.navigation && props.navigation.navigate('LogInView')
                    }}
                >
                    <Ionicons style={styles.searchIcon} name="log-in" size={iconSizes} color="black"/>
                </TouchableOpacity>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    footer: {
        position: "absolute",
        width: "100%",
        bottom: 0,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 25,
        paddingVertical: 14,
        borderTopColor: "#dbdbdb",
        borderTopWidth: 1.5,
        zIndex: 2,
    },
    searchIcon:{

    },
    profile_image_homepage:{
        width: 30,
        height: 30,
        borderRadius: 100
    }
});